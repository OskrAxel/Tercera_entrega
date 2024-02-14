<?php

include '../BD.php';

error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

if($_POST['METHOD']=='1BEC'){
    unset($_POST['METHOD']);
    $query="SELECT id,anio, count(*) AS BECARIOS FROM usuarios_bec 
    GROUP BY anio
    HAVING COUNT(*)>0";
    $resultado=metodoGet($query);
    echo json_encode($resultado->fetchAll()); 
    header("HTTP/1.1 200 OK");
    exit();
}

if($_POST['METHOD']=='CIUBEC'){
    unset($_POST['METHOD']);
    $query="SELECT ciudad, count(*) AS region FROM usuarios_bec 
    GROUP BY ciudad
    HAVING COUNT(*)>0";
    $resultado=metodoGet($query);
    echo json_encode($resultado->fetchAll()); 
    header("HTTP/1.1 200 OK");
    exit();
}


if($_POST['METHOD']=='BEC'){
    unset($_POST['METHOD']);
    $query="SELECT count(id) AS CBec from usuarios_bec";
    $resultado=metodoGet($query);
    echo json_encode($resultado->fetchAll()); 
    header("HTTP/1.1 200 OK");
    exit();
}

if($_POST['METHOD']=='PER'){
    unset($_POST['METHOD']);
    $query="SELECT count(id) AS CPer from usuarios_per";
    $resultado=metodoGet($query);
    echo json_encode($resultado->fetchAll()); 
    header("HTTP/1.1 200 OK");
    exit();
}

if($_POST['METHOD']=='FEC'){
    unset($_POST['METHOD']);
    $query="SELECT id_fech,fecha,fech_lit FROM fecha_ent ORDER BY id_fech DESC LIMIT 1";
    $resultado=metodoGet($query);
    echo json_encode($resultado->fetchAll()); 
    header("HTTP/1.1 200 OK");
    exit();
}

if($_POST['METHOD']=='INF'){
    unset($_POST['METHOD']);
    $query="SELECT count(id_doc) AS CInf from informe";
    $resultado=metodoGet($query);
    echo json_encode($resultado->fetchAll()); 
    header("HTTP/1.1 200 OK");
    exit();
}
header("HTTP/1.1 400 Bad Request");
?>