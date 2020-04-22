//xhr对象，支持IE早期版本
function createXHR() {
	if (typeof XMLHttpRequest != "undefined") {
		return new XMLHttpRequest();
	} else if (typeof ActiveXObject != "undefined") {
		if (typeof argument.callee.activeXString != "string") {
			var versions = ["MSXML2.XMLHttp.6.0", "MSXML2.XMLHttp.3.0", "MSXML2.XMLHttp"], i ,len;

			for(i=0,len=versions.length; i < len; i++) {
				try {
					new ActiveXObject(versions[i]);
					argument.callee.activeXString = versions[i];
					break;
				} catch (ex) {
					//....
				}
			}
		}
		return new ActiveXObject(argument.callee.activeXString);
	} else {
		throw new Error("NO XHR obeject available.");
	}
}
//使用XHR，以及回调函数
var xhr = createXHR();
xhr.onreadystatechange = function() {
	if (xhr.readyState == 4) {
		if((xhr.status >= 200 && xhr.status < 300) || xhr.status ==304) {
			alert(xhr.responseText);
		} else {
			alert("Request was unsuccessful: " + xhr.status);
		}
	}
};
