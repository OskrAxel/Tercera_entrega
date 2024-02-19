<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: GET, POST");
    header("Access-Control-Allow-Headers: Content-Type");
 include 'BD.php';
if($_SERVER['REQUEST_METHOD']=='GET'){
    if(isset($_GET['id'])){
        $query="SELECT * from usuarios_per where id=".$_GET['id'];
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
    $id=$_GET['id'];
    $nombre=$_POST['nombre'];
    $apellido=$_POST['apellido'];
    $carrera=$_POST['carrera'];
    $celular=$_POST['celular'];
    $institucion=$_POST['institucion'];
    $anio_inicio=$_POST['anio_inicio'];
    $email=$_POST['email'];
    $query="UPDATE usuarios_per SET nombre='$nombre', apellido='$apellido',
     carrera='$carrera', celular='$celular', institucion='$institucion',
      anio_inicio='$anio_inicio', email='$email' WHERE id='$id'";
    $resultado=metodoPut($query);
    echo json_encode($resultado);
    header("HTTP/1.1 200 OK");
    exit();
}
?>