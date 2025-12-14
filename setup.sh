#!/bin/bash

##############################################
# Vino Arsan Contact Form Setup Script
# Automates the setup of SMTP email delivery
##############################################

echo "=================================="
echo "Vino Arsan Contact Form Setup"
echo "=================================="
echo ""

# Check if composer is installed
if ! command -v composer &> /dev/null; then
    echo "❌ Composer is not installed!"
    echo "Please install Composer first: https://getcomposer.org/download/"
    exit 1
fi

echo "✅ Composer found"
echo ""

# Install PHPMailer
echo "📦 Installing PHPMailer..."
composer install --no-dev --optimize-autoloader

if [ $? -eq 0 ]; then
    echo "✅ PHPMailer installed successfully"
else
    echo "❌ Failed to install PHPMailer"
    exit 1
fi

echo ""

# Check if email-config.php exists
if [ -f "email-config.php" ]; then
    echo "✅ email-config.php already exists"
else
    echo "📝 Creating email-config.php from template..."
    cp email-config.example.php email-config.php
    echo "✅ email-config.php created"
    echo ""
    echo "⚠️  IMPORTANT: You must edit email-config.php with your SMTP credentials!"
    echo ""
    echo "Quick setup for Gmail:"
    echo "1. Go to https://myaccount.google.com/apppasswords"
    echo "2. Generate an app password"
    echo "3. Edit email-config.php and update:"
    echo "   - username: your-email@gmail.com"
    echo "   - password: [16-char app password]"
    echo ""
fi

# Set proper permissions
echo "🔒 Setting file permissions..."
chmod 600 email-config.php 2>/dev/null || echo "⚠️  Could not set permissions on email-config.php"
chmod 644 contact-handler.php 2>/dev/null || echo "⚠️  Could not set permissions on contact-handler.php"
chmod 644 contact.html 2>/dev/null || echo "⚠️  Could not set permissions on contact.html"

echo ""
echo "=================================="
echo "✅ Setup Complete!"
echo "=================================="
echo ""
echo "Next steps:"
echo "1. Edit email-config.php with your SMTP credentials"
echo "2. Test the contact form on your website"
echo "3. Check that emails arrive correctly"
echo ""
echo "Need help? See DEPLOYMENT_GUIDE.md"
echo ""
