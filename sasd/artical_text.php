<?php
    $id = $_GET['id'];
?>

<!DOCTYPE html>
<html>
<meta charset="utf-8">

<head>
    <title>文章內容</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!--隨網站而變大變小-->

    <!--項目列表（bookstrap的）-->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-  BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
</head>

<body>
    

    <br>
    <br>
    <div class="container1" style="font-weight: bold; width:1000px">
                <?php
                   
                    $conn = new mysqli('localhost', 'root', '', 'filmcritic');
                
                    if ($conn->connect_error){  //看是否可以連線（$conn->connect_error是連線失敗的錯誤訊息）
                        die("connection Error:".$conn->connect_error);  //die會顯示文字，且其後的程式不執行
                    }

                    mysqli_set_charset($conn, 'utf8');

                    $sql = "SELECT * FROM artical where ArticalID = '$id' ;";
                    
                    $result = $conn->query($sql);
                    while($row = $result->fetch_assoc()){
                    echo "<h1 style='font-size:40pt'>".$row['ArticalTitle']."</h1>";
                    echo "<br><br>" ;
                    echo "<h4>".$row['artical_content']."</h4>";
                    $movie_id = $row['MovieID'];
                    }
                    $conn->close();
                ?>
        </div>
        <br>
        <br>
        <?php echo "<a href='movie_text.php?id=".$movie_id."' style ='font-size:28pt'>回上頁</a>"; ?>
</body>

</html>