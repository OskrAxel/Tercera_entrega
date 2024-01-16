<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: GET, POST");
    header("Access-Control-Allow-Headers: Content-Type");
 include 'BD.php';
if($_SERVER['REQUEST_METHOD']=='GET'){
    if(isset($_GET['id'])){
        $iduser=$_GET['id'];
        $query="SELECT id, nombre, apellido, email, contrasena, contrasena_lit, celular from usuarios_adm where id_adm='$iduser'";
        $resultado=metodoGet($query);
        echo json_encode($resultado->fetch(PDO::FETCH_ASSOC));
    }else{
        $query="SELECT id, nombre, apellido, email, contrasena, contrasena_lit, celular from usuarios_adm";
        $resultado=metodoGet($query);
        echo json_encode($resultado->fetchAll());
    }
    header("HTTP/1.1 200 OK");
    exit();
}


if($_POST['METHOD']=='PUT'){
    unset($_POST['METHOD']);
    $id=$_GET['idb'];
    $contrasena=$_POST['contrasena'];
    $pass = md5($contrasena);
    $query="UPDATE usuarios_adm SET contrasena='$pass',contrasena_lit='$contrasena' WHERE id='$id'";
    $resultado=metodoPut($query);
    echo json_encode($resultado);
    header("HTTP/1.1 200 OK");
    exit();
}
header("HTTP/1.1 400 Bad Request");
?>