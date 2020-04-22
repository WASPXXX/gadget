<?php

require_once('config.php');


$db=mysqli_connect($host,$user,$password,$database);
if($db){
	$db->query("set names utf8");
} else {
	echo 'DATABASE_CONNECTION_DIE';
	exit;
}

$sql = "INSERT INTO common_file_manage(filename,userid,filetype,uploadtime) VALUES ('$fileName','$usrId','$fileType','$uploadTime')";

if($db -> query($sql) === true) {
	echo '插入一条新数据...';
	echo '<br>';
	$goodEntry++;
	}
else {
	echo '插入时出错' . '<br>' . $sql . '<br>' . '错误信息：<br>'.$db -> error . '<br>';
}
mysqli_close($db);
// $url=$_POST['url'];
// $id=$_POST['id'];
// $dateline = time();
// $sort=$_POST['sort'];

/* switch($sort) {
case "1":
	$sql = "SELECT url,id,dateline,sort FROM pre_common_admincp_cmenu WHERE id = '$id' LIMIT 1";
	$yanzhi=$db->query($sql);
	$row=$yanzhi->fetch_assoc();
	mysqli_close($db);
	echo json_encode($row);
	break;
case "2":
	$sql = "INSERT INTO pre_common_admincp_cmenu (id,url,sort,dateline) VALUES ('$id','$url','$sort','$dateline')";
	$db->query($sql);
	mysqli_close($db);
	echo 'ok';
	break;
case "3":
	$sql = "UPDATE pre_common_admincp_cmenu SET url = $url   WHERE  id='$id' ";
	$db->query($sql);
	mysqli_close($db);
	echo 'ok';
	break;
case "4":
	$sql = "DELETE FROM pre_common_admincp_cmenu WHERE id = '$id' ";
	$db -> query($sql);
	mysqli_close($db);
	echo 'ok';
	break;
} */
	
/* function createRandomStr($length){ 
	$str = '0123456789abcdefghijklmnopqrstuvwxyz'; 
	$str = str_shuffle($str); 
	return substr($str,0,$length); 
} */

?>