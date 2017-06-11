<?php
	@session_start();
	$host='sql306.byethost18.com';
	$dbuser='b18_20209784';
	$dbpassword='movietext';
	$dbname='b18_20209784_filmcritic';
	$_SESSION['link'] = mysqli_connect($host, $dbuser, $dbpassword, $dbname);

	if ($_SESSION['link'])
	{
  	//若傳回正值，就代表已經連線
  	//設定連線編碼為UTF-8
  	//mysqli_query(資料庫連線, "語法內容") 為執行sql語法的函式
   	mysqli_query($_SESSION['link'], "SET NAMES utf8");
  	//echo "已正確連線";
	}
	else
	{
  	//否則就代表連線失敗 mysqli_connect_error() 是顯示連線錯誤訊息
  	echo '無法連線mysql資料庫 :<br/>' . mysqli_connect_error();
	}
?>