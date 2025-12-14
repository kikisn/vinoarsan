<?php
/**
 * Email Configuration Template for Vino Arsan Contact Form
 *
 * SETUP INSTRUCTIONS:
 * 1. Copy this file to: email-config.php
 * 2. Update the values below with your actual SMTP credentials
 * 3. Never commit email-config.php to git (it's in .gitignore)
 */

return [
    // Email Recipients
    'recipient_email' => 'sales@vinoarsan.com',
    'recipient_name' => 'Vino Arsan Sales Team',

    // SMTP Configuration
    'smtp' => [
        'enabled' => true,  // Set to false to use PHP mail() instead
        'host' => 'smtp.gmail.com',  // SMTP server (Gmail, SendGrid, etc.)
        'port' => 587,  // Port (587 for TLS, 465 for SSL)
        'encryption' => 'tls',  // 'tls' or 'ssl'
        'auth' => true,
        'username' => 'your-email@gmail.com',  // SMTP username
        'password' => 'your-app-password',  // SMTP password or app password
    ],

    // From Email Settings
    'from_email' => 'noreply@vinoarsan.com',
    'from_name' => 'Vino Arsan Contact Form',

    // Email Settings
    'subject_prefix' => 'Contact Form',
    'debug' => false,  // Set to true for debugging (shows SMTP communication)
];

/**
 * SMTP PROVIDER SETUP GUIDES:
 *
 * ========================================
 * GMAIL (Free - Recommended for testing)
 * ========================================
 * 1. Enable 2-Factor Authentication on your Google account
 * 2. Generate an App Password: https://myaccount.google.com/apppasswords
 * 3. Configuration:
 *    - host: smtp.gmail.com
 *    - port: 587
 *    - encryption: tls
 *    - username: your-email@gmail.com
 *    - password: [16-character app password]
 * 4. Gmail daily limit: 500 emails/day
 *
 * ========================================
 * SENDGRID (Professional - Recommended)
 * ========================================
 * 1. Sign up at https://sendgrid.com (Free tier: 100 emails/day)
 * 2. Create an API key in Settings > API Keys
 * 3. Configuration:
 *    - host: smtp.sendgrid.net
 *    - port: 587
 *    - encryption: tls
 *    - username: apikey
 *    - password: [Your SendGrid API Key]
 * 4. Free tier: 100 emails/day
 *
 * ========================================
 * MAILGUN (Professional)
 * ========================================
 * 1. Sign up at https://www.mailgun.com
 * 2. Find SMTP credentials in Settings > Domains > [Your Domain]
 * 3. Configuration:
 *    - host: smtp.mailgun.org
 *    - port: 587
 *    - encryption: tls
 *    - username: [Mailgun SMTP username]
 *    - password: [Mailgun SMTP password]
 *
 * ========================================
 * OFFICE365/OUTLOOK (Business Email)
 * ========================================
 * 1. Use your Office365 account credentials
 * 2. Configuration:
 *    - host: smtp.office365.com
 *    - port: 587
 *    - encryption: tls
 *    - username: your-email@yourdomain.com
 *    - password: [Your email password]
 *
 * ========================================
 * CPANEL/SHARED HOSTING
 * ========================================
 * 1. Create email account in cPanel
 * 2. Find SMTP settings in cPanel email section
 * 3. Configuration:
 *    - host: mail.yourdomain.com (or smtp.yourdomain.com)
 *    - port: 587 (or 465 for SSL)
 *    - encryption: tls (or ssl)
 *    - username: noreply@yourdomain.com
 *    - password: [Email account password]
 *
 * ========================================
 * DEBUGGING TIPS
 * ========================================
 * If emails aren't sending:
 * 1. Set 'debug' => true in config above
 * 2. Check PHP error logs
 * 3. Verify firewall allows outbound connections on SMTP port
 * 4. Test credentials with a mail client (Thunderbird, Outlook)
 * 5. Check spam folder for delivered emails
 * 6. Verify SPF/DKIM records if using custom domain
 */
