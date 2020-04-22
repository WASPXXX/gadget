//建立数组

var names = new Array();
var i = 0;

//输入数据
do {
	next = window.prompt("Enter the Next Name:", "Johnny Depp");
	if(next >"")	names[i] = next;
	i++;
} while(next > "");

document.write("<h2>" + names.length + " names have been entered.</h2>");

//显示数据

document.write("They are: <br/><ul>");
for (i in names) {
	document.write("<li>" + names[i] + "</li>");
}
document.write("</ul>");