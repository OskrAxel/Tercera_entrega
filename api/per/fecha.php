<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: GET, POST");
    header("Access-Control-Allow-Headers: Content-Type");
 include 'BD.php';
if($_POST['METHOD']=='POST'){
    unset($_POST['METHOD']);
    $fecha=$_POST['fecha'];
    $query="INSERT INTO fecha_ent(id,fecha) values (NULL,'$fecha')";
    $queryAutoIncrement="SELECT MAX(id) as id from fecha";
    $resultado=metodoPost($query, $queryAutoIncrement);
    echo json_encode($resultado);
    header("HTTP/1.1 200 OK");
    exit();
}
header("HTTP/1.1 400 Bad Request");
?>