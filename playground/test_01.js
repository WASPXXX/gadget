function stringify(data) {
        var result = [];
        for(let x in data) {
                let arr = [];
                arr.push(x);
                arr.push(data[x].toString());
                result.push(arr.join('='));
        }
        let temp = ',';
        result = result.join('&')
                                .replace(',' , '%' + temp.charCodeAt().toString(16))
                                .replace(' ','+');
        return result;
}

var info = {
        id: 123,
        content: 'hello, world!'
};
var query = stringify(info);
console.log('查询结果：');
console.log(query);
