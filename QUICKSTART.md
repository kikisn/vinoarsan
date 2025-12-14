# Quick Start Guide - 5 Minutes to Working Contact Form

## TL;DR
```bash
# 1. Upload files to server
# 2. Run setup
./setup.sh

# 3. Configure SMTP (choose one)
nano email-config.php

# 4. Test form
```

---

## Step-by-Step

### 1. Upload Files (2 min)
Upload these files to your web server:
- `contact.html`
- `contact-handler.php`
- `email-config.example.php`
- `composer.json`
- `setup.sh`
- `scripts.js`
- `styles.css`

### 2. Run Setup (1 min)
```bash
cd /path/to/your/website
./setup.sh
```

This installs PHPMailer and creates `email-config.php`

### 3. Configure SMTP (2 min)

#### Option A: Gmail (Easiest)
1. Visit https://myaccount.google.com/apppasswords
2. Generate app password
3. Edit `email-config.php`:
   ```php
   'username' => 'your-email@gmail.com',
   'password' => 'abcd efgh ijkl mnop',  // App password
   ```

#### Option B: SendGrid (Better for production)
1. Sign up at https://sendgrid.com
2. Create API key
3. Edit `email-config.php`:
   ```php
   'host' => 'smtp.sendgrid.net',
   'username' => 'apikey',
   'password' => 'SG.your-api-key-here',
   ```

### 4. Test (30 seconds)
1. Visit your contact page
2. Fill out form
3. Check inbox!

---

## Done!

Emails will now be delivered reliably via SMTP instead of unreliable PHP mail().

**Need more details?**
- Full guide: [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)
- Summary: [SMTP_IMPLEMENTATION_SUMMARY.md](SMTP_IMPLEMENTATION_SUMMARY.md)
- Features: [CONTACT_FORM_README.md](CONTACT_FORM_README.md)

**Troubleshooting?**
- Emails not arriving → Check spam folder
- Authentication error → Verify credentials
- Connection timeout → Check firewall/port 587
- Enable debug: Set `'debug' => true` in email-config.php
