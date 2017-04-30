<?php 

	$conn = new mysqli('localhost', 'root', '', 'goods');  //連線資料庫（前3個參數照抄，最後一個是資料表名稱

	if ($conn->connect_error){  //看是否可以連線（$conn->connect_error是連線失敗的錯誤訊息）
		die("connection Error:".$conn->connect_error);  //die會顯示文字，且其後的程式不執行
	}


	echo "Connection Success";

	//____________________________________________________________________________________________________________________________________________

	//新增

	$sql = "insert into goods(goodsid, goodsname, goodsscribe, goodscost, goodssize, amount) values ('G01', 'apple', 'USA', 50, '5', 1000);";

	$result = $conn->query($sql);

	if($result == TRUE){  //看是否新增成功
		echo "insert success! id: {$conn->insert_id} <br>";  //$conn->insert_id是insert進來的id
	}

	$sql = "select * from goods;";  //sql語法（此是查詢）

	$result = $conn->query($sql);  //傳回結果

	echo "count: {$result->num_rows} <br>";  //$result->num_rows是筆數
	//___________________________________________________________________________________________________________________________________________________

	//修改

	$sql = "update goods set goodscost = 200 where goodsid='G02';";

	$result = $conn->query($sql);

	if($result == TRUE){  //看是否修改成功
		echo "affected rows:{$conn->affected_rows} <br>";  //$conn->affected_rows會列出所有被影響到的資料
	}

	//___________________________________________________________________________________________________________________________________________


	//刪除

	$sql = "delete from goods where goodsname = 'apple';";

	$result = $conn->query($sql);

	if($result == TRUE){  //看是否刪除成功
		echo "affected rows:{$conn->affected_rows} <br>";  //$conn->affected_rows會列出所有被影響到的資料
	}

	//__________________________________________________________________________________________________________________________________

	//查詢


	$sql = "select * from goods;";  //sql語法（此是查詢）

	$result = $conn->query($sql);  //傳回結果

	echo "count: {$result->num_rows} <br>";  //$result->num_rows是筆數

	$array = [];  //可以陣列存
	while($good = $result->fetch_assoc()){  //因怕記憶體不夠，所以此行是一筆一筆拿出來
		$array[] = $good;
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

	echo "<br>";

	foreach($array as $good){  //用陣列跑的結果
		echo $good['goodsid'];
		echo "<br>";
	}

	//______________________________________________________________________________________________________________________________________________
 
	$conn->close();  //關閉
?>