<?php
include 'bd/BD.php';
$fecha = date("d-m-Y");
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
    <title>Becarios</title>
</head>
<style type="text/css">

#wrap { margin:30px auto; width:600px; font-family:sans-serif; color:#444; cursor:default; }

	h { font-size:20px; font-weight:bold; }
    h1 { font-size:40px; text-align:center; font-weight:bold; margin-bottom:30px; text-shadow:0 0 3px #ddd; }
    pre { background-color:#eee; margin:10px 0; padding:5px; }


@page {
	margin: 1cm;
}
/* //// */
.tra {
  border-radius: 3px;
  background-color: rgba(232, 232, 232, 0.65);
}
.title-form {
  padding: 0.5rem;
  background: rgba(3, 87, 77, 0.8);
  color: rgb(255 255 255 / 90%);
  text-align: center;
}
#body td, th {
    border: solid #aaaaaab3;
}

body {
    font-family: "Rubik", sans-serif;
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
  top:  75px;
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
                <td style="text-align: center;">TIPO DE USUARIO:&nbsp;&nbsp;Becarios</td>
            </tr>
            <tr>
                <td style="text-align: right;"><b>Usuario:</b> Personal Administrativo</td>
            </tr>
            <tr>
                <td><strong>Fecha: </strong><?php echo $fecha ?></td>
            </tr>
        </table>
    </div>
    <div id="body" class="tra">
        <table width="100%" cellspacing="0" cellspadding="0">
            <thead>
                <tr class="title-form">
                    <th>N°</th>
                    <th>Nombre</th>
                    <th>Apellido</th>
                    <th>Carrera</th>
                    <th>Año</th>
                    <th>Email</th>
                    <th>Telf/Cel</th>
                    <th>Ciudad</th>
                    <th>Dirección</th>
                    <th>Padre</th>
                    <th>Madre</th>
                </tr>
            </thead>
            <tbody>
            <?php
                $contador = 1;
                $consulta_1 = "SELECT * FROM usuarios_bec";
                $mysql_query_command_1 = $consulta_1;
                $execute_result_query = mysqli_query($conn, $mysql_query_command_1);
                while ($row_set = mysqli_fetch_array($execute_result_query)) {
                ?>
                    <tr>
                        <td><?php echo $contador++; ?></td>
                        <td><?php echo $row_set["nombre"] ?></td>
                        <td><?php echo $row_set["apellido"] ?></td>
                        <td><?php echo $row_set["carrera"] ?></td>
                        <td><?php echo $row_set["anio"] ?></td>
                        <td><?php echo $row_set["email"] ?></td>
                        <td><?php echo $row_set["celular"] ?></td>
                        <td><?php echo $row_set["ciudad"] ?></td>
                        <td><?php echo $row_set["direccion"] ?></td>
                        <td><?php echo $row_set["nom_pad"] ?></td>
                        <td><?php echo $row_set["nom_mad"] ?></td>
                    </tr>
                <?php }
                ?>
            </tbody>
        </table>
    </div>
    <div id="footer">
        <div class="page-number"></div>
    </div>
</body>
</html>