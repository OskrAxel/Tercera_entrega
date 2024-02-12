<?php

include 'BD.php';

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: X-API-KEY, Origin, Authorization,X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Allow: GET, POST, OPTIONS, PUT, DELETE");


if($_SERVER['REQUEST_METHOD']=='GET'){
        $query="SELECT id_fech,fecha, mes from fecha_ent ORDER BY id_fech DESC LIMIT 1";
        $resultado=metodoGet($query);
        echo json_encode($resultado->fetch(PDO::FETCH_ASSOC));
    header("HTTP/1.1 200 OK");
    exit();
}

if($_POST['METHOD']=='POST'){
    unset($_POST['METHOD']);
    $fecha=$_POST["fecha"];
    $query="INSERT INTO fecha_ent(fecha) VALUES ('$fecha')";
    $queryAutoIncrement="SELECT MAX(id) as id from fecha";
    $resultado=metodoPost($query, $queryAutoIncrement);
    echo json_encode($resultado);
    header("HTTP/1.1 200 OK");
    exit();
}

header("HTTP/1.1 400 Bad Request");
?>