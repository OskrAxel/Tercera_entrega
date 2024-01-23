<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: GET, POST");
    header("Access-Control-Allow-Headers: Content-Type");
 include 'BD.php';
if($_SERVER['REQUEST_METHOD']=='GET'){
    if(isset($_GET['id'])){
        $iduser=$_GET['id'];
        $query="SELECT * from usuarios_per where id_per='$iduser'";
        $resultado=metodoGet($query);
        echo json_encode($resultado->fetch(PDO::FETCH_ASSOC));
    }else{
        $query="SELECT * from usuarios_per";
        $resultado=metodoGet($query);
        echo json_encode($resultado->fetchAll());
    }
    header("HTTP/1.1 200 OK");
    exit();
}
if($_POST['METHOD']=='PUT'){
    unset($_POST['METHOD']);
    $iduser=$_GET['id'];
    $nombre=$_POST['nombre'];
    $apellido=$_POST['apellido'];
    $query="UPDATE usuarios_per SET nombre='$nombre', apellido='$apellido' WHERE id_per='$iduser'";
    $resultado=metodoPut($query);
    echo json_encode($resultado);
    header("HTTP/1.1 200 OK");
    exit();
}
?>