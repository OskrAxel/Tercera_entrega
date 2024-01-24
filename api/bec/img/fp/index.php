<?php

require_once 'BD.php';
require_once 'api.php';
require_once 'cors.php';
$method = $_SERVER['REQUEST_METHOD'];

// if($method == "GET") {
//     $vector = array();
//     $api = new Api();
//     $vector = $api->getImagenes();
//     $json = json_encode($vector);
//     echo $json;
// }

if($method=="POST"){
    $json = null;
    $id=$_GET['idP'];
    $foto = (file_get_contents($_FILES['archivo_per']['tmp_name']));
    $api = new Api();
    $json = $api->addImagen($id,$foto);
    echo $json;
}

// if($method=="DELETE"){
//     $json = null;
//     $id_doc = $_REQUEST['id_doc'];
//     $api = new Api();
//     $json = $api->deleteImagen($id_doc);
//     echo $json;
// }


?>