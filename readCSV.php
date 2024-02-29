<?php 
   $file = fopen("resources/documents/aura_.txt", "r");
    while(!feof($file)) {
    echo fgets($file). "";
    }
    fclose($file);
?>