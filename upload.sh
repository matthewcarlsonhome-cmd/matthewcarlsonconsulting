#!/bin/bash
# ============================================
# Matthew Carlson Consulting - FTP Upload Script
# ============================================
#
# Instructions:
# 1. Edit the credentials below
# 2. Open terminal/command prompt
# 3. Navigate to this project folder
# 4. Run: bash upload.sh (Mac/Linux) or use Git Bash on Windows
#
# ============================================

# ----- EDIT THESE VALUES -----
FTP_HOST="ftp.matthewcarlsonconsulting.com"
FTP_USER="your-ftp-username"
FTP_PASS="your-ftp-password"
REMOTE_PATH="/html"
# -----------------------------

echo "=========================================="
echo "Starting FTP Upload to $FTP_HOST"
echo "=========================================="

# Function to upload a file
upload_file() {
    local file=$1
    local remote=$2
    echo "Uploading: $file -> $remote"
    curl -s -T "$file" "ftp://$FTP_HOST$remote" --user "$FTP_USER:$FTP_PASS" --ftp-create-dirs
    if [ $? -eq 0 ]; then
        echo "  ✓ Success"
    else
        echo "  ✗ Failed"
    fi
}

# Upload HTML files
echo ""
echo "--- Uploading HTML files ---"
upload_file "index.html" "$REMOTE_PATH/"
upload_file "services.html" "$REMOTE_PATH/"
upload_file "about.html" "$REMOTE_PATH/"
upload_file "contact.html" "$REMOTE_PATH/"
upload_file "faq.html" "$REMOTE_PATH/"
upload_file "articles.html" "$REMOTE_PATH/"
upload_file "article.html" "$REMOTE_PATH/"
upload_file "privacy.html" "$REMOTE_PATH/"
upload_file "terms.html" "$REMOTE_PATH/"

# Upload .htaccess
echo ""
echo "--- Uploading .htaccess ---"
upload_file ".htaccess" "$REMOTE_PATH/"

# Upload CSS
echo ""
echo "--- Uploading CSS ---"
upload_file "css/styles.css" "$REMOTE_PATH/css/"

# Upload JavaScript
echo ""
echo "--- Uploading JavaScript ---"
upload_file "js/main.js" "$REMOTE_PATH/js/"
upload_file "js/articles.js" "$REMOTE_PATH/js/"

# Upload Assets
echo ""
echo "--- Uploading Assets ---"
upload_file "assets/favicon.svg" "$REMOTE_PATH/assets/"

echo ""
echo "=========================================="
echo "Upload Complete!"
echo "=========================================="
echo ""
echo "Next steps:"
echo "1. Clear your browser cache (Ctrl+Shift+R)"
echo "2. Visit https://matthewcarlsonconsulting.com"
echo ""
echo "If WordPress still shows, contact GoDaddy to"
echo "uninstall Managed WordPress hosting."
echo "=========================================="
