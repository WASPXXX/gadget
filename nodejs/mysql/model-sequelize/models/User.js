const db = require('../db');                                                    //不直接使用Sequelize的API，而是通过db.js间接的定义
                                                                                                   //User就具有了email、passwd、name、gender四个字段
module.exports = db.defineModel('users', {                     //其余字段应该是自动加上，而不是每次都重新去定义
    email: {
        type: db.STRING(100),
        unique: true
    },
    passwd: db.STRING(100),
    name: db.STRING(100),
    gender: db.BOOLEAN
});