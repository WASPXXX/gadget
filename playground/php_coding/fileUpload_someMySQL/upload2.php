<?php
date_default_timezone_set('Asia/Shanghai');

function mkdirm($path)  {
	return is_dir($path) or (mkdirm(dirname($path)) and mkdir($path, 0777));
} 
	
function createRandomStr($length){ 
	$str = '0123456789abcdefghijklmnopqrstuvwxyz'; 
	$str = str_shuffle($str); 
	if($length > strlen($str)) {
		return substr($str, 0, strlen($str));
	} else {
		return substr($str, 0, $length);
	} 
}
	
function getname($exname, $dir = "./public/"){
	if($_POST['targetDir']) {
		$dir = './' . $_POST['targetDir'] . '/';
	}
	if(!is_dir($dir)){
		mkdirm($dir);   
	}
	$datel = date('Y-m-d');
	$namen=$datel.'-' . 'KL' . '-' . createRandomStr(10);
	$name=$namen.".".$exname;
	$results=$dir.$name;	  
	return $results;
}

$count = count($_FILES['upfile']['name']);
$display = array();
$goodEntry = 0;

$allowedExts = array("gif", "jpeg", "jpg", "png","mp4","rar","3gp","php","pdf");
try {			
	for($i = 0; $i < $count; $i++ ) {
		$exname=strtolower(substr($_FILES['upfile']['name'][$i], (strrpos($_FILES['upfile']['name'][$i],'.')+1)));
		//echo json_encode($_FILES['upfile']['size']);
		if($_FILES['upfile']['name'][$i] === "" || $_FILES['upfile']['size'][$i] === 0) {
			echo 'null'.'<br>';
			continue;
		}
		if(!in_array($exname, $allowedExts)) {
			$temp = json_encode($allowedExts);
                        throw new Exception("Format Error. Valid: $temp");
                        return;
		} else {
                        $uploadfile = getname($exname);
                        if(!move_uploaded_file($_FILES['upfile']['tmp_name'][$i], $uploadfile) || !$_FILES['upfile']['error'][$i] === UPLOAD_ERR_OK ) {
				throw new Exception('Upload Unfinished.');
				return;
			}
			$display["$i"] = $_FILES['upfile']['name'][$i];
			//--------------------------------------------------------------------------------------------
			//--------------------------------------------------------------------------------------------
			//--------------------------------------------------------------------------------------------
			//$fileName = date('Y-m-d') . 'KL'. createRandomStr(6). '.' . "$exname";
			$fileName = substr($uploadfile, (strrpos($uploadfile, '/') + 1));
			$usrId = $_POST['userId'];
			$fileType = $_FILES['upfile']['type'][$i];
			$uploadTime = $today = date("F j, Y, g:i A");
			require('dbInsert.php');
                }
	}
	$goodCount = count($display);
	echo '成功记录到数据库：' . $goodEntry . '条记录。';
	echo '<br>';
	echo '成功上传到服务器：' . $goodCount . '个文件。'; 
	echo '<br>';
	if($goodCount){
		//var_dump($display);
		echo '详细信息：<br>';
		print_r($display);
	}
}
catch (Exception $e) {echo 'Message: '.$e -> getmessage();}

echo "<br>";
echo json_encode("Upload Finished.");
echo "<br>";
echo '<br>';
echo '<hr>';
echo '<button><a href="./intro.html" style="text-decoration: none">Back to Homepage</a></button>';
echo '<button><a href="./upload2.html" style="text-decoration: none"s>Continue to Upload</a></button><br>';

//---------------------------------------------------
//---------------------------------------------------
// $targetName = 
// $userId = $_POST['userId'];



// require_once(dbdemo.php);

?>