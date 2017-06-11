<?php
session_start();
//session_destroy();
//載入db.php，就可以連資料庫
require_once 'db.php';
?>
<!DOCTYPE html>
<html lang="en">
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
    <!--連結有上層功能列表的檔案-->
    
    <div class="container">
      <div class="col-md-8">
        <qa class="abc" style="font-size:300%"> 關於我們 </qa>
        <a class="oblique" style="font-size:150%">MOVIE NIGHT</a>
        <hr>
        <h2 style="font-size:230%;color:slategrey">It's nice to meet you!</h2>
        <p class="italic ">我們是一群來自台灣科技大學的學生,在系統分析這堂課上相識。<br>我們熱愛電影，但對於喜愛分享電影一切美好的你，我們更愛。<br>希望透過這個平台讓大家有交流電影心得的機會!</p>
        <br>
        <qa class="abc" style="font-size:230%;color:slategrey"> 為什麼要"MOVIE NIGHT" </qa><br><br><br>
        <qa class="abc" style="font-size:150%;color:gray">提升你的電影層次</qa>
        <p class="italic">看電影，是CP值極高的一項休閒活動。 它讓你在短短的兩個小時內就窺盡了導演的一生經歷與感受。也因此電影不應只是純屬娛樂，它同樣可以正衣冠、知興替、明得失。身為重度的影迷，我們認為有必要將這些感受與優良的Story Teller 給分享出去。透過大家不同的解析及看法,彼此交換經驗,往後能用更多更全面的觀點看事物。</p>
        <br>
        <qa class="abc" style="font-size:150%;color:gray">進步的原動力</qa>
        <p class="italic">您的每一次瀏覽,每一次發文,每一則留言,都是我們進步的動力。我們還是這個領域的初學者,還有很多地方需要改善進步,有了你們的回應我們會珍惜並且檢討精進,做出一套更為完善的系統!
          <br><br>
          <qa class="abc" style="font-size:230%;color:slategrey"> 成員介紹</qa><br>
          <table>
            <tr>
              <td>
              <img src="img/ying.jpg " alt="劉映秀 " class="img-circle" style="width:150px;height:150px;-webkit-border-radius: 10px; -moz-border-radius: 10px; border-radius: 10px; "></td>
              <td>
                <qa class="abc">姓名:劉映秀<br><br>系籍:四不分二<br><br>興趣:打籃球 浮潛<br><br>負責:文章 電影管理</qa>
              </tr>
              <tr>
                <td><br><br><img src="img/jen.jpg " alt="黃國禎 " style="width:150px;height:150px;-webkit-border-radius: 10px; -moz-border-radius: 10px; border-radius: 10px; " class="img-circle "></td>
              </td>
              <td>
                <br><br>
                <qa class="abc">姓名:黃國禎<br><br>系籍:四管理二<br><br>興趣:羽球 書法<br><br>負責:打雜</qa>
              </td>
            </tr>
            <tr>
              <td><br><br><img src="img/yu.jpg " alt="連于慧 " style="width:150px;height:150px;-webkit-border-radius: 10px; -moz-border-radius: 10px; border-radius: 10px; " class="img-circle "></td>
              <td><br><br>
                <qa class="abc">姓名:連于慧<br><br>系籍:四資管三<br><br>興趣:羽球 聽音樂<br><br>負責:會員管理</qa>
              </td>
            </tr>
            <tr>
              <td><br><br><img src="img/han.jpg " alt="楊雅涵" style="width:150px;height:150px;-webkit-border-radius: 10px; -moz-border-radius: 10px; border-radius: 10px; " class="img-circle "></td>
              <td><br><br>
                <qa class="abc">姓名:楊雅涵<br><br>系籍:四資管二<br><br>興趣:美勞 手遊<br><br>負責:網站排版 功能構想</qa>
              </td>
            </tr>
            <tr>
              <td><br><br><img src="img/hong.jpg " alt="盧禹宏 " style="width:150px;height:150px;-webkit-border-radius: 10px; -moz-border-radius: 10px; border-radius: 10px; " class="img-circle "></td>
              <td><br><br>
                <qa class="abc">姓名:盧禹宏<br><br>系籍:四資管二<br><br>興趣:打程式 看影集<br><br>負責:整體架構 凱瑞組員</qa>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </body>
  </html>