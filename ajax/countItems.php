<?php  
require_once '../includes/db.php'; // The mysql database connection script
$query="SELECT ID, ITEM, STATUS, CREATED_AT from shop";
$result = $mysqli->query($query) or die($mysqli->error.__LINE__);
echo $result->num_rows;
?>