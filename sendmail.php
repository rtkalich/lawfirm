<?php
	use PHPMailer\PHPMailer\PHPMailer;
	use PHPMailer\PHPMailer\Exception;

	require 'phpmailer/src/Exception.php';
	require 'phpmailer/src/PHPMailer.php';

	$mail = new PHPMailer(true);
	$mail->CharSet = 'UTF-8';
	$mail->setLanguage('ru', 'phpmailer/language/');
	$mail->IsHTML(true);

	//От кого письмо
	$mail->setFrom('Лист з сайту');
	//Кому отправить
	$mail->addAddress('yk.partners.lf@gmail.com');
	//Тема письма
	$mail->Subject = 'Лист з сайту';

	

	//Тело письма
	$body = '<h1>Лист з сайту</h1>';
	
	if(trim(!empty($_POST['name']))){
		$body.='<p><strong>Им*я:</strong> '.$_POST['name'].'</p>';
	}
	if(trim(!empty($_POST['email']))){
		$body.='<p><strong>E-mail:</strong> '.$_POST['email'].'</p>';
	}
	if(trim(!empty($_POST['tel']))){
		$body.='<p><strong>телефон:</strong> '.$_POST['tel'].'</p>';
	}
	

	$mail->Body = $body;

	//Отправляем
	if (!$mail->send()) {
		$message = 'Ошибка';
	} else {
		$message = 'Данные отправлены!';
	}

	$response = ['message' => $message];

	header('Content-type: application/json');
	echo json_encode($response);
?>