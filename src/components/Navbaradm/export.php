<?php
// variables
$dbhost = 'localhost';
$database = 'bqef_2';
$username = 'root';
$password = '';

$backup_file = $database . date("Y-m-d-H-i-s") . '.sql';
// comandos a ejecutar
exec('d:/xampp/mysql/bin/mysqldump --user="root" --password="" --host="localhost" "bqef_2" > ./file.sql');

?>
<!-- //////OTROOOO -->
<?php
// Connect to the database
$conn = mysqli_connect('localhost', 'root', '', 'bqef_2');

// Check connection
if (!$conn) {
  die("Connection failed: " . mysqli_connect_error());
}

// Export the database
$sql = "SELECT * INTO OUTFILE 'd:/backup.sql' FROM usuarios_bec";

if (mysqli_query($conn, $sql)) {
  echo "Database backup successfully created!";
} else {
  echo "Error: " . $sql . "<br>" . mysqli_error($conn);
}

// Close the connection
mysqli_close($conn);
/////////otro
// https://www.netveloper.com/mysql-realizar-backup-schema