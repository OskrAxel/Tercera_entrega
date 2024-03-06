<?php

include 'BD.php';

error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

if($_SERVER['REQUEST_METHOD']=='GET'){
    if(isset($_GET['id'])){
        $query="SELECT * from patrocinador where id=".$_GET['id'];
        $resultado=metodoGet($query);
        echo json_encode($resultado->fetch(PDO::FETCH_ASSOC));
    }else{
        $query="SELECT * from patrocinador";
        $resultado=metodoGet($query);
        echo json_encode($resultado->fetchAll()); 
    }
    header("HTTP/1.1 200 OK");
    exit();
}

if($_POST['METHOD']=='POST'){
    unset($_POST['METHOD']);
    $nombre=$_POST['nombre'];
    $id_pat=$_POST['id_pat'];
    $pais=$_POST['pais'];
    $email=$_POST['email'];
    $direccion=$_POST['direccion'];
    $celular=$_POST['celular'];
    $usu_creacion=$_POST['usu_creacion'];
    $created_at = date('Y-m-d');
    $institucion = $_POST['institucion'];
    $query="INSERT INTO patrocinador(id,nombre,id_pat, pais, email, direccion, celular, institucion, usu_creacion, created_at)
    values (NULL,'$nombre', '$id_pat', '$pais', '$email', '$direccion', '$celular', '$institucion', '$usu_creacion', '$created_at')";
    $queryAutoIncrement="SELECT MAX(id) as id from patrocinador";
    $resultado=metodoPost($query, $queryAutoIncrement);
    echo json_encode($resultado);
    header("HTTP/1.1 200 OK");
    exit();
}

if($_POST['METHOD']=='PUT'){
    unset($_POST['METHOD']);
    $id=$_GET['id'];
    $nombre=$_POST['nombre'];
    $pais=$_POST['pais'];
    $email=$_POST['email'];
    $direccion=$_POST['direccion'];
    $celular=$_POST['celular'];
    $usu_modificacion=$_POST['usu_modificacion'];
    $institucion = $_POST['institucion'];
    $updated_at = date('Y-m-d');
    $query="UPDATE patrocinador SET nombre='$nombre', pais='$pais', email='$email', direccion='$direccion', celular='$celular', institucion='$institucion', updated_at='$updated_at', usu_modificacion='$usu_modificacion' WHERE id='$id'";
    $resultado=metodoPut($query);
    echo json_encode($resultado);
    header("HTTP/1.1 200 OK");
    exit();
}

if($_POST['METHOD']=='DELETE'){
    unset($_POST['METHOD']);
    $id=$_GET['id'];
    $usu_modificacion=$_POST['usu_modificacion'];
    $query2="UPDATE patrocinador SET usu_modificacion='$usu_modificacion' WHERE id='$id'";
    $resultado=metodoPut($query2);
    $query="DELETE FROM patrocinador WHERE id='$id'";
    $resultado=metodoDelete($query);
    echo json_encode($resultado);
    header("HTTP/1.1 200 OK");
    exit();
}

header("HTTP/1.1 400 Bad Request");
?>