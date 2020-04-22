//定义对象的方法，即打印定义对象的信息
function printCard() {
	var name_part = "<strong>Name: </strong>" + this.nickname + "<br/>\n";
	var email_part = "<strong>Email: </strong>" + this.email + "<br/>\n";
	var address_part = "<strong>Address: </strong>" + this.address + "<br/>\n";
	var phone_part = "<strong>Phone: </phone>" + this.phone + "<br/><hr/>\n";

	document.write(name_part, email_part, address_part, phone_part);
}
//定义Card对象 
function Card(nickname,email,address,phone) {
	this.nickname = nickname;
	this.email = email;
	this.address = address;
	this.phone = phone;
	this.printCard = printCard;
}
// 赋值
// var Ryan = Card("Ryan","Ryan@163.com","#2046","239738");
// var Jack = Card("Jack","Jack@163.com","#1048","709738");
// var Rose = Card("Rose","Rose@163.com","#1045","239738");

var Ryan = new Card("Ryan","Ryan@163.com","#2046","239738");
var Jack = new Card("Jack","Jack@163.com","#1048","709738");
var Rose = new Card("Rose","Rose@163.com","#1045","239738");
//print 
document.write("<hr/>");
Ryan.printCard();
Jack.printCard();
Rose.printCard();