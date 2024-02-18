<?php
include 'bd/BD.php';
$fecha = date("d-m-Y");
$nombreImagen = "logo.jpg";
$imagenBase64 = "data:image/jpg;base64," . base64_encode(file_get_contents($nombreImagen));

$query_fech = "SELECT id_fech,fecha,fech_lit FROM fecha_ent ORDER BY id_fech DESC LIMIT 1";
            $query1 = mysqli_query($conn, $query_fech);
            $fech = mysqli_fetch_assoc($query1);

            $fechaE = $fech['fecha'];
            $fechaEntera = strtotime($fechaE);
            $anio = date("Y", $fechaEntera);
            $mes = date("m", $fechaEntera);
            $dia = date("d", $fechaEntera);
            $año_a = date('Y');
            $nF=$dia.'/'.$mes.'/'.$anio;
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <link rel="stylesheet" href="./bs3.min.css">
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Entrega Informes</title>
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
                <td style="text-align: center;">TIPO DE Reporte:&nbsp;&nbsp;Estado Entrega de informes</td>
            </tr>
            <tr>
                <td style="text-align: right;"><b>Usuario:</b> Personal Administrativo</td>
            </tr>
            <tr>
                <td><strong>Fecha: </strong><?php echo $fecha ?></td>
            </tr>
            </br>
            <tr>
                <td><strong>Fecha Entrega: </strong><?php echo $nF ?></td>
            </tr>
        </table>
    </div>
    <div id="body" class="tra">
        <table width="100%" cellspacing="0" cellspadding="0">
            <thead>
                <tr class="title-form">
                    <th>N°</th>
                    <th>Usuario</th>
                    <th>Nom.Doc</th>
                    <th>Fecha E.</th>
                    <th>Estado</th>
                </tr>
            </thead>
            <tbody>
            <?php
            
/////
                $contador = 1;
                $consulta_1 = "SELECT CONCAT(usuarios_bec.nombre,' ',usuarios_bec.apellido) AS responsable,informe.nom_doc, informe.f_cargado FROM informe 
                RIGHT JOIN usuarios_bec ON usuarios_bec.id_bec = informe.id_bec";
                $mysql_query_command_1 = $consulta_1;
                $execute_result_query = mysqli_query($conn, $mysql_query_command_1);
                $est = '';
                while ($row_set = mysqli_fetch_array($execute_result_query)) {
                  //condicion
                  if ($row_set['f_cargado'] == $fech['fecha']) {
                    $est = '<td align="center" style="background-color:#2E8B57;color:#fff">' . 'ENTREGADO' . '</td>';
                  } elseif ($row_set['f_cargado'] > $fech['fecha']) {
                    $est = '<td align="center" style="background-color:#CD5C5C;color:#fff">' . 'RETRASO' . '</td>';
                  } elseif ($row_set['f_cargado'] == 0) {
                    $est = '<td align="center" style="background-color:#db922e;color:#fff">' . 'PENDIENTE' . '</td>';
                  } else {
                    $est = '<td align="center" style="background-color:#2E8B57;color:#fff">' . 'ENTREGADO' . '</td>';
                  }
                ?>
                    <tr>
                        <td><?php echo $contador++; ?></td>
                        <td><?php echo $row_set['responsable'] ?></td>
                        <td><?php echo $row_set['nom_doc']  ?></td>
                        <td><?php echo $row_set['f_cargado'] ?></td>
                        <?php echo $est ?>
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