<?php
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET, POST');
    header('Access-Control-Allow-Headers: Content-Type');
 include 'BD.php';
if($_SERVER['REQUEST_METHOD']=='GET'){
    if(isset($_GET['id'])){
        $iduser=$_GET['id'];
        $query="SELECT * from horario1 where id_B='$iduser'";
        $resultado=metodoGet($query);
        echo json_encode($resultado->fetch(PDO::FETCH_ASSOC));
    }else{
        $query="SELECT * from horario1";
        $resultado=metodoGet($query);
        echo json_encode($resultado->fetchAll());
    }
    header("HTTP/1.1 200 OK");
    exit();
}
if($_POST['METHOD']=='PUT'){
    unset($_POST['METHOD']);
    ////
    $iduser=$_GET['id'];
    $semestre=$_POST['semestre'];
    $anio=$_POST['anio'];
    $anio_carr=$_POST['anio_carr'];
    $mat_a1=$_POST['mat_a1'];
    $hor_a1=$_POST['hor_a1'];
    $hor_a2=$_POST['hor_a2'];
    $hor_a3=$_POST['hor_a3'];
    $dias_a1=$_POST['dias_a1'];
    $mat_b1=$_POST['mat_b1'];
    $hor_b1=$_POST['hor_b1'];
    $hor_b2=$_POST['hor_b2'];
    $hor_b3=$_POST['hor_b3'];
    $dias_b1=$_POST['dias_b1'];
    $mat_c1=$_POST['mat_c1'];
    $hor_c1=$_POST['hor_c1'];
    $hor_c2=$_POST['hor_c2'];
    $hor_c3=$_POST['hor_c3'];
    $dias_c1=$_POST['dias_c1'];
    $mat_d1=$_POST['mat_d1'];
    $hor_d1=$_POST['hor_d1'];
    $hor_d2=$_POST['hor_d2'];
    $hor_d3=$_POST['hor_d3'];
    $dias_d1=$_POST['dias_d1'];
    $mat_e1=$_POST['mat_e1'];
    $hor_e1=$_POST['hor_e1'];
    $hor_e2=$_POST['hor_e2'];
    $hor_e3=$_POST['hor_e3'];
    $dias_e1=$_POST['dias_e1'];
    $mat_f1=$_POST['mat_f1'];
    $hor_f1=$_POST['hor_f1'];
    $hor_f2=$_POST['hor_f2'];
    $hor_f3=$_POST['hor_f3'];
    $dias_f1=$_POST['dias_f1'];
    $mat_g1=$_POST['mat_g1'];
    $hor_g1=$_POST['hor_g1'];
    $hor_g2=$_POST['hor_g2'];
    $hor_g3=$_POST['hor_g3'];
    $dias_g1=$_POST['dias_g1'];
    ////
    $query="UPDATE horario1 SET semestre='$semestre',anio='$anio',anio_carr='$anio_carr',
    mat_a1='$mat_a1',hor_a1='$hor_a1',hor_a2='$hor_a2',hor_a3='$hor_a3',dias_a1='$dias_a1',
    mat_b1='$mat_b1',hor_b1='$hor_b1',hor_b2='$hor_b2',hor_b3='$hor_b3',dias_b1='$dias_b1',
    mat_c1='$mat_c1',hor_c1='$hor_c1',hor_c2='$hor_c2',hor_c3='$hor_c3',dias_c1='$dias_c1',
    mat_d1='$mat_d1',hor_d1='$hor_d1',hor_d2='$hor_d2',hor_d3='$hor_d3',dias_d1='$dias_d1',
    mat_e1='$mat_e1',hor_e1='$hor_e1',hor_e2='$hor_e2',hor_e3='$hor_e3',dias_e1='$dias_e1',
    mat_f1='$mat_f1',hor_f1='$hor_f1',hor_f2='$hor_f2',hor_f3='$hor_f3',dias_f1='$dias_f1',
    mat_g1='$mat_g1',hor_g1='$hor_g1',hor_g2='$hor_g2',hor_g3='$hor_g3',dias_g1='$dias_g1' where idBec='$iduser'";
    $resultado=metodoPut($query);
    echo json_encode($resultado);
    header("HTTP/1.1 200 OK");
    exit();
}
?>