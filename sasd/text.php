<?php
    $name = $_GET['name'];
?>
<!DOCTYPE html>
<html lang="utf-8">
  <!--套用助教給的bootstrap樣板-->
  <head>
    <meta charset="utf-8">
    <title>電影觀賞心得分享平台</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <link rel="stylesheet" href="https://bootswatch.com/cyborg/bootstrap.min.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.0/jquery.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
    <!-- HTML5 shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!--[if lt IE 9]>
    <script src="../bower_components/html5shiv/dist/html5shiv.js"></script>
    <script src="../bower_components/respond/dest/respond.min.js"></script>
    <![endif]-->
    <script>
    var _gaq = _gaq || [];
    _gaq.push(['_setAccount', 'UA-23019901-1']);
    _gaq.push(['_setDomainName', "bootswatch.com"]);
    _gaq.push(['_setAllowLinker', true]);
    _gaq.push(['_trackPageview']);
    (function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
    })();
    </script>
  </head>
  <body>
        <br>

        <center>
            <form method="get" action="text.php" style=" font-weight: bold;font-size:30px">
                <label for="name">欲搜尋電影文章名稱:</label>
                <input type="text" name="name" value="" />
                <button type="submit"> 搜尋</button>
            </form>
        </center>

        <br>
        <hr>
      
        <center>
          <h1 style="color:blue; font-size:200% ;font-weight: bold">電影列表</h1>

            <div class="container1" style="font-weight: bold">
                <?php
                   
                    $conn = new mysqli('localhost', 'root', '', 'filmcritic');

                    if ($conn->connect_error){  //看是否可以連線（$conn->connect_error是連線失敗的錯誤訊息）
                        die("connection Error:".$conn->connect_error);  //die會顯示文字，且其後的程式不執行
                    }
                    mysqli_set_charset($conn, 'utf8');

                    if($name == ""){$sql = "SELECT * FROM movie; ";}
                    else{$sql = "SELECT * FROM movie where movie = '$name' ;";}
                    
                    $result = $conn->query($sql);
                    while($row = $result->fetch_assoc()){
                    echo "<a class='list-group-item' href='movie_text.php?id=".$row['MovieID']."' style='background-color:#93FF93;font-size:24pt' target = '_self'>".$row['Movie']."</a>";
                    }

                    $conn->close();
                ?>
        </div>
        </center>
    </body>
  </html>