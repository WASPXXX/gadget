//CORS 跨浏览器支持
function createCORSRequest(method, url) {
	var xhr = createXHR;
	if ("withCredentials" in xhr) {
		xhr.open(method, url);
	} else if (typeof XDomainRequest != "undefined") {
		xhr = new XDomainRequest();
		xhr.open(method, url);
	} else {
		xhr = null;
	}
	return xhr;
}

var request = createCORSRequest("get", "http://www.wasp.com/riven");
if (request) {
	request.onload = function() { //试图支持IE的XDR对象，一些属性和方法不能使用
		//处理responseText
	};
	request.send();
}
