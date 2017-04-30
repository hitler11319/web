<?php
	for($i = 0; $i <=5 ; $i++){
		echo "$i<br>";
	}

	$array = array(1,2,3);
	$array2 = [4, 5 ,6];

	for($j = 0; $j < count($array); $j++){
		echo $array[$j];
		echo "<br>";
		echo $array2[$j];
		echo "<br>";
	}

	foreach($array as $item){
		echo $item;
		echo "<br>";
	}

	$array3 = array("id" => 1, "name" => "she");
	$array4 = [
		["id" => 1, "name" => "me"],
		["id" => 2, "name" => "you"],
		["id" => 3, "name" => "he"],
	];

	echo "<h1>".$array3["name"]."</h1>";
	

	foreach($array4 as $person){
		echo $person["id"];
		echo "<br>";
		echo $person["name"];
		echo "<br>";
	}


	$s = 0;
	while($s < 10){
		if($s == 3 ){break;}
		echo "$s<br>";
		$s ++;
	}

	function p(){
		echo "<br>";
	}

?>