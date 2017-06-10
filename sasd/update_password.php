<?php
session_start();
//session_destroy();
//載入db.php，就可以連資料庫
require_once 'db.php';
?>
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
		
		<div class="row">
			<div class="col-sm-4"></div>
			<div class="col-sm-4">
				<form class="form-horizontal"  method="post" action="update_password.php">
					<fieldset>
						<legend>修改會員資料</legend>
						<div class="form-group">
							<label for="disabledInput" class="col-lg-3 control-label">帳號</label>
							<label for="disabledInput" class="col-lg-1 control-label"><?php echo"{$_SESSION['login_account']}" ?></label>
							<!-- <div class="col-lg-9">
								<input class="form-control" id="inputAccount" type="text" disabled="" name="MemberAccount" placeholder= <?php //echo"{$_SESSION['login_account']}" ?> >-->
							</div> 
							<div class="form-group">
								<label for="inputPassword" class="col-lg-3 control-label">修改密碼</label>
								<div class="col-lg-9">
									<input type="password" class="form-control" id="inputPassword" placeholder="Password" name="MemberPassword">
								</div>
							</div>
							<div class="form-group">
								<label for="inputEmail" class="col-lg-3 control-label">修改信箱帳號</label>
								<div class="col-lg-9">
									<input type="text" class="form-control" id="inputEmail" placeholder="E-mail" name="MemberEmail">
								</div>
							</div>
							<div class="form-group">
								<div class="col-lg-9 col-lg-offset-3">
									<button type="reset" class="btn btn-default">Cancel</button>
									<button type="submit" class="btn btn-primary">Submit</button>
								</div>
							</div>
						</fieldset>
					</form>
				</div>
			</div>
		</div>
	</body>
</html>
<?php
if(isset($_POST['MemberPassword']) && isset($_POST['MemberEmail'])){
//$MemberID=$_POST['MemberID'];
$MemberPassword=$_POST['MemberPassword'];
$MemberEmail=$_POST['MemberEmail'];


$sql = "UPDATE `member` SET `MemberPassword`='{$MemberPassword}' ,`MemberEmail`='{$MemberEmail}' WHERE `MemberID`={$_SESSION['login_user_id']}";


//用 mysqli_query 方法取執行請求（也就是sql語法），請求後的結果存在 $query 變數中
$result = mysqli_query($_SESSION['link'], $sql);
if(mysqli_affected_rows($_SESSION['link']) > 0)
{
echo "<script>alert('更新成功！');</script>";
$_SESSION['login_user_id']=0;
//mysqli_close($_SESSION['link']);
//$new_id = mysqli_insert_id($_SESSION['link']);
echo '<meta http-equiv=REFRESH CONTENT=1;url=login.php>';
//echo "執行成功，新增後的 id 為 {$new_id}";
}
elseif(mysqli_affected_rows($_SESSION['link']) == 0)
{
echo "無資料更新";
}
else
{
echo  "<br>{$sql} 語法執行失敗，錯誤訊息：" . mysqli_error($_SESSION['link']);
}

}

?>