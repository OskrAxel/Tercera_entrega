<?php

include '../BD.php';

error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

if($_POST['METHOD']=='1BEC'){
    unset($_POST['METHOD']);
    $query="SELECT id,anio, count(*) AS Incritos FROM usuarios_bec 
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
    $query="SELECT id,nombre,count(id) AS CBec from usuarios_bec";
    $resultado=metodoGet($query);
    echo json_encode($resultado->fetchAll()); 
    header("HTTP/1.1 200 OK");
    exit();
}

if($_POST['METHOD']=='PER'){
    unset($_POST['METHOD']);
    $query="SELECT id,count(id) AS CPer from usuarios_per";
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
    $query="SELECT id_doc,nom_usu,nom_doc,f_cargado,count(id_doc) AS CInf from informe";
    $resultado=metodoGet($query);
    echo json_encode($resultado->fetchAll()); 
    header("HTTP/1.1 200 OK");
    exit();
}

if($_POST['METHOD']=='FINF'){
    unset($_POST['METHOD']);
    $query="SELECT CONCAT(usuarios_bec.nombre,' ',usuarios_bec.apellido) AS responsable,informe.nom_doc, informe.f_cargado FROM informe 
                RIGHT JOIN usuarios_bec ON usuarios_bec.id_bec = informe.id_bec";
    $resultado=metodoGet($query);
    echo json_encode($resultado->fetchAll()); 
    header("HTTP/1.1 200 OK");
    exit();
}
///Estimar entrega reportes
if($_POST['METHOD']=='ENTR'){
    unset($_POST['METHOD']);
    $query="SELECT id_doc,nom_usu,nom_doc,f_cargado from informe";
    $resultado=metodoGet($query);
    echo json_encode($resultado->fetchAll()); 
    header("HTTP/1.1 200 OK");
    exit();
}
////listado logs
if($_POST['METHOD']=='LOGS'){
    unset($_POST['METHOD']);
    $query="SELECT * from log ORDER BY id DESC LIMIT 25";
    $resultado=metodoGet($query);
    echo json_encode($resultado->fetchAll()); 
    header("HTTP/1.1 200 OK");
    exit();
}
header("HTTP/1.1 400 Bad Request");
?>