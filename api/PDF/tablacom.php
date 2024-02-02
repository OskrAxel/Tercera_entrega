<?php
include 'bd/BD.php';
$fecha = date("Y-m-d");
$nombreImagen = "logo.jpg";
$imagenBase64 = "data:image/jpg;base64," . base64_encode(file_get_contents($nombreImagen));
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <link rel="stylesheet" href="./bs3.min.css">
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Comunicados</title>
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
  content: "Página N° " counter(page);
}

hr {
  page-break-after: always;
  border: 0;
}

</style>
<body>
    <!-- /////// -->
    <div id="header">
        <div class="absolute" style="top: 0px; left: 0px;">
            <img class="img img-responsive" src="<?php echo $imagenBase64 ?>" alt="Logotipo">
        </div>
        <table>
            <tr>
                <td style=" color: black;text-align: center;font-size: 17px;"><b><u>FONDO DE EDUCACION DE CUAQUEROS BOLIVIANOS:&nbsp;&nbsp;</u></b><u>Reporte</u></td>
            </tr>
            <tr>
                <td style="text-align: center;">Comunicados</td>
            </tr>
            <tr>
                <td style="text-align: right;"><b>Usuario:</b> Personal Administrativo</td>
            </tr>
            <tr>
                <td><strong>Fecha: </strong><?php echo $fecha ?></td>
            </tr>
        </table>
    </div>
    <div id="body">
        <table width="100%" cellspacing="0" cellspadding="0">
            <thead>
                <tr>
                    <th colspan="5" align="center" bgcolor="rgba(3,87,77,.80)"><strong style="color :white">Documentos Cargados</strong></th>
                </tr>
                <tr>
                    <th bgcolor="#C8A12E">N°</th>
                    <th bgcolor="#C8A12E">Nombre Documento</th>
                    <th bgcolor="#C8A12E">ID Usuario</th>
                    <th bgcolor="#C8A12E">Detalle</th>
                    <th bgcolor="#C8A12E">F. Cargado</th>
                </tr>
            </thead>
            <tbody>
            <?php
                $contador = 1;
                $consulta_1 = "SELECT * FROM comunicado";
                $mysql_query_command_1 = $consulta_1;
                $execute_result_query = mysqli_query($conn, $mysql_query_command_1);
                while ($row_set = mysqli_fetch_array($execute_result_query)) {
                ?>
                    <tr>
                        <td><?php echo $contador++; ?></td>
                        <td><?php echo $row_set["nom_doc"] ?></td>
                        <td><?php echo $row_set["id_per"] ?></td>
                        <td><?php echo $row_set["detalle"] ?></td>
                        <td><?php echo $row_set["created_at"] ?></td>
                    </tr>
                <?php }
                ?>
            </tbody>
            <tfoot>
                <tr>
                    <div id="footer">
                        <div class="page-number"></div>
                    </div>
                </tr>
            </tfoot>
        </table>
    </div>
</body>
</html>