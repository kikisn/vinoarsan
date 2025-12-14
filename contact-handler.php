<?php
/**
 * Vino Arsan Contact Form Handler with SMTP Support
 * Uses PHPMailer for reliable email delivery
 */

// Load configuration
$config = require_once 'email-config.php';

// Load PHPMailer (via Composer autoload)
if (file_exists('vendor/autoload.php')) {
    require 'vendor/autoload.php';
} else {
    // Fallback error if PHPMailer is not installed
    header('Content-Type: application/json');
    echo json_encode([
        'success' => false,
        'message' => 'Email system not configured. Please run: composer install'
    ]);
    exit;
}

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

// Set headers
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Error handling
error_reporting(E_ALL);
ini_set('display_errors', 0);
ini_set('log_errors', 1);

/**
 * Send JSON response and exit
 */
function sendResponse($success, $message, $errors = []) {
    echo json_encode([
        'success' => $success,
        'message' => $message,
        'errors' => $errors
    ]);
    exit;
}

// Check request method
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    sendResponse(false, 'Invalid request method');
}

// Get POST data
$data = json_decode(file_get_contents('php://input'), true);
if (!$data) {
    $data = $_POST;
}

$errors = [];

// ANTI-SPAM VALIDATION

// 1. Honeypot field check
if (!empty($data['website'])) {
    error_log('Contact form spam detected: honeypot field filled');
    sendResponse(false, 'Form submission failed. Please try again.');
}

// 2. Timestamp check
if (isset($data['timestamp'])) {
    $time_elapsed = time() - intval($data['timestamp']);
    if ($time_elapsed < 3) {
        error_log('Contact form spam detected: submitted too quickly (' . $time_elapsed . ' seconds)');
        sendResponse(false, 'Form submission failed. Please take your time filling out the form.');
    }
}

// 3. Required field validation
$required_fields = ['firstName', 'lastName', 'email', 'subject', 'message'];
foreach ($required_fields as $field) {
    if (empty($data[$field])) {
        $errors[$field] = ucfirst(str_replace('_', ' ', $field)) . ' is required';
    }
}

// 4. Email validation
if (!empty($data['email']) && !filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
    $errors['email'] = 'Invalid email address';
}

// 5. Suspicious pattern detection
$suspicious_patterns = [
    '/\[url=/i',
    '/\[link=/i',
    '/<a href=/i',
    '/http.*http.*http/i',
];

foreach ($suspicious_patterns as $pattern) {
    if (isset($data['message']) && preg_match($pattern, $data['message'])) {
        error_log('Contact form spam detected: suspicious pattern in message');
        sendResponse(false, 'Form submission failed. Please remove any links from your message.');
    }
}

// Return errors if any
if (!empty($errors)) {
    sendResponse(false, 'Please correct the errors in the form', $errors);
}

// SANITIZE INPUT
$firstName = htmlspecialchars(strip_tags(trim($data['firstName'])));
$lastName = htmlspecialchars(strip_tags(trim($data['lastName'])));
$email = filter_var(trim($data['email']), FILTER_SANITIZE_EMAIL);
$phone = htmlspecialchars(strip_tags(trim($data['phone'] ?? '')));
$subject = htmlspecialchars(strip_tags(trim($data['subject'])));
$message = htmlspecialchars(strip_tags(trim($data['message'])));

// Map subject codes to readable text
$subject_map = [
    'general' => 'General Inquiry',
    'bulk' => 'Bulk Orders',
    'custom' => 'Custom Labels',
    'seminar' => 'Wine-Making Seminars',
    'product' => 'Product Information',
    'other' => 'Other'
];
$subject_text = $subject_map[$subject] ?? $subject;

// BUILD EMAIL CONTENT
$email_subject = $config['subject_prefix'] . ": $subject_text - From $firstName $lastName";

// Plain text version
$email_body = "You have received a new contact form submission from the Vino Arsan website.\n\n";
$email_body .= "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n";
$email_body .= "CONTACT DETAILS\n";
$email_body .= "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n";
$email_body .= "Name: $firstName $lastName\n";
$email_body .= "Email: $email\n";
$email_body .= "Phone: " . ($phone ?: 'Not provided') . "\n";
$email_body .= "Subject: $subject_text\n\n";
$email_body .= "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n";
$email_body .= "MESSAGE\n";
$email_body .= "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n";
$email_body .= "$message\n\n";
$email_body .= "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n";
$email_body .= "SUBMISSION DETAILS\n";
$email_body .= "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n";
$email_body .= "Submitted: " . date('F j, Y \a\t g:i A') . "\n";
$email_body .= "IP Address: " . $_SERVER['REMOTE_ADDR'] . "\n";
$email_body .= "User Agent: " . $_SERVER['HTTP_USER_AGENT'] . "\n";

