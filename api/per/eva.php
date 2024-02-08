<?php

include 'BD.php';

error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

if($_POST['METHOD']=='POST'){
    unset($_POST['METHOD']);
    $id=$_GET['id'];
    $p1=$_POST['p1'];
    $p2=$_POST['p2'];
    $p3=$_POST['p3'];
    $p4=$_POST['p4'];
    $nota_eva=$p1+$p2+$p3+$p4;

    $query="UPDATE usuarios_bec SET nota_eva='$nota_eva' WHERE id='$id'";
    $resultado=metodoPut($query);
    echo json_encode($resultado);
    header("HTTP/1.1 200 OK");
    exit();
}

header("HTTP/1.1 400 Bad Request");
?>