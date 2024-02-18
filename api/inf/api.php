<?php

class Api{

public function getImagenes(){

   $vector = array();
   $conexion = new Conexion();
   $db = $conexion->getConexion();
   $sql = "SELECT * FROM informe";
   $consulta = $db->prepare($sql);
   $consulta->execute();
   while($fila = $consulta->fetch()) {
       $vector[] = array(
         "id_doc" => $fila['id_doc'],
         "nom_doc" => $fila['nom_doc'],
         "nom_usu" => $fila['nom_usu'],
         "f_cargado" => $fila['f_cargado'],
         "archivo_per" =>  base64_encode($fila['archivo_per'])
    );
         }//fin del ciclo while 

   return $vector;
}


public function addImagen($descripcion,$foto,$nom_doc,$f_cargado,$id_bec){
  
  $conexion = new Conexion();
  $db = $conexion->getConexion();
  $sql = "INSERT INTO informe (nom_usu, nom_doc,id_bec, archivo_per, f_cargado) VALUES (:nom_usu,:nom_doc,:id_bec,:archivo_per,:f_cargado)";
  $consulta = $db->prepare($sql);
  $consulta->bindParam(':id_bec', $id_bec);
  $consulta->bindParam(':nom_usu', $descripcion);
  $consulta->bindParam(':archivo_per', $foto);
  $consulta->bindParam(':nom_doc', $nom_doc);
  $consulta->bindParam(':f_cargado', $f_cargado);
  $consulta->execute();

  return '{"msg":"imagen agregada"}';
}

public function deleteImagen($id_doc){
  
  $conexion = new Conexion();
  $db = $conexion->getConexion();
  $sql = "DELETE FROM informe WHERE id_doc=:id_doc";
  $consulta = $db->prepare($sql);
  $consulta->bindParam(':id_doc', $id_doc); 
  $consulta->execute();

  return '{"msg":"imagen eliminada"}';
}




}

?>
