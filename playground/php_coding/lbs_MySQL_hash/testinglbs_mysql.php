<?php

//localhost/testinglbs.php?la=
//require_once('Mysql.class.php');
require_once('geohash.class.php');
require_once('config.php');

function microtime_float() {
        list($usec, $sec) = explode(" ", microtime());
        return ((float)$usec + (float)$sec);
}

echo '<h2>MySQL存储过程方法</h2>';
/*
  *  连接数据库 
*/
$mysql=mysqli_connect($host,$user,$password,$database);
if($mysql){
        $mysql->query("set names utf8");
        echo "已连接上数据库$database...";
} else {
	echo 'DATABASE_CONNECTION_DIE';
	exit;
}
//获取信息
$n_latitude = $_POST['la'];
$n_longitude = $_POST['ln'];
$weight = $_POST['weight'];
echo '<br><br>';
//开始时间
$b_time = microtime_float();

/*
  *  利用MySQL存储函数函数，缩小目标范围并排序
*/
echo '用户当前经纬度：' . '[' . "{$_POST['ln']}" . ', ' . "{$_POST['la']}" . ']<br><br>';
$sql = "SELECT userId,userLatitude,userLongitude,GETDISTANCE(userLatitude,userLongitude,$n_latitude,$n_longitude) 
                                                                AS distance FROM  testing where 1 HAVING distance<$weight ORDER BY distance ASC";
if($result = $mysql -> query($sql)) {
        echo '距离计算中...';
	echo '<br><br>';
}
else {
        echo '距离计算时出错' . '<br>' . $sql . '<br>' . '错误信息：<br>'.$mysql -> error . '<br>';
        exit;
}
//结束时间1
$e_time1 = microtime_float();
$duration1 = $e_time1 - $b_time;

/*
  *  输出数据
*/
$i = 0;
echo '输出数据...<hr>';
while ($row=$result -> fetch_assoc()) {
        printf("用户 %06d  距离 %8.4f 米远<br>", $row['userId'], $row['distance']);
        $i++;
}
echo '<hr>stats: <br><br>';

echo "在 $weight 米内的有效数据共：$i 个 <br>";
//结束时间2
$e_time2 = microtime_float();
$duration2 = $e_time2 - $e_time1;

//---------------------------------------
echo "查询用时：<strong><em>$duration1 </em></strong>秒<br>输出用时：<strong><em>$duration2 </em></strong>秒<br><br>";
/* while($row=$result -> fetch_row()){
        foreach($row as $result){
                echo $row['distance'];
        }
        echo"<br>";
} */

mysqli_close($mysql);
exit;

?>