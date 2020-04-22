const Sequelize = require('sequelize');

const config = require('./config');

console.log('init sequelize...');

var sequelize = new Sequelize(config.database, config.username, config.password, {                      //创建sequelize对象实例
    host: config.host,
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 30000
    }
});

var Pet = sequelize.define('pet', {                                                                               //定义Model Pet，即告诉sequelize如何映射数据库表
    id: {
        type: Sequelize.STRING(50),
        primaryKey: true
    },
    name: Sequelize.STRING(100),
    gender: Sequelize.BOOLEAN,
    birth: Sequelize.STRING(10),
    createdAt: Sequelize.BIGINT,               //sequelize会默认添加createdAt和updatedAt两个属性，为Sequelize.Date类型
    updatedAt: Sequelize.BIGINT,          //timestamp: false则会不自动添加这两个属性,自定义用bifint存储时间戳，无需注意时区问题
    version: Sequelize.BIGINT
}, {
        timestamps: false
    });

var now = Date.now();

Pet.create({                                                                         //用promise的写法插入数据
    id: 'g-' + now,
    name: 'Gaffey',
    gender: false,
    birth: '2007-07-07',
    createdAt: now,
    updatedAt: now,
    version: 0
}).then(function (p) {
    console.log('created:(Promise)' + JSON.stringify(p));
}).catch(function (err) {
    console.log('failed: ' + err);
});

(async () => {                                                                      //同上，但是用async的写法插入
    var dog = await Pet.create({
        id: 'd-' + now,
        name: 'Odie',
        gender: false,
        birth: '2008-08-08',
        createdAt: now,
        updatedAt: now,
        version: 0
    });
    console.log('created: (async)' + JSON.stringify(dog));
})();

(async () => {                                                                                          
    var pets = await Pet.findAll({                                              //查询
        where: {
            name: 'Gaffey'
        }
    });
    console.log(`find ${pets.length} pets:`);
    for (let p of pets) {
        console.log(JSON.stringify(p));
        console.log('update pet...');
        p.gender = true;
        p.updatedAt = Date.now();
        p.version ++;
        await p.save();                                                                     //对查询到的实例调用save方法，更新数据
        if (p.version === 3) {
            await p.destroy();                                                                  //若要删除，调用destroy方法
            console.log(`${p.name} was destroyed.`);
        }
    }
})();