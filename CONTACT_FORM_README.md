# Contact Form Setup Guide

## Overview
The contact form has been successfully implemented with the following features:
- Email submission to vinoarsanenterprises@gmail.com
- Anti-spam protection (honeypot field + timestamp validation)
- Client-side and server-side validation
- User-friendly error messages
- Success/error feedback

## Files Modified/Created

### 1. contact.html
**Changes:**
- Added honeypot field (hidden from users, visible to bots)
- Added timestamp hidden field for time-based spam detection
- Added form messages container for success/error feedback

### 2. contact-handler.php (NEW)
**Purpose:** Backend PHP script that processes form submissions
**Features:**
- Validates all form fields
- Honeypot spam detection
- Timestamp validation (requires minimum 3 seconds to fill form)
- Suspicious pattern detection in messages
- Sends formatted HTML emails to vinoarsanenterprises@gmail.com
- Returns JSON responses

### 3. scripts.js
**Changes:**
- Replaced generic form handling with dedicated contact form handler
- Implements AJAX form submission
- Real-time field validation
- Loading states during submission
- Automatic error clearing when user starts typing

### 4. styles.css
**Changes:**
- Added honeypot field styles (completely hidden)
- Added error state styles for form fields
- Added success/error message box styles
- Added disabled button styles
- Added slide-down animation for messages

## Deployment Instructions

### Prerequisites
- Web server with PHP support (PHP 7.0 or higher recommended)
- Working PHP mail() function on the server

### Steps to Deploy

#### 1. Upload Files
Upload all files to your web server:
- contact.html
- contact-handler.php
- scripts.js
- styles.css

#### 2. Configure Email Settings
Edit `contact-handler.php` and update these settings:

```php
// Line 13-14: Configure email addresses
$recipient_email = 'vinoarsanenterprises@gmail.com';  // Email where form submissions go
$from_email = 'noreply@vinoarsan.com';     // From email (use your domain email)
```

**Important:** For best email deliverability:
- Use a "From" email address that matches your domain (e.g., noreply@vinoarsan.com)
- Ensure your server's PHP mail() function is properly configured
- Consider using SMTP for more reliable email delivery (see Advanced Setup below)

#### 3. Test the Form
1. Visit your contact page
2. Fill out the form with test data
3. Submit and verify:
   - Success message appears
   - Email arrives at vinoarsanenterprises@gmail.com
   - Email formatting looks correct

#### 4. Test Anti-Spam Features
- Try submitting immediately (should fail - too fast)
- Try filling the honeypot field using browser inspector (should fail)
- Try adding multiple URLs in message (should fail)

## Anti-Spam Features Explained

### 1. Honeypot Field
- A hidden field named "website" that real users can't see
- Bots often auto-fill all fields and will fill this one
- If filled, submission is rejected

### 2. Timestamp Validation
- Records when the form loads
- Requires at least 3 seconds before submission
- Prevents automated bot submissions

### 3. Pattern Detection
- Scans messages for suspicious patterns
- Detects multiple URLs
- Detects common spam link formats

### 4. Field Validation
- All required fields validated
- Email format validation
- Input sanitization to prevent XSS

## Troubleshooting

### Emails Not Sending
**Possible causes:**
1. PHP mail() function not configured on server
2. Server blocking outbound emails
3. Emails going to spam folder

**Solutions:**
- Check server PHP error logs
- Verify PHP mail() is enabled: `php -i | grep mail`
- Configure SPF/DKIM records for your domain
- Use SMTP instead of PHP mail() (see Advanced Setup)

### Form Not Submitting
**Check:**
1. Browser console for JavaScript errors
2. Ensure contact-handler.php is in the same directory as contact.html
3. Verify server has PHP enabled for the directory

### Spam Still Getting Through
**Additional measures:**
1. Add Google reCAPTCHA
2. Implement rate limiting
3. Use a dedicated form service like FormSpree or Netlify Forms

## Advanced Setup (Optional)

### Using SMTP Instead of PHP mail()

For more reliable email delivery, consider using PHPMailer with SMTP:

```php
// Install PHPMailer via Composer
composer require phpmailer/phpmailer

// Update contact-handler.php to use SMTP
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

$mail = new PHPMailer(true);
$mail->isSMTP();
$mail->Host = 'smtp.gmail.com'; // or your SMTP server
$mail->SMTPAuth = true;
$mail->Username = 'your-email@gmail.com';
$mail->Password = 'your-app-password';
$mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
$mail->Port = 587;
```

### Adding Google reCAPTCHA v3

1. Get reCAPTCHA keys from https://www.google.com/recaptcha/admin
2. Add to contact.html before closing `</head>`:
```html
<script src="https://www.google.com/recaptcha/api.js?render=YOUR_SITE_KEY"></script>
```
3. Add validation to contact-handler.php
4. Verify token with Google's API

## Email Format

Emails are sent in both plain text and HTML format with:
- Sender name and email (with clickable mailto link)
- Phone number (if provided)
- Selected subject
- Message content
- Submission timestamp
- IP address (for spam tracking)
- User agent

## Security Notes

- All user input is sanitized using htmlspecialchars() and strip_tags()
- Email addresses validated with filter_var()
- Honeypot field prevents basic bot submissions
- Timestamp prevents rapid-fire submissions
- Pattern matching catches common spam formats
- No SQL database = no SQL injection risk
- CORS headers allow cross-origin requests (adjust if needed)

## Support

If you encounter any issues:
1. Check server error logs
2. Enable error display in PHP temporarily for debugging
3. Test with browser developer tools open
4. Verify all file paths are correct

## Future Enhancements

Consider adding:
- File upload capability for custom label inquiries
- Auto-responder email to sender
- Form submission logging to database
- Admin dashboard to view submissions
- Integration with CRM system
- Multi-language support
