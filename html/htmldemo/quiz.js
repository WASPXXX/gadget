//全局变量 当前问题num
var qn = 0;

//从XML中加载
function getQuestions() {
	obj = document.getElementById("question");
	obj.firstChild.nodeValue="(Please wait)";
	ajaxCallback = nextQuestion;
	ajaxRequest("questions.xml");
}

//显示下一个问题
function nextQuestion() {
	questions = ajaxreq.responseXML.getElementByTagName("q");
	obj = document.getElementById("question");
	if (qn < questions.length) {
		q = questions[qn].firstChild.nodeValue;
		obj.firstChild.nodeValue = q;
	} else {
		obj.firstChild.nodeValue="(no more questions)";
	}
}

//检查answer
function checkAnswer() {
	answers = ajaxreq.responseXML.getElementByTagName("a");
	a = answers[qn].firstChild.nodeValue;
	answerfield = document.getElementById("answer");
	if (a == answerfield.value) {
		alert("Correct!");
	} else {
		alert("Incorrect. The correct answer is: " + a);
	}
	qn++;
	answerfield.value = "";
	nextQuestion();
}
//为按钮添加事件
obj = document.getElementById("start_quiz");
obj.onclick = getQuestions;
ans = document.getElementById("submit");
ans.onclick = checkAnswer;





