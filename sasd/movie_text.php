<?php
  session_start();
  if (!isset($_SESSION['login_user_id'])){$_SESSION['login_user_id'] = 0;}  
  //session_destroy();
  //載入db.php，就可以連資料庫
  require_once 'db.php';
?>

<?php
    $id = $_GET['id'];

    $conn = new mysqli('localhost', 'root', '', 'filmcritic');
                

                    if ($conn->connect_error){  //看是否可以連線（$conn->connect_error是連線失敗的錯誤訊息）
                        die("connection Error:".$conn->connect_error);  //die會顯示文字，且其後的程式不執行
                    }

		    mysqli_set_charset($conn, 'utf8');
                    $sql = "SELECT * FROM movie where MovieID = '$id' ;";

                    $result = $conn->query($sql);
                    while($row = $result->fetch_assoc()){
                    $info = $row['MovieIntroduction'];
                    }
  
?>

<!DOCTYPE html>
<html>
	
	<head>
	<title>電影文章</title>
	<meta charset = "utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
        <!--隨網站而變大變小-->
        <script src="SpryAssets/SpryTabbedPanels.js" type="text/javascript"></script>
        <!--頁籤-->
        <link href="SpryAssets/SpryTabbedPanels1.css" rel="stylesheet" type="text/css" />

        <!--項目列表（bookstrap的）-->
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-  BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
        <script src="http://ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js"></script>
	</head>
	<body>
    <?php 
        if($_SESSION['login_user_id']>0){
            echo "<center><br><a href='write.php?id=".$id."' target='_self' style='width:30% ;font-size:30px;font-weight: bold; margin-left:100px'>我要寫文章</a></br></center>"; 
        }
        ?>
	<table>
        <tr>
            <hr>
            <!--<td><img src = "img/movie_text_pic.jpg" style = "width:80%"></td>-->
          <?php
	        echo "<td><img src = 'img/".$id.".jpg' style = 'width:50%; margin-left:100px'></td>";
            echo "<td style='width:50%;font-size:30px;font-weight: bold'>".$info."</td>";
          ?>
        </tr>
    </table>

<hr>
<center>
<h1 style="color:blue; font-size:200% ;font-weight: bold">文章列表</h1>
 	<div class="container1" style="font-weight: bold">
                <?php
                    mysqli_set_charset($conn, 'utf-8');
                    $sql = "SELECT * FROM artical where MovieID = '$id' ;";
                
                    $result = $conn->query($sql);
                    while($row = $result->fetch_assoc()){
                    echo "<a class='list-group-item' href='artical_text.php?id=".$row['ArticalID']."' style='background-color:#93FF93;font-size:24pt' target = '_self'>".$row['ArticalTitle']."（劇透度：".$row['Spoiler']."）</a>";
                    }

                    $conn->close();
                ?>
        </div>
	</center>
	</body>
</html>