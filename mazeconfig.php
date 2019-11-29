<?php

//open a configuration file and read the data
//does file exixt?

$config = fopen('config.txt', 'r');
$mazeMap = fopen('mapconfig.txt', 'r');
$configContents = fread($config, filesize('config.txt'));
$mapContents = fread($mazeMap, filesize('mapconfig.txt'));

if (isset($configContents)){
    $mapArray = array(); 
    $mapData = explode(':', $configContents);
     print_r(array_values($mapData));
     $newArray = [
         'url' => $mapData[0],
         'threats' => $mapData[1],
         'rooms' => $mapData[2],
         'exit' =>  $mapData[3],
         'player' => $mapData[4]
     ];

    //  print_r($newArray);
     return $mapData;
}

?>