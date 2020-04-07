<?php

$appArray['producers'];

$json = '{"producers":[{"name":"Zerba","isExpanded":false,"wines":[{"vintage":"2014","varietal":"Syrah","designation":"Estate","ava":"Walla Walla","storageBins":[{"binName":"A","bottleCount":1},{"binName":"B","bottleCount":2}]},{"vintage":"2013","varietal":"Grenache","designation":"The Rocks","ava":"Walla Walla","storageBins":[{"binName":"A","bottleCount":3},{"binName":"B","bottleCount":4}]},{"vintage":"2012","varietal":"Grenache","designation":"Estate","ava":"Red Hills","storageBins":[{"binName":"A","bottleCount":5},{"binName":"B","bottleCount":6}]}]},{"name":"Del Rio","isExpanded":false,"wines":[{"vintage":"2011","varietal":"Syrah","designation":"Estate","ava":"Umpqua Valley","storageBins":[{"binName":"A","bottleCount":7},{"binName":"B","bottleCount":8}]},{"vintage":"2010","varietal":"Grenache","designation":"Lot 24","ava":"Umpqua Valley","storageBins":[{"binName":"A","bottleCount":9},{"binName":"B","bottleCount":10},{"binName":"Offsite","bottleCount":12}]}]}]}';


    $br = "<br>";
    $index = -1;
    $producers = array();
    $iWines = array();

    $url = '/Library/WebServer/Documents/Wine/resources/data/bottles1.csv';
    $csv = csvDecode($url);
    $csv = sortWines($csv);
    
    foreach ($csv as $key => $value) {

        if (!in_array($value["Producer"], $producers)){
            // new ["Producer"]
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

            array_push($producers, $value["Producer"]);
            array_push($iWines, $value["iWine"]);

       } else {
            // existing ["Producer"]
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
            foreach ($appArray["producers"] as $key => $item) {
                $foundAt ++;
                if ($item['name'] == $producer){
                    break;
                }
            }

            // echo $appArray['producers'][$foundAt]['wines']['iWine'];

            if (!in_array($value["iWine"], $iWines)){
                // append a new wine for this producer
                $temp = array();
                $previousWines = $appArray['producers'][$foundAt]['wines'];
                array_push($temp, $previousWines);
                array_push($temp, $bottle);
                unset($appArray['producers'][$foundAt]['wines']);
                $appArray['producers'][$foundAt]['wines'][] = $temp;
                array_push($iWines, $value["iWine"]);
            } else {
                // append a new storage location for this wine
                $temp = array();
                $previousbins = $appArray['producers'][$foundAt]['wines']['storageBins'];
                array_push($temp, $previousbins);
                array_push($temp, $storageBin);
                unset($appArray['producers'][$foundAt]['wines']['storageBins']);
                $appArray['producers'][$foundAt]['wines']['storageBins'] = $temp;
            }

       }

    }

    $json = json_encode($appArray);
    echo $json;
    die();

$producers = $appArray["producers"];



foreach ($producers as $key => $value) {
    echo $value["name"] . "<br>";
    echo ($value["isExpanded"]== true ? "true" : "false") . "<br>";
    print_r($value["wines"]);
    echo "<br>";
}




function sortWines($data){
// param $data is an array
  
  foreach ($data as $key => $row) {
    $vintage[$key]      = $row['Vintage'];
    $producer[$key]     = $row['Producer'];
    $varietal[$key]     = $row['Varietal'];
  }

  array_multisort($producer, SORT_ASC, $varietal, SORT_ASC, $vintage, SORT_DESC, $data );
  return $data;

}


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
   //       if ($index > 6){
                $line = array_combine($key, $row);
                echo json_encode($line);
                $json[] = $line;
   //       }
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

function csvDecode($url) {
    $csv = array();
    
    $rows = array_map('str_getcsv', file($url));
    $header = array_shift($rows);
    
    foreach ($rows as $row) {
        // foreach ($row as $key=>$value){
        //     $row[$key] = utf8_encode($value);
        //     $row[$key] = utf8_decode($value);
        // }
        $csv[] = array_combine($header, $row);
    }

    return $csv;
}
 
?>