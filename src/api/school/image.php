<?php

function generateRandomString($length = 10) {
    $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    $charactersLength = strlen($characters);
    $randomString = '';
    for ($i = 0; $i < $length; $i++) {
        $randomString .= $characters[rand(0, $charactersLength - 1)];
    }
    return $randomString;
}

if (isset($_POST['school_id'], $_POST['class'], $_POST['seat_number'], $_POST['image'])) {
    define('UPLOAD_DIR', 'canvas/');
    $filename = generateRandomString(10);
    $img = $_POST['image'];
    $img = str_replace('data:image/png;base64,', '', $img);
    $img = str_replace(' ', '+', $img);
    $data = base64_decode($img);
    $file = $filename.'.png';
    $success = file_put_contents($file, $data);

    $host = "db01.coowo.com";
    $username = "nosmoking";
    $password = "Ynq36v?3";
    $dbname = "nosmoking";

    $conn = new mysqli($host, $username, $password, $dbname);
    $conn->set_charset("utf8");
    // set the PDO error mode to exception
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    $school_id = $_POST['school_id'];
    $class = $_POST['class'];
    $num = $_POST['seat_number'];
    $sql = "UPDATE result SET url='$filename.png' WHERE school_id=$school_id AND class='$class' AND seat_number=$num";
    $conn->query($sql);

    print "success";
} else {
    print "error";
    print_r($_POST);
}