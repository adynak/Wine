<?php

$appArray['producers'];

$json = '{"producers":[{"name":"Zerba","isExpanded":false,"wines":[{"vintage":"2014","varietal":"Syrah","designation":"Estate","ava":"Walla Walla","storageBins":[{"binName":"A","bottleCount":1},{"binName":"B","bottleCount":2}]},{"vintage":"2013","varietal":"Grenache","designation":"The Rocks","ava":"Walla Walla","storageBins":[{"binName":"A","bottleCount":3},{"binName":"B","bottleCount":4}]},{"vintage":"2012","varietal":"Grenache","designation":"Estate","ava":"Red Hills","storageBins":[{"binName":"A","bottleCount":5},{"binName":"B","bottleCount":6}]}]},{"name":"Del Rio","isExpanded":false,"wines":[{"vintage":"2011","varietal":"Syrah","designation":"Estate","ava":"Umpqua Valley","storageBins":[{"binName":"A","bottleCount":7},{"binName":"B","bottleCount":8}]},{"vintage":"2010","varietal":"Grenache","designation":"Lot 24","ava":"Umpqua Valley","storageBins":[{"binName":"A","bottleCount":9},{"binName":"B","bottleCount":10},{"binName":"Offsite","bottleCount":12}]}]}]}';

$wineArray = json_decode($json,true);
// print_r($wineArray);
// die();
$producers = $wineArray["producers"];

foreach ($producers as $key => $value) {
    // echo $value["name"] . "<br>";
    // echo ($value["isExpanded"]== true ? "true" : "false") . "<br>";
    // print_r($value["wines"]) . "<br>";
}

echo "<br>";

    $index = -1;
    $tempArray = array();
    $csv = array();
    $url = '/Library/WebServer/Documents/angular/git/Wine/resources/data/bottles1.csv';

    $rows = array_map('str_getcsv', file($url));
    $header = array_shift($rows);
    
    foreach ($rows as $row) {
        $csv[] = array_combine($header, $row);
    }

    $firstRow['Producer'] = $csv[0]["Producer"];

    $storageBin = array("location"    => $csv[0]['Location'],
                        "bin"         => $csv[0]['Bin'],
                        "bottleCount" => "1");

    $bottle = array("iWine"           => $csv[0]['iWine'],
                    "vintage"         => $csv[0]['Vintage'],
                    "varietal"        => $csv[0]['Varietal'],
                    "designation"     => $csv[0]['Designation'],
                    "ava"             => $csv[0]['Appellation'],
                    "storageBins"     => $storageBin);
    
    // $appArray['producers'][] = array("name"       => $firstRow['Producer'], 
    //                                  "isExpanded" => false,
    //                                  "wines"      => $bottle);

    // array_push($tempArray, $firstRow['Producer']);

    foreach ($csv as $key => $value) {

        if (!in_array($value["Producer"], $tempArray)){
            $storageBin = array("location"    => $value['Location'],
                                "bin"         => $value['Bin'],
                                "bottleCount" => "1");

            $bottle = array("iWine"           => $value['iWine'],
                            "vintage"         => $value['Vintage'],
                            "varietal"        => $value['Varietal'],
                            "designation"     => $value['Designation'],
                            "ava"             => $value['Appellation'],
                            "storageBins"     => $storageBin);
            
            $appArray['producers'][] = array("name"       => $value['Producer'], 
                                             "isExpanded" => false,
                                             "wines"      => $bottle);

            array_push($tempArray, $value["Producer"]);
	   } else {
            $producer = $value['Producer'];

            $storageBin = array("location"    => $value['Location'],
                                "bin"         => $value['Bin'],
                                "bottleCount" => "1");

            $bottle = array("iWine"           => $value['iWine'],
                            "vintage"         => $value['Vintage'],
                            "varietal"        => $value['Varietal'],
                            "designation"     => $value['Designation'],
                            "ava"             => $value['Appellation'],
                            "storageBins"     => $storageBin); 


            $foundAt = -1;
            foreach ($appArray["producers"] as $key => $value) {
                $foundAt ++;
                if ($value['name'] == $producer){
                    break;
                }
            }

            $temp = array();
            $previousWines = $appArray['producers'][$foundAt]['wines'];
            array_push($temp, $previousWines);
            array_push($temp, $bottle);
            unset($appArray['producers'][$foundAt]['wines']);

            $appArray['producers'][$foundAt]['wines'][] = $temp;

       }

    }


    echo json_encode(($appArray));
    die();

$producers = $appArray["producers"];



foreach ($producers as $key => $value) {
    echo $value["name"] . "<br>";
    echo ($value["isExpanded"]== true ? "true" : "false") . "<br>";
    print_r($value["wines"]);
    echo "<br>";
}

// $miso = csvToJson('/Library/WebServer/Documents/angular/git/Wine/resources/data/bottles.csv');
echo "<br>";

// print_r($miso);


function csvToJson($fname) {
    // open csv file
    if (!($fp = fopen($fname, 'r'))) {
        die("Can't open file...");
    } else {
    	// echo "reading $fname";
    }
    echo "<br>";

    $index = -1;
	$stopAfter = 8;
    
    //read csv headers
    $key = fgetcsv($fp,"1024",",");
    
    // parse csv rows into array
    $json = array();
        while ($row = fgetcsv($fp,0,",")) {
        	$index ++;
   //      	if ($index > 6){
        		$line = array_combine($key, $row);
        		echo json_encode($line);
        		$json[] = $line;
   //      	}
        	if ($index == $stopAfter){
				break;
			}
			echo  "<br>";
    }
    
    // release file handle
    fclose($fp);

    // encode array to json
    return json_encode($json);
}

 
?>