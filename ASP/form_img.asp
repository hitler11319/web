@{
var imagePath=""; 
if( Request["Choice_img"] != null)
   {imagePath="images/" + Request["Choice_img"];} 
} 
<!DOCTYPE html> 
<html> 
<body> 
<h1>Display Images</h1> 
<form method="post" action=""> 
I want to see: 
<select name="Choice_img"> 
   <option value="Pic1.jpg">Photo 1</option> 
   <option value="Pic2.jpg">Photo 2</option> 
   <option value="Pic3.jpg">Photo 3</option> 
</select> 
<input type="submit" value="Submit"> 
@if(imagePath != "")
{
<p>
<img src="@imagePath" alt="Sample">
</p>
}  
</form>
</body>
</html>


<!-- 此僅作練習之用  那路徑是假的 -->