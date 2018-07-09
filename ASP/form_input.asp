<!DOCTYPE html>
<html> 
<body> 
@{
if (IsPost)
{ 
string x = Request["x"]; 
string y = Request["y"];
string z = cstr(cint(x) + cint(y)); 
<p>You entered: <br> 
x: @x <br> 
y: @y <br>
x + y : @z;</p>
}
else
{
<p> now is @DateTime.Now</p>
<form method="post" action="">
x:<br> 
<input type="text" name="x" value=""><br>
y:<br><br>
<input type="text" name="y" value=""><br><br>
<input type="submit" value="Submit" class="submit">
</form> 
}
} 
</body> 
</html>

<!-- 此僅作練習之用-->