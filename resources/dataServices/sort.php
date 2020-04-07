<?php

function sortWines($data){

  foreach ($data as $key => $row) {
    $vintage[$key]      = $row['Vintage'];
    $producer[$key]     = $row['Producer'];
    $varietal[$key]     = $row['Varietal'];
  }

  array_multisort($producer, SORT_ASC, $varietal, SORT_ASC, $vintage, SORT_DESC, $data );
  return $data;

}

$wine = array (
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

$wine = sortwines($wine);
echo "<br>".json_encode($wine);
?>