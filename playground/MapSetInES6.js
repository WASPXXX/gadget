//Map、Set

/* Map */
var namecard = new Map([
        ['wasp', 16],
        ['leslie', 18],
        ['ryan', 38],
        ['jaden', 24]
]);
console.log(namecard.size);                     // size
console.log(namecard.get('leslie'));            //get()
namecard.set('leslie', 43);                             //set( , )
console.log(namecard.get('leslie'));
console.log(namecard.has('leslie'));            //has()
namecard.delete('leslie');                              //delete()
console.log(namecard);
namecard.clear();                                             //clear()
console.log(namecard);

for(let xx of namecard) {
        console.log(xx);
}
for(let xx of namecard.keys()) {                //keys()
        console.log(xx);
}
for(let xx of namecard.values()) {                //values()
        console.log(xx);
}
for(let [xx,yy] of namecard.entries()) {                //entries()
        console.log(xx,yy);
}
namecard.forEach(
        (k, v) => {console.log(k, v);}
);                                                                                           //forEach ？


[...namecard]                                           //转化为数组，即可以使用数组的map、filter等方法
var namecard_01 = new Map([...namecard].filter(([xx, yy]) => yy>18));
//Map {"ryan" => 38, "jaden" => 24}
var namecard_02 = new Map([...namecard].map(([xx,yy]) => [xx + ' of WaspInc', yy]));
//Map {"wasp of WaspInc" => 16, "ryan of WaspInc" => 38, "jaden of WaspInc" => 24}


/* Set */
//与Map类似，但成员值唯一，没有重复的值，加入重复值不会更新
var set = new Set([1, 2, 2, 3, 4, 4]);
var uniset = [...set]; // Array [1, 2, 3, 4]

var numcard = new Set([1, 2, 3 ,4]);
numcard = new Set([...numcard].map(n => n*2)); // Set {2, 4, 6, 8}
numcard = new Set([...numcard].filter( n => (n % 3) === 0)); //  Set {6}
//很容易实现一些集合运算
var a = new Set([1, 2, 4]);
var b = new Set([2, 3, 4, 5]);
union = new Set([...a, ...b]); // Set {1,2,3,4,5}
intersect = new Set([...a].filter( n => b.has(n))); // Set {2,4}
diff = new Set([...a].filter(n => !b.has(n))); // Set {1}
