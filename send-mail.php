<?php
/**
 * Contact Form Handler - Matthew Carlson Consulting
 * Sends form submissions to contact@matthewcarlsonconsulting.com
 */

// Configuration
$to_email = "contact@matthewcarlsonconsulting.com";
$subject_prefix = "[Website Contact] ";

// Only allow POST requests
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    header("Location: contact.html");
    exit;
}

// Honeypot check (spam prevention)
if (!empty($_POST['website'])) {
    // Bot detected, silently redirect
    header("Location: contact.html?status=success");
    exit;
}

// Sanitize input
function clean_input($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data, ENT_QUOTES, 'UTF-8');
    return $data;
}

// Get and validate form data
$name = isset($_POST['name']) ? clean_input($_POST['name']) : '';
$email = isset($_POST['email']) ? clean_input($_POST['email']) : '';
$company = isset($_POST['company']) ? clean_input($_POST['company']) : '';
$service = isset($_POST['service']) ? clean_input($_POST['service']) : '';
$message = isset($_POST['message']) ? clean_input($_POST['message']) : '';

// Validate required fields
$errors = [];

if (empty($name)) {
    $errors[] = "Name is required";
}

if (empty($email)) {
    $errors[] = "Email is required";
} elseif (!filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)) {
    $errors[] = "Invalid email format";
}

if (empty($message)) {
    $errors[] = "Message is required";
}

// If there are errors, redirect back with error status
if (!empty($errors)) {
    header("Location: contact.html?status=error&message=" . urlencode(implode(", ", $errors)));
    exit;
}

// Build email content
$email_subject = $subject_prefix . "New inquiry from " . $name;

$email_body = "You have received a new contact form submission.\n\n";
$email_body .= "===========================================\n";
$email_body .= "CONTACT DETAILS\n";
$email_body .= "===========================================\n\n";
$email_body .= "Name: " . $name . "\n";
$email_body .= "Email: " . $_POST['email'] . "\n"; // Use original email for reply-to
$email_body .= "Company: " . ($company ?: "Not provided") . "\n";
$email_body .= "Service Interest: " . ($service ?: "Not specified") . "\n\n";
$email_body .= "===========================================\n";
$email_body .= "MESSAGE\n";
$email_body .= "===========================================\n\n";
$email_body .= $message . "\n\n";
$email_body .= "===========================================\n";
$email_body .= "Sent from: matthewcarlsonconsulting.com contact form\n";
$email_body .= "Submitted: " . date("F j, Y, g:i a T") . "\n";

// Email headers
$headers = "From: website@matthewcarlsonconsulting.com\r\n";
$headers .= "Reply-To: " . $_POST['email'] . "\r\n";
$headers .= "X-Mailer: PHP/" . phpversion() . "\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

// Send email
$mail_sent = mail($to_email, $email_subject, $email_body, $headers);

// Redirect based on result
if ($mail_sent) {
    header("Location: contact.html?status=success");
} else {
    header("Location: contact.html?status=error&message=" . urlencode("Failed to send message. Please email us directly."));
}
exit;
?>
