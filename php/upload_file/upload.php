<?php
if ($_FILES["file"]["error"] > 0){  //如果沒有錯誤訊息
　echo "Error: " . $_FILES["file"]["error"];
}else{  //列出來看一下（因為是練習測試用）
echo "檔案名稱: " . $_FILES["file"]["name"]."<br/>";
echo "檔案類型: " . $_FILES["file"]["type"]."<br/>";
echo "檔案大小: " . ($_FILES["file"]["size"] / 1024)." Kb<br />";
echo "暫存名稱: " . $_FILES["file"]["tmp_name"];

//移動檔案到我們的upload資料夾內
　if (file_exists("upload/" . $_FILES["file"]["name"])){
　　echo "檔案已經存在，請勿重覆上傳相同檔案";
　}else{
　　move_uploaded_file($_FILES["file"]["tmp_name"],"upload/".$_FILES["file"]["name"]);
　}

}
?>