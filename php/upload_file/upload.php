<?php

if ($_FILES['file']['error'] > 0){  //如果沒有錯誤訊息
　exit("檔案上傳失敗！"); //如果出現錯誤則停止程式
}

//移動檔案到我們的upload資料夾內
if(file_exists("upload/".$_FILES['file']['name'])){
	echo "<p>檔案已經存在，請勿重覆上傳相同檔案</p>";
}else{

	//列出來看一下（因為是練習測試用）
	echo "<p>檔案名稱: ".$_FILES['file']['name']."</p><br/>";
	echo "<p>檔案類型: ".$_FILES['file']['type']."</p><br/>";
	echo "<p>檔案大小: ".($_FILES['file']['size'] / 1024)." Kb</p><br />";
	echo "<p>暫存名稱: ".$_FILES['file']['tmp_name']."</p>";

	move_uploaded_file($_FILES["file"]["tmp_name"],"upload/".$_FILES["file"]["name"]);
	echo '<a href="upload/'.$_FILES['file']['name'].'">file:'.$_FILES['file']['name'].'</a>';//顯示檔案路徑
}
	

?>