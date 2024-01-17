<?php

require_once 'BD.php';
require_once 'api.php';
error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");
$method = $_SERVER['REQUEST_METHOD'];

if($method == "GET") {
    isset($_GET['id']);
    $id= $_GET['id'];
    $vector = array();
    $api = new Api();
    $vector = $api->getImagenes($id);
    $json = json_encode($vector);
    echo $json;
}

if($method=="POST"){
    $json = null;
    $foto = (file_get_contents($_FILES['archivo_per']['tmp_name']));
    $descripcion = $_POST['nom_usu'];
    $nom_doc = $_POST['nom_doc'];
    $api = new Api();
    $json = $api->addImagen($descripcion,$foto,$nom_doc);
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