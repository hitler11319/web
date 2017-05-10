<!doctype html>
<html>
<head>
	<meta charset="utf-8">
	<title>my sql homework (crud)</title>
</head>
<body>

<?php
	$goods_id = $_GET["goodsid"];

	$conn = new mysqli('localhost', 'root', '', 'goods');  //連線資料庫（前3個參數照抄，最後一個是資料表名稱
	if ($conn->connect_error){  //看是否可以連線（$conn->connect_error是連線失敗的錯誤訊息）
		die("connection Error:".$conn->connect_error);  //die會顯示文字，且其後的程式不執行
	}

	mysql_set_charset($conn, "utf-8");

	$sql = "select * from goods where goodsid = '$goods_id';";  //sql語法（此是查詢）
		$result = $conn->query($sql);  //傳回結果

		while($good = $result->fetch_assoc()){  //因怕記憶體不夠，所以此行是一筆一筆拿出來
			$goodsid = $good["goodsid"];
			$goodsname = $good["goodsname"];
			$goodsscribe = $good["goodsscribe"];
			$goodscost = $good["goodscost"];
			$goodssize = $good["goodssize"];
			$amount = $good["amount"];
		}

	$conn->close();

?>

<form action="check.php" method="post">
  	goodsid: <input type="text" name="goodsid" value = <?php echo $goodsid; ?>><br><p>
  	goodsname: <input type="text" name="goodsname" value = <?php echo $goodsname; ?>><br><p>
  	goodsscribe: <input type="text" name="goodsscribe" value = <?php echo $goodsscribe; ?>><br><p>
  	goodscost: <input type="text" name="goodscost" value = <?php echo $goodscost; ?>><br><p>
  	goodssize: <input type="text" name="goodssize" value = <?php echo $goodssize; ?>><br><p>
  	amount: <input type="text" name="amount" value = <?php echo $amount; ?>><br><p>
  	<button style="font-size:24px">ok</button>
</form>
</body>
</html>