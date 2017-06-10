<?php
  session_start();
  //session_destroy();
  //載入db.php，就可以連資料庫
  require_once 'db.php';
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
  </head>
  <body>
    <nav class="navbar navbar-default">
  <div class="container-fluid">
    <div class="navbar-header">
      <!--左上角的圖示(試過width用%，發現版面會跑掉)-->
      <a class="navbar-brand" href="home_data.html" target = "myframe"><img src="img\head_pic.png" style="width:80px"></a>
    </div>
    <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
      <!--上層功能列表-->
      <ul class="nav navbar-nav">
        <li class=""><a href="home_data.html" target="myframe">首頁 <span class="sr-only">(current)</span></a></li>
        <?php
        echo "<li class=''><a href='text.php?name=".""."' target='myframe'>電影總覽<span class='sr-only'></span></a></li>";
        ?>
        <li><a href="member.php" target="myframe">關於我們</a></li>
      </ul>
      <ul class='nav navbar-nav navbar-right'>";
        <li><a href='login.php' target='_self'>登入</a></li>
      </ul>

      <ul class='nav navbar-nav navbar-right'>
        <li><a href='register.php' target='_self'>註冊</a></li>
      </ul>
    </div>
  </div>
</nav>
    
    <!--內容的程式碼打在這裡-->
    <div class="row">
        <div class="col-sm-4"></div>
        <div class="col-sm-4">
          <form class="form-horizontal" method="post" action="login.php">
            <fieldset>
              <legend>登入</legend>
              <div class="form-group" >
                <label for="inputAccount" class="col-lg-3 control-label">帳號</label>
                <div class="col-lg-9">
                  <input type="text" class="form-control" id="inputAccount" placeholder="Account number" size="20" name="MemberAccount">
                </div>
              </div>
              <div class="form-group">
                <label for="inputPassword" class="col-lg-3 control-label">密碼</label>
                <div class="col-lg-9">
                  <input type="password" class="form-control" id="inputPassword" placeholder="Password" size="20" name="MemberPassword">
                </div>
              </div>
              
              <div class="form-group">
                <div class="col-lg-9 col-lg-offset-3">
                  <button type="reset" class="btn btn-default">清除</button>
                  <button type="submit" class="btn btn-primary">送出</button>
                </div>
              </div>
            </fieldset>
          </form>
        </div>
        <div class="col-sm-4"></div>
      </div>
      

      <div class="row">
        <div class="col-sm-4"></div>
        <div class="col-sm-4">
          <form class="form-horizontal" method="post">
            <fieldset>
              <legend>忘記密碼</legend>
              <div class="form-group">
                <label for="inputEmail" class="col-lg-3 control-label">信箱帳號</label>
                <div class="col-lg-9">
                  <input type="text" class="form-control" id="inputemail" placeholder="E-mail" name="MemberEmail">
                </div>
              </div>
              <div class="form-group">
                <div class="col-lg-9 col-lg-offset-3">
                  <button type="reset" class="btn btn-default">Cancel</button>
                  <button type="submit" class="btn btn-primary name=submit">Submit</button>
                </div>
              </div>
            </fieldset>
          </form>
        </div>
        <div class="col-sm-4"></div>
      </div>
    <!--結束-->
  </body>
</html>

<?php 
  //include("imdb_of_ntust.sql");
  $_SESSION['login_user_id'] = 0;
  if(isset($_POST['MemberAccount']) && isset($_POST['MemberPassword'])){  
    $account = $_POST['MemberAccount'];
    $password = $_POST['MemberPassword'];
    //$email = $_POST["email"];
    $sql = "SELECT * FROM `member` WHERE `MemberAccount` = '{$account}' AND `MemberPassword` = '{$password}'";
    $query = mysqli_query($_SESSION['link'], $sql);

    //如果請求成功
    if ($query)
    {
      //使用 mysqli_num_rows 回傳 $query 請求的結果數量有幾筆，為一筆代表找到會員且密碼正確。
      if(mysqli_num_rows($query) == 1)
      {
        //取得使用者資料
        $member = mysqli_fetch_assoc($query);
      
        //在session裡設定 is_login 並給 true 值，代表已經登入
        $_SESSION['is_login'] = TRUE;
        //紀錄登入者的id，之後若要隨時取得使用者資料時，可以透過 $_SESSION['login_user_id'] 取用
        $_SESSION['login_user_id'] = $member['MemberID'];
        $_SESSION['login_account'] = $member['MemberAccount'];
        echo "<script>alert('登入成功'); location.href = 'index.php';</script>";
      }
    }
    else
    {
      echo "<script>alert('登入失敗！');</script>";
      //echo '<meta http-equiv=REFRESH CONTENT=1;url=login.php>';
      echo "{$sql} 語法執行失敗，錯誤訊息：" . mysqli_error($_SESSION['link']);
    }
  }
?>
