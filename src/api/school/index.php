<?php
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

$sql = "SELECT * FROM school";
$result = $conn->query($sql);
$rows = array();

while ($row = $result->fetch_assoc()) {
    array_push($rows, $row);
}
echo json_encode($rows)
?>