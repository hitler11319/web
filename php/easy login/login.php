<?php

  $username = $_POST["username"];
  $password = $_POST["password"];

  if($username == "root" && $password == "root"){
    echo "seccuss";
  }
  else{
    echo "<script>alert('fail'); location.href = 'cookies.php';</script>";  //先跑出錯誤訊息再跳轉
  }
?>
