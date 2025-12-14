<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

error_reporting(E_ALL);
ini_set('display_errors', 0);
ini_set('log_errors', 1);

$recipient_email = 'sales@vinoarsan.com';
$from_email = 'noreply@vinoarsan.com';

function sendResponse($success, $message, $errors = []) {
    echo json_encode([
        'success' => $success,
        'message' => $message,
        'errors' => $errors
    ]);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    sendResponse(false, 'Invalid request method');
}

$data = json_decode(file_get_contents('php://input'), true);
if (!$data) {
    $data = $_POST;
}

$errors = [];

if (!empty($data['website'])) {
    error_log('Contact form spam detected: honeypot field filled');
    sendResponse(false, 'Form submission failed. Please try again.');
}

if (isset($data['timestamp'])) {
    $time_elapsed = time() - intval($data['timestamp']);
    if ($time_elapsed < 3) {
        error_log('Contact form spam detected: submitted too quickly');
        sendResponse(false, 'Form submission failed. Please take your time filling out the form.');
    }
}

$required_fields = ['firstName', 'lastName', 'email', 'subject', 'message'];
foreach ($required_fields as $field) {
    if (empty($data[$field])) {
        $errors[$field] = ucfirst(str_replace('_', ' ', $field)) . ' is required';
    }
}

if (!empty($data['email']) && !filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
    $errors['email'] = 'Invalid email address';
}

$suspicious_patterns = ['/\[url=/i', '/\[link=/i', '/<a href=/i', '/http.*http.*http/i'];
foreach ($suspicious_patterns as $pattern) {
    if (preg_match($pattern, $data['message'])) {
        error_log('Contact form spam detected: suspicious pattern in message');
        sendResponse(false, 'Form submission failed. Please remove any links from your message.');
    }
}

if (!empty($errors)) {
    sendResponse(false, 'Please correct the errors in the form', $errors);
}

$firstName = htmlspecialchars(strip_tags(trim($data['firstName'])));
$lastName = htmlspecialchars(strip_tags(trim($data['lastName'])));
$email = filter_var(trim($data['email']), FILTER_SANITIZE_EMAIL);
$phone = htmlspecialchars(strip_tags(trim($data['phone'] ?? '')));
$subject = htmlspecialchars(strip_tags(trim($data['subject'])));
$message = htmlspecialchars(strip_tags(trim($data['message'])));

$subject_map = [
    'general' => 'General Inquiry',
    'bulk' => 'Bulk Orders',
    'custom' => 'Custom Labels',
    'seminar' => 'Wine-Making Seminars',
    'product' => 'Product Information',
    'other' => 'Other'
];
$subject_text = $subject_map[$subject] ?? $subject;

$email_subject = "Contact Form: $subject_text - From $firstName $lastName";

$email_body = "You have received a new contact form submission from the Vino Arsan website.\n\n";
$email_body .= "---Contact Details---\n";
$email_body .= "Name: $firstName $lastName\n";
$email_body .= "Email: $email\n";
$email_body .= "Phone: " . ($phone ?: 'Not provided') . "\n";
$email_body .= "Subject: $subject_text\n\n";
$email_body .= "---Message---\n";
$email_body .= "$message\n\n";
$email_body .= "---Additional Information---\n";
$email_body .= "Submitted: " . date('Y-m-d H:i:s') . "\n";
$email_body .= "IP Address: " . $_SERVER['REMOTE_ADDR'] . "\n";
$email_body .= "User Agent: " . $_SERVER['HTTP_USER_AGENT'] . "\n";

$email_html = "
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background-color: #722f37; color: white; padding: 20px; text-align: center; }
        .content { background-color: #f9f9f9; padding: 20px; }
        .field { margin-bottom: 15px; }
        .label { font-weight: bold; color: #722f37; }
        .value { margin-top: 5px; }
        .message-box { background-color: white; padding: 15px; border-left: 4px solid #722f37; margin: 15px 0; }
        .footer { background-color: #f0f0f0; padding: 15px; font-size: 12px; color: #666; }
    </style>
</head>
<body>
    <div class='container'>
        <div class='header'>
            <h2>New Contact Form Submission</h2>
        </div>
        <div class='content'>
            <div class='field'>
                <div class='label'>Name:</div>
                <div class='value'>$firstName $lastName</div>
            </div>
            <div class='field'>
                <div class='label'>Email:</div>
                <div class='value'><a href='mailto:$email'>$email</a></div>
            </div>
            <div class='field'>
                <div class='label'>Phone:</div>
                <div class='value'>" . ($phone ?: 'Not provided') . "</div>
            </div>
            <div class='field'>
                <div class='label'>Subject:</div>
                <div class='value'>$subject_text</div>
            </div>
            <div class='field'>
                <div class='label'>Message:</div>
                <div class='message-box'>$message</div>
            </div>
        </div>
        <div class='footer'>
            <p><strong>Submission Details:</strong></p>
            <p>Date: " . date('F j, Y, g:i a') . "</p>
            <p>IP Address: " . $_SERVER['REMOTE_ADDR'] . "</p>
        </div>
    </div>
</body>
</html>
";

$headers = "From: Vino Arsan Contact Form <$from_email>\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: multipart/alternative; boundary=\"boundary-string\"\r\n";

$email_message = "--boundary-string\r\n";
$email_message .= "Content-Type: text/plain; charset=UTF-8\r\n";
$email_message .= "Content-Transfer-Encoding: 7bit\r\n\r\n";
$email_message .= "$email_body\r\n";
$email_message .= "--boundary-string\r\n";
$email_message .= "Content-Type: text/html; charset=UTF-8\r\n";
$email_message .= "Content-Transfer-Encoding: 7bit\r\n\r\n";
$email_message .= "$email_html\r\n";
$email_message .= "--boundary-string--";

$mail_sent = mail($recipient_email, $email_subject, $email_message, $headers);

if ($mail_sent) {
    error_log('Contact form submission successful from: ' . $email);
    sendResponse(true, 'Thank you for your message! We will get back to you soon.');
} else {
    error_log('Contact form email failed to send from: ' . $email);
    sendResponse(false, 'Sorry, there was an error sending your message. Please try again or email us directly at sales@vinoarsan.com');
}
?>
