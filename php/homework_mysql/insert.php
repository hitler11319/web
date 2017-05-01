
<?php
	$goodsid = $_POST["goodsid"];
	$goodsname = $_POST["goodsname"];
	$goodsscribe = $_POST["goodsscribe"];
	$goodscost = $_POST["goodscost"];
	$goodssize = $_POST["goodssize"];
	$amount = $_POST["amount"];


	if($goodsid != "" && $goodsname != "" && $goodsscribe != "" && $goodscost != "" && $goodssize != "" && $amount != ""){
		$conn = new mysqli('localhost', 'root', '', 'goods');
		if ($conn->connect_error){  //看是否可以連線（$conn->connect_error是連線失敗的錯誤訊息）
			die("connection Error:".$conn->connect_error);  //die會顯示文字，且其後的程式不執行
		}

		$sql = "insert into goods(goodsid, goodsname, goodsscribe, goodscost, goodssize, amount) values ('$goodsid', '$goodsname', '$goodsscribe', '$goodscost', '$goodssize', '$amount');";
		//要面的參數一定要用單引號！！！（很重要，說三次）
		$result = $conn->query($sql);
		if($result == TRUE){  //看是否新增成功
		echo "insert success! id: {$conn->insert_id} <br>";  //$conn->insert_id是insert進來的id
	}

		$conn->close();
	}	
	header("Location: index.php"); //自動回首頁
?>