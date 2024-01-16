<?php
if( !isset($_SERVER['HTTP_REFERER']) ){
    header("HTTP/1.0 404 Not Found");
    exit();
}


require '../lib/PHPMailer-master/PHPMailerAutoload.php';


function BadRequest($str=''){
    header("HTTP/1.0 400 Bad Request");
    exit($str);
}

if( !isset( $_POST['contact']) ){
    BadRequest();
}

$contact = $_POST['contact'];

//get contact data and sanitize
$fName = filter_var($contact['firstName'], FILTER_SANITIZE_STRING);
$lName = filter_var($contact['lastName'], FILTER_SANITIZE_STRING);
$email = filter_var($contact['email'], FILTER_SANITIZE_EMAIL);
$message = nl2br( filter_var($contact['message'], FILTER_SANITIZE_STRING) );
$notBot = (bool) filter_var( $contact['notBot'], FILTER_VALIDATE_BOOLEAN ) ;

//validation failed
if( $fName=='' || !filter_var($email, FILTER_VALIDATE_EMAIL) || $message=='' || !$notBot ){
    BadRequest('Check required input fields ot email address!');
}


/*
 * PHPMailer class
 * 
 * SEE COMPLET DOCUMENTATION HERE: https://github.com/PHPMailer/PHPMailer
 * 
 */

$mail = new PHPMailer;

$mail->setFrom($email, $fName);        // set from address
$mail->addAddress('YOUREMAILADDRESS'); // Add a recipient
$mail->isHTML(true);                   // Set email format to HTML

$mail->Subject = 'Contact';
$mail->Body    = $message;

if(!$mail->send()) {
    BadRequest( 'Message could not be sent: '.$mail->ErrorInfo);
}


