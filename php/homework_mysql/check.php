<?php
	$goodsid = $_POST["goodsid"];
	$goodsname = $_POST["goodsname"];
	$goodsscribe = $_POST["goodsscribe"];
	$goodscost = $_POST["goodscost"];
	$goodssize = $_POST["goodssize"];
	$amount = $_POST["amount"];

	$older_goodsid = $goodsid;


	$conn = new mysqli('localhost', 'root', '', 'goods');
		if ($conn->connect_error){  //看是否可以連線（$conn->connect_error是連線失敗的錯誤訊息）
			die("connection Error:".$conn->connect_error);  //die會顯示文字，且其後的程式不執行
		}

	mysqli_set_charset($conn, "utf8");


	$sql = "update goods set goodsid = '$goodsid', goodsname = '$goodsname', goodsscribe = '$goodsscribe', goodscost = '$goodscost', goodssize = '$goodssize', amount = '$amount' where goodsid = '$older_goodsid'";

	$result = $conn->query($sql);
	if($result == TRUE){  //看是否修改成功
		echo "affected rows:{$conn->affected_rows} <br>";  //$conn->affected_rows會列出所有被影響到的資料
	}

	header("Location: index.php"); //自動回首頁

?>