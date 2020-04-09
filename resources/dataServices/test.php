<?php

class Storage {
    public $location;
    public $binName;
    public $bottleCount;

    function setStorageBin($location, $bin, $bottleCount){
        $this->location = $location;
        $this->binName = $bin;
        $this->bottleCount = $bottleCount;        
    }
}

class Bottle {
    public $iWine;
    public $vintage;
    public $varietal;
    public $designation;
    public $ava;
    public $storageBins;

    function setBottle($iWine, $vintage, $varietal, $designation, $ava, $storageBin){
        $this->iWine = $iWine;
        $this->vintage = $vintage;
        $this->varietal = html_entity_decode($varietal);
        $this->designation = html_entity_decode($designation);
        $this->ava = html_entity_decode($ava);
        $this->storageBins = $storageBin;
    }
}

$totalRows =  $_GET["rows"];

$appArray['producers'];

$json = '{"producers":[{"name":"Zerba","isExpanded":false,"wines":[{"vintage":"2014","varietal":"Syrah","designation":"Estate","ava":"Walla Walla","storageBins":[{"binName":"A","bottleCount":1},{"binName":"B","bottleCount":2}]},{"vintage":"2013","varietal":"Grenache","designation":"The Rocks","ava":"Walla Walla","storageBins":[{"binName":"A","bottleCount":3},{"binName":"B","bottleCount":4}]},{"vintage":"2012","varietal":"Grenache","designation":"Estate","ava":"Red Hills","storageBins":[{"binName":"A","bottleCount":5},{"binName":"B","bottleCount":6}]}]},{"name":"Del Rio","isExpanded":false,"wines":[{"vintage":"2011","varietal":"Syrah","designation":"Estate","ava":"Umpqua Valley","storageBins":[{"binName":"A","bottleCount":7},{"binName":"B","bottleCount":8}]},{"vintage":"2010","varietal":"Grenache","designation":"Lot 24","ava":"Umpqua Valley","storageBins":[{"binName":"A","bottleCount":9},{"binName":"B","bottleCount":10},{"binName":"Offsite","bottleCount":12}]}]}]}';


    $br = "<br>";
    $index = -1;
    $producers = array();
    $iWines = array();
    $index = -1;

    $url = '/Library/WebServer/Documents/angular/git/Wine/resources/data/bottles.csv';
    $csv = csvDecode($url);
    $csv = sortWines($csv);

    foreach ($csv as $key => $value) {
        if($key == $totalRows) break;
        // echo $value['Producer'];

        if (!in_array($value["Producer"], $producers)){
            // new ["Producer"]

            $storageBin = new Storage;
            $storageBin->setStorageBin($value['Location'],
                         $value['Bin'],
                         1);

            $bottle = new Bottle;
            $bottle->setBottle($value['iWine'],
                               $value['Vintage'],
                               $value['Varietal'],
                               $value['Designation'],
                               $value['Appellation'],
                               array($storageBin));
            
            $appArray['producers'][] = array("name"       => $value['Producer'], 
                                             "isExpanded" => false,
                                             "wines"      => array($bottle));

            array_push($producers, $value["Producer"]);
            array_push($iWines, $value["iWine"]);

       } else {
            // existing ["Producer"]
            $producer = $value['Producer'];

            $storageBin = new Storage;
            $storageBin->setStorageBin($value['Location'],
                                       $value['Bin'],
                                       1);

            $bottle = new Bottle;
            $bottle->setBottle($value['iWine'],
                               $value['Vintage'],
                               $value['Varietal'],
                               $value['Designation'],
                               $value['Appellation'],
                               array($storageBin));

            $foundProducer = -1;
            foreach ($appArray["producers"] as $key => $item) {
                $foundProducer ++;
                if ($item['name'] == $producer){
                    break;
                }
            }

            if (!in_array($value["iWine"], $iWines)){
                // append a new wine for this producer
                array_push($appArray['producers']
                                    [$foundProducer]
                                    ['wines'],
                                    $bottle);

                array_push($iWines, $value["iWine"]);
            } else {
                // append a new storage location for this wine
                $foundiWine = -1;
                foreach ($appArray["producers"][$foundProducer]['wines'] as $wine => $item) {
                    $foundiWine ++;
                    if ($item->iWine == $value['iWine']){
                        break;
                    }
                }
                array_push($appArray['producers']
                                    [$foundProducer]
                                    ['wines']
                                    [$foundiWine]->storageBins,
                                    $storageBin);
            }

       }

    }

    $json = json_encode($appArray);
    $json =  str_replace("\u00e9","é",$json);

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
        foreach ($row as $key=>$value){            
            $row[$key] = utf8_encode($value);
        }
        $csv[] = array_combine($header, $row);
    }
    return $csv;
}
 
?>