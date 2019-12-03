<?php
$host = "db01.coowo.com";
$username = "nosmoking";
$password = "Ynq36v?3";
$dbname = "nosmoking";

// $host = "db01.coowo.com";
// $username = "nosmokingcomtw";
// $password = "Rgc0*31f";
// $dbname = "nosmokingcomtw";

$conn = new mysqli($host, $username, $password, $dbname);
$conn->set_charset("utf8");
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
$response->schools = $rows;

// $sql = "SELECT * FROM result ORDER BY score DESC";
// $result = $conn->query($sql);
// $rank = array();
// while ($user = $result->fetch_assoc()) {
//     array_push($rank, $user);
// }
// $response->rank = $rank;

$sql = "SELECT * FROM result";
$result = $conn->query($sql);
$users = array();
while ($user = $result->fetch_assoc()) {
    array_push($users, $user);
}
$response->users = array_reverse($users);

echo json_encode($response);
?>