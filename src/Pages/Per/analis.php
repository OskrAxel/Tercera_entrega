<?php
$query_fech = "SELECT id,fecha FROM fecha_ent ORDER BY id DESC LIMIT 1";
$query1 = mysqli_query($conn, $query_fech);
$fech = mysqli_fetch_assoc($query1);

$fecha = $fech['fecha'];
$fechaEntera = strtotime($fecha);
$anio = date("Y", $fechaEntera);
$mes = date("m", $fechaEntera);
$año_a = date('Y');
$contador = 1;
$consulta_1 = "SELECT CONCAT(becarios_datos.nombre,' ',becarios_datos.apellido) AS responsable, tbl_documentos.fecha FROM tbl_documentos
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

    ?>
    <tr>
        <td>
            <?php echo $contador++; ?>
        </td>
        <td>
            <?php echo $row_set['responsable']; ?>
        </td>
        <td>
            <?php echo $row_set['fecha']; ?>
        </td>
        <?php echo $est; ?>
    </tr>
    <?php
}
?>