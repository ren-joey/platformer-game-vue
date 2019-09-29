<?php

if (isset($_POST['school_id'], $_POST['class'], $_POST['seat_number'], $_POST['score'], $_POST['question'])) {
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
    $score = $_POST['score'];
    $question = $_POST['question'];
    $sql = "UPDATE result SET score=$score, question='$question' WHERE school_id=$school_id AND class='$class' AND seat_number=$num";
    $conn->query($sql);

    print "success";
} else {
    print "error";
    print_r($_POST);
}
