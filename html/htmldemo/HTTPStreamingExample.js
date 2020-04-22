//使用XHR对象实现HTTP流的简单实例
function createStreamingClient(url, progress, finished) {
          var xhr = createXHR(),
                    received = 0; //用于记录已经处理了多少字符
          xhr.open("get", url);
          xhr.onreadystatechange = function() {
                    var result;
                    if (xhr.readyState == 3) {
                              //获取最新数据并调整计数器
                              result = xhr.responseText.substring(received);
                              received += result.length;
                              //调用progress
                              progress(result);
                    } else if (xhr.readyState == 4) {
                              finished(result);
                    }
          };
          xhr.send(null);
          return xhr;
}

var client = createStreamingClient("streaming.php", function(data) {
          alert("Received: "+ data);
          }, function(data) {
          alert("Done!");
});
module.exports.functionName = function () {
          // body...
};
module.exports.functionName = function () {
          // body...
};
