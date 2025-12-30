@echo off
REM ============================================
REM Matthew Carlson Consulting - FTP Upload Script
REM ============================================
REM
REM Instructions:
REM 1. Edit the credentials below
REM 2. Double-click this file to run
REM    OR open Command Prompt, navigate to folder, type: upload.bat
REM
REM Note: Requires curl (included in Windows 10/11)
REM ============================================

REM ----- EDIT THESE VALUES -----
set FTP_HOST=ftp.matthewcarlsonconsulting.com
set FTP_USER=your-ftp-username
set FTP_PASS=your-ftp-password
set REMOTE_PATH=/html
REM -----------------------------

echo ==========================================
echo Starting FTP Upload to %FTP_HOST%
echo ==========================================
echo.

echo --- Uploading HTML files ---
curl -s -T "index.html" "ftp://%FTP_HOST%%REMOTE_PATH%/" --user "%FTP_USER%:%FTP_PASS%" --ftp-create-dirs && echo   [OK] index.html || echo   [FAIL] index.html
curl -s -T "services.html" "ftp://%FTP_HOST%%REMOTE_PATH%/" --user "%FTP_USER%:%FTP_PASS%" && echo   [OK] services.html || echo   [FAIL] services.html
curl -s -T "about.html" "ftp://%FTP_HOST%%REMOTE_PATH%/" --user "%FTP_USER%:%FTP_PASS%" && echo   [OK] about.html || echo   [FAIL] about.html
curl -s -T "contact.html" "ftp://%FTP_HOST%%REMOTE_PATH%/" --user "%FTP_USER%:%FTP_PASS%" && echo   [OK] contact.html || echo   [FAIL] contact.html
curl -s -T "faq.html" "ftp://%FTP_HOST%%REMOTE_PATH%/" --user "%FTP_USER%:%FTP_PASS%" && echo   [OK] faq.html || echo   [FAIL] faq.html
curl -s -T "articles.html" "ftp://%FTP_HOST%%REMOTE_PATH%/" --user "%FTP_USER%:%FTP_PASS%" && echo   [OK] articles.html || echo   [FAIL] articles.html
curl -s -T "article.html" "ftp://%FTP_HOST%%REMOTE_PATH%/" --user "%FTP_USER%:%FTP_PASS%" && echo   [OK] article.html || echo   [FAIL] article.html

echo.
echo --- Uploading .htaccess ---
curl -s -T ".htaccess" "ftp://%FTP_HOST%%REMOTE_PATH%/" --user "%FTP_USER%:%FTP_PASS%" && echo   [OK] .htaccess || echo   [FAIL] .htaccess

echo.
echo --- Uploading CSS ---
curl -s -T "css/styles.css" "ftp://%FTP_HOST%%REMOTE_PATH%/css/" --user "%FTP_USER%:%FTP_PASS%" --ftp-create-dirs && echo   [OK] styles.css || echo   [FAIL] styles.css

echo.
echo --- Uploading JavaScript ---
curl -s -T "js/main.js" "ftp://%FTP_HOST%%REMOTE_PATH%/js/" --user "%FTP_USER%:%FTP_PASS%" --ftp-create-dirs && echo   [OK] main.js || echo   [FAIL] main.js
curl -s -T "js/articles.js" "ftp://%FTP_HOST%%REMOTE_PATH%/js/" --user "%FTP_USER%:%FTP_PASS%" && echo   [OK] articles.js || echo   [FAIL] articles.js

echo.
echo --- Uploading Assets ---
curl -s -T "assets/favicon.svg" "ftp://%FTP_HOST%%REMOTE_PATH%/assets/" --user "%FTP_USER%:%FTP_PASS%" --ftp-create-dirs && echo   [OK] favicon.svg || echo   [FAIL] favicon.svg

echo.
echo ==========================================
echo Upload Complete!
echo ==========================================
echo.
echo Next steps:
echo 1. Clear your browser cache (Ctrl+Shift+R)
echo 2. Visit https://matthewcarlsonconsulting.com
echo.
pause
