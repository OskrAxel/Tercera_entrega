<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");
// variables
$dbhost = 'localhost';
$database = 'bqef_2';
$username = 'root';
$password = '';

$backup_file = $database.'_' . date("d-m-Y-H-i-s") . '.sql';
// comandos a ejecutar
$cmd ='D:\programas\XAMPP\mysql\bin\mysqldump --user="root" --password=""  "bqef_2" > ./backup/'.$backup_file;
exec($cmd);
header("Content-type: application/octet-stream");
header("Location: ./backup/$backup_file");

///BACKUP ESTRUCTURA
///mysqldump -u devuser -p --no-data depruebas > depruebas.sql////
///RESTAURAR
///mysql -u devuser -p depruebas2 < depruebas.sql
////https://voragine.net/weblogs/como-hacer-copias-de-seguridad-de-bases-de-datos-con-php-y-mysqldump

////OTROOOOO
// $backup_file = $dbname . date("Y-m-d-H-i-s") . '.gz';
// // comandos a ejecutar
// $command = "mysqldump --opt -h $dbhost -u $dbuser -p$dbpass $dbname | gzip &gt; $backup_file";
 
/////OTRRROOO!
// $dir = "path/to/file/";
// $filename = "backup" . date("YmdHis") . ".sql.gz";

// $db_host = "host";
// $db_username = "username";
// $db_password = "password";
// $db_database = "database";

// $cmd = "mysqldump -h {$db_host} -u {$db_username} --password={$db_password} {$db_database} | gzip > {$dir}{$filename}";
// exec($cmd);

// header("Content-type: application/octet-stream");
// header("Content-Disposition: attachment; filename=\"$filename\"");

// passthru("cat {$dir}{$filename}");
?>