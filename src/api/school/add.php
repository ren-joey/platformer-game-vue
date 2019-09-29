<?php
// $posts = new stdClass();
// $method = $_POST('method');
// $data = json_decode($_POST['data']);

// $fp2 = fopen('test.json', 'w');
// fwrite($fp2, 'good');
// fclose($fp2);

if (isset($_POST['school_id'], $_POST['school_name'], $_POST['school_name'], $_POST['class'], $_POST['seat_number'], $_POST['name'])) {
    header("Content-Type: application/json; charset=utf-8");

    $host = "db01.coowo.com";
    $username = "nosmoking";
    $password = "Ynq36v?3";
    $dbname = "nosmoking";

    $conn = new mysqli($host, $username, $password, $dbname);
    // set the PDO error mode to exception
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    $school_id = $_POST['school_id'];
    $class = $_POST['class'];
    $num = $_POST['seat_number'];
    $name = $_POST['name'];
    $score = (isset($_POST['score']) ? $_POST['score'] : 0);
    $question = (isset($_POST['question']) ? $_POST['question'] : "{}");
    $url = (isset($_POST['url']) ? $_POST['url'] : "");
    $sql = "INSERT INTO result VALUES ($school_id, $school_name, $class, $num, $name, $question, $url )";

    print "success";
    // $sql = "SELECT school_id=$school, class=$class, seat_number=$num FROM result";
    // $result =  $conn->query($sql);
    // $rows = array();

    // $sql = "SELECT * FROM school";
    // $result = $conn->query($sql);
    // $rows = array();

    // while ($row = $result->fetch_assoc()) {
    //     array_push($rows, $row);
    // }
} else {
    print "error";
}

// include $_POST['data'];
// include $data;