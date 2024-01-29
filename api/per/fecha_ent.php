<?php

include 'BD.php';

error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

if($_SERVER['REQUEST_METHOD']=='GET'){
        $query="SELECT * from fecha_ent ORDER BY id DESC LIMIT 1";
        $resultado=metodoGet($query);
        echo json_encode($resultado->fetchAll()); 
    header("HTTP/1.1 200 OK");
    exit();
}

if($_POST['METHOD']=='POST'){
    unset($_POST['METHOD']);
    $fecha_ent=$_POST['fecha_ent'];
    $query="INSERT INTO fecha_ent (id,fecha) VALUES (NULL,'$fecha_ent')";
    $queryAutoIncrement="SELECT MAX(id) as id from fecha_ent";
    $resultado=metodoPost($query, $queryAutoIncrement);
    echo json_encode($resultado);
    header("HTTP/1.1 200 OK");
    exit();
}

// if($_POST['METHOD']=='PUT'){
//     unset($_POST['METHOD']);
//     $id=$_GET['id'];
//     $nombre=$_POST['nombre'];
//     $apellido=$_POST['apellido'];
//     $email=$_POST['email'];
//     $contrasena=$_POST['contrasena'];
//     $celular=$_POST['celular'];
//     $pass = md5($contrasena);
//     $query="UPDATE usuarios_per SET nombre='$nombre', apellido='$apellido', email='$email', contrasena='$pass', contrasena_lit='$contrasena', celular='$celular' WHERE id='$id'";
//     $resultado=metodoPut($query);
//     echo json_encode($resultado);
//     header("HTTP/1.1 200 OK");
//     exit();
// }

// if($_POST['METHOD']=='DELETE'){
//     unset($_POST['METHOD']);
//     $id=$_GET['id'];
//     $query="DELETE FROM usuarios_per WHERE id='$id'";
//     $resultado=metodoDelete($query);
//     echo json_encode($resultado);
//     header("HTTP/1.1 200 OK");
//     exit();
// }

header("HTTP/1.1 400 Bad Request");
?>