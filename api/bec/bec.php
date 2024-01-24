<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: GET, POST");
    header("Access-Control-Allow-Headers: Content-Type");
 include 'BD.php';
if($_SERVER['REQUEST_METHOD']=='GET'){
    if(isset($_GET['id'])){
        $iduser=$_GET['id'];
        $query="SELECT * from usuarios_bec where id_bec='$iduser'";
        $resultado=metodoGet($query);
        echo json_encode($resultado->fetch(PDO::FETCH_ASSOC));
    }else{
        $query="SELECT * from usuarios_bec";
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
    $email=$_POST['email'];
    $id_bec=$_POST['id_bec'];
    $carrera=$_POST['carrera'];
    $celular=$_POST['celular'];
    $institucion=$_POST['institucion'];
    $anio=$_POST['anio'];
    $ciudad=$_POST['ciudad'];
    $direccion=$_POST['direccion'];
    $nom_pad=$_POST['nom_pad'];
    $nom_mad=$_POST['nom_mad'];
    $query="UPDATE usuarios_bec SET nombre='$nombre', apellido='$apellido',
    email='$email', id_bec='$id_bec', carrera='$carrera',
    celular='$celular', institucion='$institucion', anio='$anio',
    ciudad='$ciudad', direccion='$direccion' , nom_pad='$nom_pad'
    , nom_mad='$nom_mad' WHERE id='$id'";
    $resultado=metodoPut($query);
    echo json_encode($resultado);
    header("HTTP/1.1 200 OK");
    exit();
}
?>