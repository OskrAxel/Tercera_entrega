<?php

class Api{

public function getImagenes(){

   $vector = array();
   $conexion = new Conexion();
   $db = $conexion->getConexion();
   $sql = "SELECT id_fech,fecha,fech_lit FROM fecha_ent ORDER BY id_fech DESC LIMIT 1";
   $consulta = $db->prepare($sql);
   $consulta->execute();
   while($fila = $consulta->fetch()) {
       $vector[] = array(
         "id_fech" => $fila['id_fech'],
         "fecha" => $fila['fecha'],
         "fech_lit" => $fila['fech_lit']
    );
         }//fin del ciclo while 

   return $vector;
}


public function addImagen($fecha){
  
  $conexion = new Conexion();
  $db = $conexion->getConexion();
  $sql = "INSERT INTO fecha_ent (fecha, fech_lit) VALUES (:fecha,:fech_lit )";
  $consulta = $db->prepare($sql);
  $consulta->bindParam(':fecha', $fecha);
  $consulta->bindParam(':fech_lit', $fecha);
  $consulta->execute();

  return '{"msg":"fecha actualizada"}';
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
