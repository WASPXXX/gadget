//OOProgramming

/* 
1. 创建对象
 */

 //Object实例，早期
var person = new Object();
person.name = 'wasp';
person.age = 16;
person.job = 'painter';

person.greeting = function () {
        alert(this.name);      
};
// or另一种写法
var person = {
        name: 'wasp',
        age = 16,
        job = 'painter',
        greeting: function() {
                alert(this.name);
        }
};
/* .................................................................................................. */

//构造函数模式
function Person(name, age, job) {
        this.name = name;
        this.age = age;
        this.job = job;
        this.greeting = function() {
                alert(this.name);
        }
}
var p1 = new Person('wasp', 16, 'painter');       
/* 多个实例的同一个方法不是同一个的Function实例
可以把函数定义放到外部，但这样又很奇怪，全局作用域的定义为一个对象服务
也没有封装性 */
/* .................................................................................................. */

//原型模式
function Person() {}
Person.prototype.name = 'wasp';
Person.prototype.age = 16;
Person.prototype.job = 'painter';
Person.prototype.greeting = function() {       //不同实例访问同一组属性和方法
        alert(this.name);
};
/* 这种共享对于函数很适合，对于基本值的属性，虽然会初始化相同的值
但是实例中的同名属性会覆盖，也能接受，但是若是有引用类型，会出现不同实例共享就不合适 */
/* .................................................................................................. */

//组合使用构造函数模式和原型模式（使用最多的）
function Person(name, age, job) {
        this.name = name;
        this.age = age;
        this.job = job;
}
Person.prototype.nationality = 'CN';
Person.prototype.greeting = function() {
        alert(this.name);
};
//or写成
Person.prototype = {
        constructor: Person,
        nationality: 'CN',
        greeting: function() {
                alert(this.name);
        }
};
/* 构造函数用于定义实例属性，原型模式用于定义方法和共享的属性。每个实例都有自己的一份实例属性的副本
也同时共享对方法的引用，最大限度地节约了内存 */
/* .................................................................................................. */


/* 
2. 继承
 */
//只有实现继续，没有接口继承

//原型链继承
//intro
function FatherType() {      
        this.xxx = true;
}
FatherType.prototype.getvalue = function() {
        return this.xxx;
};

function SonType() {
        this.xxxxxx = false;
}
SonType.prototype = new FatherType();  
/* 不使用SonType默认的原型，换成了FatherType的一个实例
拥有作为FatherType实例所有的全部属性和方法 
其内部还有一个指针，指向FatherType的原型*/
SonType.prototype.getlongvalue = function() {      
        return this.xxxxxx;                                          
};

var instance = new SonType(); 
/* instance指向SonType的原型，SonType的原型指向FatherType的原型
getvalue仍然在FatherType.prototype中
但是xxx属性作为实例属性则位于SonType.prototype（此时作为FatherType的实例）中
此时调用instance.getvalue，会经历三个步骤：
1. 搜索实例； 2. 搜索SonType.prototype； 3. 搜索FatherType.prototype。
  */
 //同样存在类似原型模式的问题
/* .................................................................................................. */

  //借用构造函数（constructor stealing）继承/经典继承
function FatherType() {
        this.colorset = ['red', 'blue', 'white'];
}
function SonType() {
        FatherType.call(this);
}
var instance1 = new SonType();
instance.colorset.push('black');
alert(instance1.colorset); // red, blue, white, black
var instance2 = new SonType();
alert(instance2.colorset); //red, blue, white 
/* 避免了针对对引用类型的问题，也同样面对类似构造函数创建对象的问题 */
/* .................................................................................................. */

//组合继承（伪经典继承）
//结合两种方法，使用原型链实现对原型属性和方法的继承，使用经典继承实现对实例属性的继承

function FatherType(name) {
        this.name = name;
        this.colorset = ['red', 'blue', 'white'];
}
FatherType.prototype.sayname = function() {
        alert(this.name);
};
function SonType(name, age) {                     //继承属性
        FatherType.call(this, name);
        this.age = age;
}
SonType.prototype = new FatherType();          //继承方法
SonType.prototype.constructor = SonType;
SonType.prototype.sayage = function() {
        alert(this.age);
};

var instance1 = new SonType('wasp', 16);
instance1.colorset.push('black');
alert(instance1.colorset); // red blue white black
instance1.sayname(); //wasp
instance1.sayage(); //16
var instance2 = new SonType('leslie', 18);
alert(instance2.colorset); // red blue white
instance2.sayname(); // leslie
instance2.sayage(); //18
/* .................................................................................................. */

/*
3. ES6的Class 
 */
//intro
class FatherType {
        constructor(name, age) {
                this.name = name;
                this.age = age;
        }
        sayname() {
                return this.name;
        }
        sayage() {
                return this.age;
        }
} 
//类的所有方法都定义在类的prototype属性上，
Object.assign(FatherType.prototype, {
        sayhello() {                
                alert('hello, my frd!' );
        },
        somefunc() {},
        static otherfunc() {}  //静态方法不会被实例继承，直接通过类调用FatherType.otherfunc() 
});
//继承
class SonType extends FatherType {
        constructor(name, age, job) {
                super(name, age);
                this.job = job;
        }
        saygreeting() {
                return super.sayhello() + ' ' + 'I\'m' + super.sayname() + '.';  
                //静态方法可以被子类继承，同样通过SonType.otherfunc()调用，也可以从super对象上调用
        }
}

