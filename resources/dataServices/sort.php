<?php

$data = array (
 	array( "Producer" => "Zerba",
               "Varietal" => "Pinot Noir",
               "Vintage" => 2016,
               "return_fare" => 300),
 	array( "Producer" => "Zerba",
               "Varietal" => "Pinot Noir",
               "Vintage" => 2015,
               "return_fare" => 350),
 	array( "Producer" => "Zerba",
               "Varietal" => "Pinot Noir",
               "Vintage" => 2016,
               "return_fare" => 340)
);
echo json_encode($data);
echo "<br><br>";


foreach ($data as $key => $row) {
	echo $key . "<br>";
    $vintage[$key]      = $row['Vintage'];
    $producer[$key]     = $row['Producer'];
    $varietal[$key]     = $row['Varietal'];
}

print_r($producer);
echo "<br><br>";

print_r($varietal);
echo "<br><br>";

print_r($vintage);
echo "<br><br>";


array_multisort($producer, SORT_ASC, $varietal, SORT_ASC, $vintage, SORT_DESC, $data );


echo "<br><br>";

echo json_encode($data);


?>