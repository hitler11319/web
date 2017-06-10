<?php
	$goodsid = $_GET["goodsid"];

	$conn = new mysqli('localhost', 'root', '', 'goods');  //連線資料庫（前3個參數照抄，最後一個是資料表名稱
	if ($conn->connect_error){  //看是否可以連線（$conn->connect_error是連線失敗的錯誤訊息）
		die("connection Error:".$conn->connect_error);  //die會顯示文字，且其後的程式不執行
	}

	mysqli_set_charset($conn, "utf8");

	$sql = "delete from goods where goodsid = '$goodsid';";
	$result = $conn->query($sql);
	if($result == TRUE){  //看是否刪除成功
		echo "affected rows:{$conn->affected_rows} <br>";  //$conn->affected_rows會列出所有被影響到的資料
	}

	$conn->close();

	header("Location: index.php"); //自動回首頁

?>