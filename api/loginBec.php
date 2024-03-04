<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: GET, POST");
    header("Access-Control-Allow-Headers: Content-Type");
 
$conn = new mysqli("localhost","root","","bqef_2");

if(mysqli_connect_error()){
        echo mysqli_connect_error();
        exit();
    }
    else{
        $eData = file_get_contents("php://input");
        $dData = json_decode($eData, true);
 
        $iduser = $dData['iduser'];
        $pass = $dData['pass'];
        $password = md5($pass);
        $result = "";
 
        if($iduser != "" and $pass != ""){
            $sql = "SELECT * FROM usuarios_bec WHERE id_bec='$iduser';";
            $res = mysqli_query($conn, $sql);
 
            if(mysqli_num_rows($res) != 0){
                $row = mysqli_fetch_array($res);
                if($password != $row['contrasena']){
                    $result = "Contraseña no válida!";
                }
                else{
                    $result = "Inicio sesión con éxito!";
                }
            }
            else{
                $result = "Usuario no válido!";
            }
        }
        else{
            $result = "";
        }
 
        $conn -> close();
        $response[] = array("result" => $result);
        echo json_encode($response);
    }
 
?>