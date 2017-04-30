<?php

  $username = $_POST["username"];
  $password = $_POST["password"];

  if($username == "root" && $password == "root"){
    echo "seccuss";
  }
  else{
    echo "fail";
  }
?>