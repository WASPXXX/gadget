//初始化数组和计数器
var namecount = 0; //全局var
var names = new Array();

function sortNames() {
	//从方框内获得名字
	currentname = document.namesortingform.typename.value;
	//添加到字符串数组中
	names[namecount] = currentname;
	//计数器+1
	namecount++;
	//进行排序
	names.sort();
	//输出并做格式处理（字符串数组用join()方法重新组合成一个字符串然后控制输出格式）
	document.namesortingform.sortednames.value = names.join("\n");
}