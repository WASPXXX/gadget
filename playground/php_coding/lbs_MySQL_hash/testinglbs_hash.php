<?php

require_once('geohash.class.php');
require_once('config.php');

function microtime_float() {
        list($usec, $sec) = explode(" ", microtime());
        return ((float)$usec + (float)$sec);
}

function getDistance($lat1, $lng1, $lat2, $lng2) {
        $R = 6378137;
        $radLat1 = deg2rad($lat1);
        $radLat2 = deg2rad($lat2);
        $radLng1 = deg2rad($lng1);
        $radLng2 = deg2rad($lng2);
        $s = acos(cos($radLat1)*cos($radLat2)*cos($radLng1-$radLng2)+sin($radLat1)*sin($radLat2))*$R;
        $s = round($s* 10000)/10000;
        return  round($s);
}
echo '<h2>GeoHash编码方法</h2>';
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
//获取POST信息
$n_latitude = $_POST['la'];
$n_longitude = $_POST['ln'];
echo '<br><br>';
$geohash = new Geohash;
//开始时间
$geo_b_time = microtime_float();

/*
*  生成geohash字段  
*/
/* $sql = "select userId,userLatitude,userLongitude from testing_hash";
if($data = $mysql -> query($sql)) {
        echo '<br>进行中...';
	echo '<br><br>';
}
else {
        echo '进行时出错' . '<br>' . $sql . '<br>' . '错误信息：<br>'.$mysql -> error . '<br>';
        exit;
}
foreach($data as $val) {
        $geohash_val = $geohash->encode($val['userLatitude'],$val['userLongitude']);
        $sql = 'update testing_hash set geohash = "'.$geohash_val.'" where userId = '.$val['userId'];
        // $sql = "update testing set geohash = {$geohash_val} where userId = {$val['userId']}";
        //echo $sql;
        // $re = $mysql->query($sql);
        if(!$re = $mysql -> query($sql)) {
                echo '更新时出错' . '<br>' . $sql . '<br>' . '错误信息：<br>'.$mysql -> error . '<br>';
                exit;
        }
}
echo '<br>更新geohash字段中...';
echo '<br><br>'; */

/*
*  匹配字符串编码  
*/
//用户所提供坐标的 geohash值
$user_geohash = $geohash->encode($n_latitude,$n_longitude);
$n = $_POST['n'];
$like_geohash = substr($user_geohash, 0, $n);
// $sql = 'select * from testing_hash where geohash like "'.$like_geohash.'%"'; 另一种写法
$sql = "select * from testing_hash where geohash like". " \""."{$like_geohash}%". "\"";
echo '用户当前经纬度：' . '[' . "{$_POST['ln']}" . ', ' . "{$_POST['la']}" . ']<br><br>';
echo '字符串匹配模式：' . "$like_geohash" . '%' . '<br><br>';
if($data = $mysql -> query($sql)) {
        echo '匹配中...<br>';
} else {
        echo '匹配时出错' . '<br>' . $sql . '<br>' . '错误信息：<br>'.$mysql -> error . '<br>';
        exit;
}
echo '<hr>';

/*
*  得到匹配项的距离，并进行排序
*/
$k = 0;
foreach($data as $val) {
        // echo $val['geohash'];
        $distance = getDistance($n_latitude, $n_longitude, $val['userLatitude'], $val['userLongitude']);
        //$data[$key]['distance'] = $distance;
        // echo $distance.'<br>';
        $sortdistance[$k] = $distance;
        echo $sortdistance[$k].'--';
        $sortid[$k] = $val['userId'];
        echo $sortid[$k].'<br>';
        $k++;
}
array_multisort($sortdistance,SORT_ASC);
echo '<hr>stats: <br>';
// var_dump($sortdistance);

//结束时间
$geo_e_time = microtime_float();
$duration3 = $geo_e_time - $geo_b_time;
echo "<br>查找用时：<strong><em>$duration3 </em></strong>秒<br>";
mysqli_close($mysql);
exit;

?>