// HTML version
$email_html = "
<!DOCTYPE html>
<html>
<head>
    <meta charset='UTF-8'>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            margin: 0;
            padding: 0;
            background-color: #f5f5f5;
        }
        .container {
            max-width: 600px;
            margin: 20px auto;
            background: white;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
        .header {
            background: linear-gradient(135deg, #722f37 0%, #8b3a45 100%);
            color: white;
            padding: 30px 20px;
            text-align: center;
        }
        .header h2 {
            margin: 0;
            font-size: 24px;
            font-weight: 600;
        }
        .content {
            padding: 30px;
        }
        .field {
            margin-bottom: 20px;
            padding-bottom: 20px;
            border-bottom: 1px solid #eee;
        }
        .field:last-child {
            border-bottom: none;
            margin-bottom: 0;
        }
        .label {
            font-weight: 600;
            color: #722f37;
            font-size: 12px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-bottom: 8px;
        }
        .value {
            color: #333;
            font-size: 15px;
        }
        .value a {
            color: #722f37;
            text-decoration: none;
        }
        .message-box {
            background-color: #f9f9f9;
            padding: 20px;
            border-left: 4px solid #722f37;
            border-radius: 4px;
            font-size: 15px;
            line-height: 1.7;
            white-space: pre-wrap;
            word-wrap: break-word;
        }
        .footer {
            background-color: #f5f5f5;
            padding: 20px;
            font-size: 12px;
            color: #666;
            text-align: center;
        }
        .footer p {
            margin: 5px 0;
        }
        .reply-button {
            display: inline-block;
            background-color: #722f37;
            color: white;
            padding: 12px 24px;
            text-decoration: none;
            border-radius: 4px;
            margin-top: 10px;
            font-weight: 600;
        }
    </style>
</head>
<body>
    <div class='container'>
        <div class='header'>
            <h2>📧 New Contact Form Submission</h2>
        </div>
        <div class='content'>
            <div class='field'>
                <div class='label'>Full Name</div>
                <div class='value'>$firstName $lastName</div>
            </div>
            <div class='field'>
                <div class='label'>Email Address</div>
                <div class='value'><a href='mailto:$email'>$email</a></div>
                <a href='mailto:$email' class='reply-button'>Reply to $firstName</a>
            </div>
            <div class='field'>
                <div class='label'>Phone Number</div>
                <div class='value'>" . ($phone ?: '<em>Not provided</em>') . "</div>
            </div>
            <div class='field'>
                <div class='label'>Subject</div>
                <div class='value'>$subject_text</div>
            </div>
            <div class='field'>
                <div class='label'>Message</div>
                <div class='message-box'>$message</div>
            </div>
        </div>
        <div class='footer'>
            <p><strong>Submission Details</strong></p>
            <p>📅 " . date('F j, Y \a\t g:i A') . "</p>
            <p>🌐 IP: " . $_SERVER['REMOTE_ADDR'] . "</p>
        </div>
    </div>
</body>
</html>
";

// SEND EMAIL USING PHPMAILER
try {
    $mail = new PHPMailer(true);

    // Enable debugging if configured
    if ($config['debug']) {
        $mail->SMTPDebug = SMTP::DEBUG_SERVER;
    }

    // SMTP Configuration
    if ($config['smtp']['enabled']) {
        $mail->isSMTP();
        $mail->Host = $config['smtp']['host'];
        $mail->SMTPAuth = $config['smtp']['auth'];
        $mail->Username = $config['smtp']['username'];
        $mail->Password = $config['smtp']['password'];
        $mail->SMTPSecure = $config['smtp']['encryption'];
        $mail->Port = $config['smtp']['port'];
    } else {
        // Use PHP's mail() function
        $mail->isMail();
    }

    // Recipients
    $mail->setFrom($config['from_email'], $config['from_name']);
    $mail->addAddress($config['recipient_email'], $config['recipient_name']);
    $mail->addReplyTo($email, "$firstName $lastName");

    // Content
    $mail->isHTML(true);
    $mail->Subject = $email_subject;
    $mail->Body = $email_html;
    $mail->AltBody = $email_body;
    $mail->CharSet = 'UTF-8';

    // Send email
    $mail->send();

    // Log success
    error_log("Contact form submission successful from: $email");

    // Send success response
    sendResponse(true, 'Thank you for your message! We will get back to you soon.');

} catch (Exception $e) {
    // Log detailed error
    error_log("Contact form email failed: {$mail->ErrorInfo}");

    // Send user-friendly error
    sendResponse(false, 'Sorry, there was an error sending your message. Please try again or email us directly at ' . $config['recipient_email']);
}
