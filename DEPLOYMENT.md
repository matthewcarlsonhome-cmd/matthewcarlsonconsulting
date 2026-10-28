# Deploying the site with FileZilla

The site is static HTML plus two PHP files, hosted on GoDaddy (Apache). There is no build step: you copy files to the server.

## One-time setup

1. **Get your FTP login.** GoDaddy → My Products → Web Hosting → Manage → cPanel → **FTP Accounts**. Note the host (`ftp.matthewcarlsonconsulting.com`), username and password. Reset the password there if you've forgotten it.
2. **Add the site in FileZilla.** File → Site Manager → New site:
   - Protocol: **FTP**, Encryption: **Use explicit FTP over TLS if available**
   - Host: `ftp.matthewcarlsonconsulting.com`, Port: blank (21)
   - Logon type: **Normal**, then your FTP user and password
   - Connect. Accept the certificate prompt (tick "Always trust").
3. **Show hidden files**, so `.htaccess` is visible: Server menu → **Force showing hidden files**.
4. **Find the site root** in the right-hand (server) pane. It's the folder holding the current `index.html` and `.htaccess`, usually `public_html`. If your FTP account opens straight into it, `/` is the root.

## Every deploy

1. **Get the latest code.**
   - With git: `git pull` in your local copy.
   - Without git: on GitHub open the repo → green **Code** button → **Download ZIP**, then unzip it.
2. **Build the upload folder.** In the repo folder, run `bash scripts/package.sh`. (It also includes `llms.txt` and `llms-full.txt`; if you changed page text, run `python3 scripts/build-llms.py` first.) On Windows, use Git Bash: right-click in the folder → "Open Git Bash here". This creates a `deploy/` folder containing only the files the server needs.
   - No bash? Upload the files listed in `scripts/package.sh` by hand instead.
3. **Back up the server (recommended).** In FileZilla, select everything in the site root on the right → right-click → **Download** into a dated local folder, e.g. `site-backup-2026-10-27`.
4. **Upload.** Left pane: open `deploy/` and select everything inside it, including `.htaccess`. Drag it onto the site root on the right. When asked about existing files, choose **Overwrite**, tick **Always use this action**, then OK.
5. **Don't touch `api/config.php` on the server.** It holds the OpenAI API key and isn't in the repo. The package never includes it, so it's safe as long as you don't delete it.
6. **Check the site** in a private browser window (or press Ctrl+Shift+R):
   - Home, Work, About (headshot shows), FAQ (questions expand)
   - Submit the contact form once; the email should arrive at contact@matthewcarlsonconsulting.com
   - Send one AI Assistant message; you should get a reply
   - `/automations.html` should redirect to Solutions

## First deploy of the October 2026 redesign: delete retired files

After uploading, delete these from the **server** if they exist (right-click → Delete):

- `automations.html`, `bot.html`, `articles.html`, `article.html`
- `skillengine-bot.php`, `mcc-website.zip`, `upload.sh`, `upload.bat`, any `*.md` files
- `css/styles.css`, `js/bot.js`, `js/articles.js`
- `api/test-ai-assistant.html`
- In `assets/`: `Client Image *.png`, `Client Portal Page *.png`, `Security1.png`, `Security2.png`, `recording.webm`, `MMMSetup1.png`, `MMMSetup2.png`, `MMMMarketingPerformance.png`, `MMMScenarioPlanning.png`

Keep `api/config.php`, any `cgi-bin` folder, and anything GoDaddy created (such as `.well-known`).

## Optional: force HTTPS

Once `https://matthewcarlsonconsulting.com` loads without a certificate warning, edit `.htaccess` and remove the `#` from the two lines under "Force HTTPS", then upload `.htaccess` again.

## If something breaks

- **Page looks unstyled:** `css/site.css` didn't upload. Re-upload the `css` folder.
- **500 error after uploading `.htaccess`:** rename the server copy to `.htaccess-off` to bring the site back, then tell Claude Code what you saw.
- **Rollback:** upload the backup folder from step 3.
