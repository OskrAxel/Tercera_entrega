<?php
include '../../database_connection/database_connection.php';
$codigoHTML = '
<!DOCTYPE html>
<html>
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
</head>

<style type="text/css">

#wrap { margin:30px auto; width:600px; font-family:sans-serif; color:#444; cursor:default; }

	h { font-size:20px; font-weight:bold; }
    h1 { font-size:40px; text-align:center; font-weight:bold; margin-bottom:30px; text-shadow:0 0 3px #ddd; }
    pre { background-color:#eee; margin:10px 0; padding:5px; }


@page {
	margin: 2cm;
}

body {
  font-family: sans-serif;
	margin: 0.5cm 0;
	font-size: 10pt;
}
div.absolute {
	position: absolute;
	padding: 0.5em;
	text-align: center;
	vertical-align: middle;
}

#header,
#footer {
  position: fixed;
  left: 0;
	right: 0;
	color:black;
	font-size: 0.9em;
}

#header {
  top: 0;
	border-bottom: 0.1pt solid #aaa;
}

#footer {
  bottom: 0;
  border-top: 0.1pt solid #aaa;
}

#body {
  position: relative;
  top:  60px;
}

#header table,
#footer table {
	width: 100%;
	border-collapse: collapse;
	border: none;
}

#header td,
#footer td {
  padding: 0;
	width: 50%;
}

.page-number {
  text-align: center;
}

.page-number:before {
  content: "Page " counter(page);
}

hr {
  page-break-after: always;
  border: 0;
}

</style>

<body>

	<div id="header">
	<div class="absolute" style="top: 0px; left: 0px;">
    <img src="logo.png" alt="dompdf"/>
	</div>
  <table>
    <tr>
    	<td style=" color: black;text-align: center;font-size: 17px;"><b><u>FONDO DE EDUCACION DE CUAQUEROS BOLIVIANOS:&nbsp;&nbsp;</u></b><u>Reporte</u></td>
    </tr>
    <tr>
   		 <td style="text-align: center;">TIPO DE REPORTE:&nbsp;&nbsp;Entrega Informes</td>
    </tr>
  </table><br>
  <table>
    <tr>
     	<td style="text-align: right;">Usuario: Administrador</td>
    </tr>
  </table>
</div>
<div id="footer">
  <div class="page-number"></div>
</div>
<div id="body">
<table width="100%" border="1" cellspacing="0" cellspadding="0">
    <tr>
      <td colspan="7" align="center" bgcolor="rgba(3,87,77,.80)" style="color: black" ><strong style="color :#fff;font-size: large">Estado Entrega Informes Becarios</strong></td>
    </tr>
    <tr align="center" style="font-weight: bold;">
      <td bgcolor="#C8A12E">N°</td>
      <td bgcolor="#C8A12E">TITULO</td>
      <td bgcolor="#C8A12E">RESPONSABLE</td>
      <td bgcolor="#C8A12E">F. CARGA</td>
      <td bgcolor="#C8A12E">TIPO</td>
      <td bgcolor="#C8A12E">ESTADO</td>
      <td bgcolor="#C8A12E">COMENTARIO</td>
    </tr>';
$query_fech = "SELECT id,fecha FROM fecha_ent ORDER BY id DESC LIMIT 1";
$query1 = mysqli_query($conn, $query_fech);
$fech = mysqli_fetch_assoc($query1);

$fecha = $fech['fecha'];
$fechaEntera = strtotime($fecha);
$anio = date("Y", $fechaEntera);
$mes = date("m", $fechaEntera);
$contador = 1;
$año_a = date('Y');
$consulta_1 = "SELECT CONCAT(becarios_datos.nombre,' ',becarios_datos.apellido) AS responsable,tbl_documentos.tipo,tbl_documentos.comentario,tbl_documentos.nombre,tbl_documentos.fecha FROM tbl_documentos
                    RIGHT JOIN becarios_datos ON becarios_datos.id_usuario = tbl_documentos.id_usuario WHERE becarios_datos.year= $año_a";
$mysql_query_command_1 = $consulta_1;
$execute_result_query = mysqli_query($conn, $mysql_query_command_1);
$est = '';
while ($row_set = mysqli_fetch_array($execute_result_query)) {
  //condicion
  if ($row_set['fecha'] == $fech['fecha']) {
    $est = '<td align="center" style="background-color:#2E8B57;color:#fff">' . 'ENTREGADO' . '</td>';
  } elseif ($row_set['fecha'] > $fech['fecha']) {
    $est = '<td align="center" style="background-color:#CD5C5C;color:#fff">' . 'RETRASO' . '</td>';
  } elseif ($row_set['fecha'] == 0) {
    $est = '<td align="center" style="background-color:#db922e;color:#fff">' . 'PENDIENTE' . '</td>';
  } else {
    $est = '<td align="center" style="background-color:#2E8B57;color:#fff">' . 'ENTREGADO' . '</td>';
  }
  $codigoHTML .= '
            <tr>
              <td align="center">' . $contador++ . '</td>
              <td>' . $row_set['nombre'] . '</td>
              <td>' . $row_set['responsable'] . '</td>
              <td align="center">' . $row_set['fecha'] . '</td>
              <td align="center">' . $row_set['tipo'] . '</td>
              ' . $est . '
              <td>' . $row_set['comentario'] . '</td>
            </tr>';
}
$codigoHTML .= '
</table>
</div>
</body>
</html>';
require_once 'dompdf/vendor/autoload.php';
use Dompdf\Dompdf;

use Dompdf\Options;

$options = new Options();
$options->set('chroot', realpath(''));
$dompdf = new Dompdf($options);

$dompdf->load_html($codigoHTML, 'UTF-8');
$dompdf->set_paper('A4', 'landscape');
$dompdf->render();
$dompdf->stream('Reporte', array("Attachment" => false));

?>