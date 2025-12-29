# Deploying to GoDaddy Hosting

This guide explains how to deploy the new static HTML website to your GoDaddy hosting, replacing the existing WordPress installation.

## Prerequisites

- GoDaddy hosting account with cPanel or File Manager access
- FTP client (FileZilla recommended) OR use GoDaddy's File Manager
- Backup of any important WordPress content you want to keep

---

## Option 1: Using GoDaddy File Manager (Easiest)

### Step 1: Backup WordPress (Optional but Recommended)

1. Log into your GoDaddy account at https://account.godaddy.com
2. Go to **My Products** → Find your hosting → Click **Manage**
3. Click **cPanel Admin** or **File Manager**
4. Navigate to `public_html` folder
5. Select all WordPress files → **Compress** → Download the zip as backup

### Step 2: Remove WordPress Files

1. In File Manager, navigate to `public_html`
2. Select ALL files and folders (wp-admin, wp-content, wp-includes, etc.)
3. Click **Delete** (move to trash)
4. Empty the trash to permanently remove

### Step 3: Upload New Website Files

1. Download this repository as a ZIP file
2. In GoDaddy File Manager, navigate to `public_html`
3. Click **Upload** in the toolbar
4. Upload the ZIP file
5. Once uploaded, right-click the ZIP → **Extract**
6. Move all extracted files to `public_html` root (not in a subfolder)

### Step 4: Verify File Structure

Your `public_html` folder should look like:
```
public_html/
├── index.html
├── services.html
├── about.html
├── contact.html
├── faq.html
├── articles.html
├── article.html
├── css/
│   └── styles.css
├── js/
│   ├── main.js
│   └── articles.js
├── assets/
│   └── favicon.svg
└── DEPLOYMENT.md
```

### Step 5: Test Your Site

Visit https://matthewcarlsonconsulting.com - your new site should be live!

---

## Option 2: Using FTP (FileZilla)

### Step 1: Get FTP Credentials

1. Log into GoDaddy → **My Products** → **Hosting** → **Manage**
2. Look for **FTP** section or **Settings**
3. Note your:
   - FTP Host (usually ftp.yourdomain.com)
   - FTP Username
   - FTP Password
   - Port (usually 21)

### Step 2: Connect with FileZilla

1. Download FileZilla: https://filezilla-project.org/
2. Open FileZilla
3. Enter credentials in top bar:
   - Host: `ftp.matthewcarlsonconsulting.com`
   - Username: (your FTP username)
   - Password: (your FTP password)
   - Port: `21`
4. Click **Quickconnect**

### Step 3: Remove Old WordPress Files

1. Navigate to `public_html` in the right panel (remote site)
2. Select all files (Ctrl+A)
3. Right-click → **Delete**
4. Confirm deletion

### Step 4: Upload New Files

1. In the left panel (local site), navigate to this project folder
2. Select all files and folders (index.html, css/, js/, assets/, etc.)
3. Drag to the right panel (`public_html`)
4. Wait for upload to complete

### Step 5: Verify

Visit your website to confirm everything works.

---

## Post-Deployment Checklist

### Update Contact Form

The contact form currently shows a success message but doesn't actually send emails. Options:

1. **Formspree (Free/Easy)**:
   - Sign up at https://formspree.io
   - Update form action in `contact.html`:
   ```html
   <form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
   ```

2. **GoDaddy Email Forwarding**:
   - Set up PHP mail script (requires PHP hosting)

### Update Phone Number

Replace the placeholder phone number in all HTML files:
- Search for: `(608) 555-0123`
- Replace with: Your actual phone number

### Update Email Address

Verify the email address is correct:
- Search for: `hello@matthewcarlsonconsulting.com`
- Update if needed

### Set Up SSL (HTTPS)

GoDaddy usually includes free SSL:
1. Go to GoDaddy → **My Products** → **Hosting**
2. Find **SSL** or **Security** section
3. Enable free SSL certificate
4. Force HTTPS redirect

### Delete WordPress Database (Optional)

If you had WordPress, the database still exists:
1. In cPanel, go to **MySQL Databases**
2. Find and delete WordPress database(s)
3. Delete associated database users

---

## Adding New Articles

To add new articles to the blog:

1. Open `js/articles.js`
2. Find the `ARTICLES` array at the top
3. Add a new article object following this template:

```javascript
{
    id: 'unique-article-id',
    slug: 'url-friendly-slug',
    title: 'Your Article Title',
    excerpt: 'A short description for article cards (150-200 chars)',
    category: 'Category Name',
    categorySlug: 'category-slug',
    author: 'Matthew Carlson',
    date: '2024-12-20',
    readTime: '5 min read',
    featured: false,
    tags: ['tag1', 'tag2'],
    image: null,
    content: `
        <p>Your article content in HTML...</p>
        <h2>Section heading</h2>
        <p>More content...</p>
    `
}
```

4. Save the file and upload to your server

---

## Troubleshooting

### Site shows old WordPress content
- Clear your browser cache (Ctrl+Shift+Delete)
- Check that all WordPress files were deleted
- Verify new files are in `public_html` root, not a subfolder

### CSS/JS not loading
- Ensure folder structure matches the paths in HTML files
- Check for case sensitivity (Linux servers are case-sensitive)

### 404 errors on pages
- Verify all HTML files uploaded correctly
- Check file permissions (should be 644 for files, 755 for folders)

### Contact form not working
- Implement a form backend (Formspree, Netlify Forms, or PHP)
- Check browser console for JavaScript errors

---

## Support

If you need help with deployment, contact:
- GoDaddy Support: https://www.godaddy.com/help
- Or reach out at hello@matthewcarlsonconsulting.com
