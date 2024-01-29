<?php

require_once 'BD.php';
require_once 'api.php';
require_once 'cors.php';
$method = $_SERVER['REQUEST_METHOD'];

if($method == "GET") {
    $vector = array();
    $api = new Api();
    $vector = $api->getImagenes();
    $json = json_encode($vector);
    echo $json;
}

if($method=="POST"){
    $json = null;
    $com = (file_get_contents($_FILES['archivo_com']['tmp_name']));
    $nom_usu = $_POST['nom_usu'];
    $nom_doc = $_POST['nom_doc'];
    $detalle = $_POST['detalle'];
    $created_at = date('Y-m-d');

    $api = new Api();
    $json = $api->addImagen($nom_usu,$com,$nom_doc,$detalle,$created_at);
    echo $json;
}

if($method=="DELETE"){
    $json = null;
    $id_com = $_REQUEST['id_com'];
    $api = new Api();
    $json = $api->deleteImagen($id_com);
    echo $json;
}


?>