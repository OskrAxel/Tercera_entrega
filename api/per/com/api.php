<?php

class Api{

public function getImagenes(){

   $vector = array();
   $conexion = new Conexion();
   $db = $conexion->getConexion();
   $sql = "SELECT * FROM comunicado";
   $consulta = $db->prepare($sql);
   $consulta->execute();
   while($fila = $consulta->fetch()) {
       $vector[] = array(
         "id_com" => $fila['id_com'],
         "nom_doc" => $fila['nom_doc'],
         "id_per" => $fila['id_per'],
         "detalle" => $fila['detalle'],
         "archivo_com" =>  base64_encode($fila['archivo_com'])
    );
         }//fin del ciclo while 

   return $vector;
}


public function addImagen($nom_usu,$com,$nom_doc){
  
  $conexion = new Conexion();
  $db = $conexion->getConexion();
  $sql = "INSERT INTO comunicado (id_per, nom_doc, archivo_com) VALUES (:nom_usu,:nom_doc,:archivo_com)";
  $consulta = $db->prepare($sql);
  $consulta->bindParam(':nom_usu', $nom_usu);
  $consulta->bindParam(':archivo_com', $com);
  $consulta->bindParam(':nom_doc', $nom_doc);
  $consulta->execute();

  return '{"msg":"comunicado agregado"}';
}

public function deleteImagen($id_com){
  
  $conexion = new Conexion();
  $db = $conexion->getConexion();
  $sql = "DELETE FROM comunicado WHERE id_com=:id_com";
  $consulta = $db->prepare($sql);
  $consulta->bindParam(':id_com', $id_com); 
  $consulta->execute();

  return '{"msg":"imagen eliminada"}';
}




}

?>
