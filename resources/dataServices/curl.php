<?php

  $uname        = $_GET['User'];
  $pword        = $_GET['Password'];
  $format       = $_GET['Format'];
  $table        = $_GET['Table'];
  $location     = $_GET['Location'];
  $localStorage = $_GET['localStorage'];

  $url = "https://www.cellartracker.com/xlquery.asp" . 
            "?User=$uname" . 
            "&Password=$pword" . 
            "&Format=$format" . 
            "&Table=$table" . 
            "&Location=$location";

  $curl_handle=curl_init();
  curl_setopt($curl_handle,CURLOPT_URL,$url);
  curl_setopt($curl_handle,CURLOPT_CONNECTTIMEOUT,2);
  curl_setopt($curl_handle,CURLOPT_RETURNTRANSFER,1);
  $buffer = curl_exec($curl_handle);
  curl_close($curl_handle);

  if (empty($buffer)){
      print "Nothing returned from url.";
  }
  else{
      print $buffer;
  }

?>