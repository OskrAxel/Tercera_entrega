<?php

include 'BD.php';

error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

if($_SERVER['REQUEST_METHOD']=='GET'){
    if(isset($_GET['id'])){
        $query="SELECT * from usuarios_bec where id=".$_GET['id'];
        $resultado=metodoGet($query);
        echo json_encode($resultado->fetch(PDO::FETCH_ASSOC));
    }else{
        $query="SELECT id, nombre,id_bec, apellido, email, contrasena, celular, nota_eva,carrera,anio,ciudad,direccion,nom_pad,nom_mad from usuarios_bec ORDER BY nombre ASC";
        $resultado=metodoGet($query);
        echo json_encode($resultado->fetchAll()); 
    }
    header("HTTP/1.1 200 OK");
    exit();
}

if($_POST['METHOD']=='POST'){
    unset($_POST['METHOD']);
    $nombre=$_POST['nombre'];
    $apellido=$_POST['apellido'];
    $id_bec=$_POST['id_bec'];
    $email=$_POST['email'];
    $contrasena=$_POST['contrasena'];
    $celular=$_POST['celular'];
    $created_at = date('Y-m-d');
    $ciudad='S/R';
    $anio='0';
    $usu_creacion=$_POST['usu_creacion'];
    $pass = md5($contrasena);
    $query="INSERT INTO usuarios_bec(id,nombre, apellido, id_bec,email, contrasena, contrasena_lit, celular,ciudad, created_at, usu_creacion,anio) values (NULL,'$nombre', '$apellido','$id_bec', '$email', '$pass', '$contrasena', '$celular', '$ciudad', '$created_at', '$usu_creacion', '$anio')";
    $queryAutoIncrement="SELECT MAX(id) as id from usuarios_bec";
    $resultado=metodoPost($query, $queryAutoIncrement);
    echo json_encode($resultado);
    header("HTTP/1.1 200 OK");
    exit();
}

if($_POST['METHOD']=='PUT'){
    unset($_POST['METHOD']);
    $id=$_GET['id'];
    $nombre=$_POST['nombre'];
    $apellido=$_POST['apellido'];
    $email=$_POST['email'];
    $contrasena=$_POST['contrasena'];
    $celular=$_POST['celular'];
    $usu_modificacion=$_POST['usu_modificacion'];
    $pass = md5($contrasena);
    $query="UPDATE usuarios_bec SET nombre='$nombre', apellido='$apellido', email='$email',contrasena='$pass',contrasena_lit='$contrasena', celular='$celular', usu_modificacion='$usu_modificacion' WHERE id='$id'";
    $resultado=metodoPut($query);
    echo json_encode($resultado);
    header("HTTP/1.1 200 OK");
    exit();
}

if($_POST['METHOD']=='DELETE'){
    unset($_POST['METHOD']);
    $id=$_GET['id'];
    $usu_modificacion=$_POST['usu_modificacion'];
    $query2="UPDATE usuarios_bec SET usu_modificacion='$usu_modificacion' WHERE id='$id'";
    $resultado=metodoPut($query2);
    $query="DELETE FROM usuarios_bec WHERE id='$id'";
    $resultado=metodoDelete($query);
    echo json_encode($resultado);
    header("HTTP/1.1 200 OK");
    exit();
}

header("HTTP/1.1 400 Bad Request");
?>