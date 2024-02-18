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
    $foto = (file_get_contents($_FILES['archivo_per']['tmp_name']));
    $id_bec=$_POST['id_bec'];
    $descripcion = $_POST['nom_usu'];
    $nom_doc = $_POST['nom_doc'];
    $f_cargado = $_POST['f_cargado'];
    $api = new Api();
    $json = $api->addImagen($descripcion,$foto,$nom_doc,$f_cargado,$id_bec);
    echo $json;
}

if($method=="DELETE"){
    $json = null;
    $id_doc = $_REQUEST['id_doc'];
    $api = new Api();
    $json = $api->deleteImagen($id_doc);
    echo $json;
}


?>