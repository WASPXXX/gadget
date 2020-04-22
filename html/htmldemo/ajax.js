//全局变量
//完成时调用的函数
var ajaxreq = false, ajaxCallback;

//创建请求、打开URL、发送请求、等待响应
function ajaxRequest(filename) {
	try { 		//新一点的浏览器
		ajaxreq = new XMLHttpRequest();
	} catch (error) {
		try {       	 //IE5,6
			ajaxreq = new ActiveXObject("Microsoft.XMLHTTP");
		} catch (error) {
			return false;
		}
	}
	ajaxreq.open("GET",filename); //使用GET方法发送数据到服务器端
	ajaxreq.onreadystatechange = ajaxResponse;
	ajaxreq.send(null);
}

//ajaxResponse函数（等待响应并调用相关函数）
function ajaxResponse() {
	if (ajaxreq.readyState != 4) return;
	if (ajaxreq.status == 200) {
		if (ajaxCallback) ajaxCallback();
	}
	else alert("Request failed: " + ajaxreq.statusText);
	return true;
}