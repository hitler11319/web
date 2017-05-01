
<?php
	$count = 0;
	
	$goodsid = $_POST["goodsid"];
	$goodsname = $_POST["goodsname"];
	$goodsscribe = $_POST["goodsscribe"];
	$goodscost = $_POST["goodscost"];
	$goodssize = $_POST["goodssize"];
	$amount = $_POST["amount"];


	$conn = new mysqli('localhost', 'root', '', 'goods');
	if ($conn->connect_error){  //看是否可以連線（$conn->connect_error是連線失敗的錯誤訊息）
		die("connection Error:".$conn->connect_error);  //die會顯示文字，且其後的程式不執行
	}

	$sql = "select * from goods ";

	if($goodsid != "" || $goodsname != "" || $goodsscribe != "" || $goodscost != "" || $goodssize != "" || $amount != ""){
		$sql = $sql."where ";

		if($goodsid != ""){check_and($count, $sql); $sql = $sql."goodsid = '$goodsid '"; $count = $count+1;}
		if($goodsname != ""){check_and($count, $sql); $sql = $sql."goodsname = '$goodsname '"; $count = $count+1;}
		if($goodsscribe != ""){check_and($count, $sql); $sql = $sql."goodsscribe = '$goodsscribe '"; $count = $count+1;}
		if($goodscost != ""){check_and($count, $sql); $sql = $sql."goodscost = '$goodscost '"; $count = $count+1;}
		if($goodssize != ""){check_and($count, $sql); $sql = $sql."goodssize = '$goodssize '"; $count = $count+1;}
		if($amount != ""){check_and($count, $sql); $sql = $sql."amount = '$amount '"; $count = $count+1;}
	}


	$sql = $sql.";";

	$result = $conn->query($sql);
	while($good = $result->fetch_assoc()){  //因怕記憶體不夠，所以此行是一筆一筆拿出來
		echo $good['goodsid'];
		echo " ";
		echo $good['goodsname'];
		echo " ";
		echo $good['goodsscribe'];
		echo " ";
		echo $good['goodscost'];
		echo " ";
		echo $good['goodssize'];
		echo " ";
		echo $good['amount'];
		echo "<br>";	
	}

	$conn->close();
	echo "<a href = 'index.php'>home</a>";

	function check_and($count, $sql){
		if($count > 0){$sql = $sql." and";}
	}
?>