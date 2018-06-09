<!doctype html>
<html>
<head>
	<meta charset="utf-8">
	<title>my sql homework (crud)</title>
	<style>
		table, tr, td {
			border:1px solid gray;
		}
	</style>
</head>
<body>
	<table>
		<tr>
			<td>goodsid</td>
			<td>goodsname</td>
			<td>goodsscribe</td>
			<td>goodscost</td>
			<td>goodssize</td>
			<td>amount</td>
			<td>update</td>
			<td>delete</td>
		</tr>

		<?php
			$conn = new mysqli('localhost', 'root', '', 'goods');  //連線資料庫（前3個參數照抄，最後一個是資料表名稱
			if ($conn->connect_error){  //看是否可以連線（$conn->connect_error是連線失敗的錯誤訊息）
				die("connection Error:".$conn->connect_error);  //die會顯示文字，且其後的程式不執行
			}

			mysqli_set_charset($conn, "utf8");


			$sql = "select * from goods;";  //sql語法（此是查詢）
			$result = $conn->query($sql);  //傳回結果
			echo "count: {$result->num_rows} <br>";  //$result->num_rows是筆數

			while($good = $result->fetch_assoc()){  //因怕記憶體不夠，所以此行是一筆一筆拿出來
				echo nl2br("<tr><td>".$good["goodsid"]."</td><td>".$good["goodsname"]."</td><td>".$good["goodsscribe"]."</td><td>".$good["goodscost"]."</td><td>".$good["goodssize"]."</td><td>".$good["amount"]."</td><td>  <a href='update.php?goodsid=".$good["goodsid"]."'>修改</a></td><td><a href='delete.php?goodsid=".$good["goodsid"]."'>刪除</a></td></tr>");
			}
			$conn->close();

			//這邊因為php列出資料階段不支援js，所以看起來得用網址，但相對危險（以下2點是我想到的解決方案）
			// 1.每個table再用form包起來，將要傳出去的寫在隱藏的input中，只要按下按鈕就會把此form傳出去（一筆資料一個form）
			// 2.都先列出資料後，在下方寫js（內容就寫button 按下去後傳什麼）  ex:  document.getElementlyById('aaa').onclick = "";  這種寫法
			// 3.或試試 在button onclick裡寫 <?php echo "<script> document.getElementryById('demo').value = '3'; </script> ? >" 這樣寫(在php中再包一個php的echo)
		?>
	</table>
	<br>
	<hr>
	<form  id = "form1" action="" method="post">
  		goodsid: <input type="text" name="goodsid"><br><p>
  		goodsname: <input type="text" name="goodsname"><br><p>
  		goodsscribe: <input type="text" name="goodsscribe"><br><p>
  		goodscost: <input type="text" name="goodscost"><br><p>
  		goodssize: <input type="text" name="goodssize"><br><p>
  		amount: <input type="text" name="amount"><br><p>
  		<button style="font-size:24px" onclick="document.getElementById('form1').action = 'insert.php'">add</button>
  		<button style="font-size:24px" onclick="document.getElementById('form1').action = 'select.php'">查詢</button>
	</form>

</body>
</html>