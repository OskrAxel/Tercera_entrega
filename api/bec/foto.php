<?php

include 'BD.php';

error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");


if($_POST['METHOD']=='PUT'){
    unset($_POST['METHOD']);
    $id=$_GET['id'];
    ////
    $fotom = $_FILES['archivo_foto'];
	$tmp_name = $fotom['tmp_name'];
	$contenido_foto = file_get_contents($tmp_name);
	$fotoBLOB = addslashes($contenido_foto);
    ////
    $query="UPDATE usuarios_bec SET foto='$fotoBLOB' WHERE id='$id'";
    $resultado=metodoPut($query);
    echo json_encode($resultado);
    header("HTTP/1.1 200 OK");
    exit();
}

header("HTTP/1.1 400 Bad Request");
?>