<nav class="navbar navbar-default">
      <div class="container-fluid">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
          <span class="sr-only">Toggle navigation</span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          </button>
          <!--左上角的圖示(試過width用%，發現版面會跑掉)-->
          <a class="navbar-brand" href="index.html"><img src="img\head_pic.png" style="width:80px"></a>
        </div>
        <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
          <!--上層功能列表-->
          <ul class="nav navbar-nav">
            <li class="active"><a href="index.html">首頁 <span class="sr-only">(current)</span></a></li>
            <!--文章分類的下拉式選單-->
            <li class="dropdown">
              <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">文章分類 <span class="caret"></span></a>
              <ul class="dropdown-menu" role="menu">
                <li><a href="action.html">動作冒險片</a></li><!--玩命關頭8-->
                <li><a href="comedy.html">喜劇片</a></li><!--家有囍事-->
                <li><a href="romances.html">文藝愛情片</a></li><!--我就要你好好的-->
                <li><a href="animation.html">動畫片</a></li><!--寶貝老闆-->
                <li><a href="biography.html">傳記片</a></li><!--浮世繪影-->
                <li><a href="documentary.html">紀錄片</a></li><!--翻滾吧！阿信-->
                <li><a href="drama.html">劇情片</a></li><!--霸王別姬-->
                <li><a href="horror.html">驚悚片</a></li><!--孤兒怨-->
                <li><a href="musical.html">歌舞片</a></li><!--52赫茲我愛你-->
              </ul>
              
              <li><a href="#">開發團隊</a></li>
            </ul>
            <ul class="nav navbar-nav navbar-right">
              <li><a href="#">登入</a></li>
            </ul>
            <ul class="nav navbar-nav navbar-right">
              <li><a href="#">註冊</a></li>
            </ul>
            <form class="navbar-form navbar-right" role="search">
              <div class="form-group">
                <input type="text" class="form-control" placeholder="請輸入關鍵字">
              </div>
              <button type="submit" class="btn btn-default">Submit</button>
            </form>
          </div>
        </div>
      </nav>