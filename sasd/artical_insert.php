<?php
$id = $_POST['movie_id'];
$title = $_POST['title'];
$quantity = $_POST['quantity'];
$comment = $_POST['comment'];


$conn = new mysqli('localhost', 'root', '', 'filmcritic');
if ($conn->connect_error) {
    die($conn->connect_error);
}
mysqli_set_charset($conn, 'utf8');

$sql =" INSERT INTO artical(MovieID, ArticalTitle, Spoiler, artical_content) values ('$id', '$title', '$quantity', '$comment');";

$result = $conn->query($sql);
$conn->close();

header("location:movie_text.php?id=".$id);