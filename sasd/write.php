<?php
    $id = $_GET['id'];

    $conn = new mysqli('localhost', 'root', '', 'filmcritic');


            if ($conn->connect_error){  //看是否可以連線（$conn->connect_error是連線失敗的錯誤訊息）
                    die("connection Error:".$conn->connect_error);  //die會顯示文字，且其後的程式不執行
                }
            mysqli_set_charset($conn, "utf8");

            $sql = "SELECT * FROM movie where MovieID = '$id' ;";

                $result = $conn->query($sql);
                    while($row = $result->fetch_assoc()){
                        $name = $row['Movie'];
                    }
                $conn->close();
?>
    <!DOCTYPE html>
    <html>
    <meta charset="utf-8">

    <head>
        <title>登入</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <!--隨網站而變大變小-->
    </head>

    <body>
        <br>
        <br>
        <br>
        <br>
        <center>
        <form action="artical_insert.php" method="post">
        <?php echo "<label style = 'color:white;font-size:24pt'>".$name."</label>"; ?><br>
        <input type = "text"style = "display:none" name="movie_id" value = <?php echo $id; ?>>
        <label style = "color:white">文章標題:</label><input type="text" name="title"><br><p>
        <label style = "color:white">劇透度（1最小，5最大）: </label><input type="number" name="quantity" min="1" max="5" step="1" value="1"><br><p>    
        <label style = "color:white">文章內容:</label><br><textarea name="comment" rows="5" cols="45"></textarea><br><br>
        <button >送出</button>
        <input type="reset" value="清除">
        </form>
        </center>
        <?php echo "<a href='movie_text.php?id=".$id.">回上頁</a>"; ?>
    </body>

    </html>