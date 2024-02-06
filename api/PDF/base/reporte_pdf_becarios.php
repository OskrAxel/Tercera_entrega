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
    	<td style=" color: black;text-align: right;font-size: 17px;"><b><u>FONDO DE EDUCACION DE CUAQUEROS BOLIVIANOS:&nbsp;&nbsp;</u></b><u>Reporte</u></td>
    </tr>
    <tr>
   		 <td style="text-align: center;">TIPO DE USUARIO:&nbsp;&nbsp;Becarios</td>
    </tr>
  </table><br>
  <table>
    <tr>
     	<td style="text-align: right;">Usuario: Administrador Sistema</td>
    </tr>
  </table>
</div>
<div id="footer">
  <div class="page-number"></div>
</div>
<div id="body">
<table width="100%" border="1" cellspacing="0" cellspadding="0">
    <tr>
      <td colspan="10" align="center" bgcolor="rgba(3,87,77,.80)" style="color: black" ><strong style="color :lightgray">DATOS BECARIOS</strong></td>
    </tr>
    <tr>
      <td bgcolor="#C8A12E">Nombre</td>
      <td bgcolor="#C8A12E">Apellido</td>
      <td bgcolor="#C8A12E">Carrera</td>
      <td bgcolor="#C8A12E">Año</td>
      <td bgcolor="#C8A12E">Turno</td>
      <td bgcolor="#C8A12E">Telf/Cel</td>
      <td bgcolor="#C8A12E">Ciudad</td>
      <td bgcolor="#C8A12E">Dirección</td>
      <td bgcolor="#C8A12E">Padre</td>
      <td bgcolor="#C8A12E">Madre</td>
    </tr>';
$consulta_1 = "SELECT * FROM becarios_datos";
$mysql_query_command_1 = $consulta_1;
$execute_result_query = mysqli_query($conn, $mysql_query_command_1);
while ($row_set = mysqli_fetch_array($execute_result_query)) {
  $codigoHTML .= '
            <tr>
            <td>' . $row_set["nombre"] . '</td>
            <td>' . $row_set["apellido"] . '</td>
            <td>' . $row_set["carrera"] . '</td>
            <td>' . $row_set["year"] . '</td>
            <td>' . $row_set["turno"] . '</td>
            <td>' . $row_set["telefono"] . '</td>
            <td>' . $row_set["ciudad"] . '</td>
            <td>' . $row_set["direccion"] . '</td>
            <td>' . $row_set["nombre_padre"] . '</td>
            <td>' . $row_set["nombre_madre"] . '</td>
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
$dompdf->set_paper('letter', 'landscape');
$dompdf->render();
$dompdf->stream('Reporte', array("Attachment" => false));

?>