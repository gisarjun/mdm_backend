var fs = require('fs');
var path = require('path');
var Sequelize = require('sequelize');

var env = process.env.NODE_ENV || 'development';
var dbconfig = require(__dirname + '/../config/config.json')[env];

var basename = path.basename(__filename);

var db = {};

if (dbconfig.use_env_variable) {
    var sequelize = new Sequelize(process.env[dbconfig.use_env_variable], dbconfig);
} else {
    var sequelize = new Sequelize(dbconfig.database, dbconfig.username, dbconfig.password, dbconfig);
}

fs
    .readdirSync(__dirname)
    .filter(function(file) {
        return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
    })
    .forEach(function(file) {
        var model = sequelize['import'](path.join(__dirname, file));
        db[model.name] = model;
    });

Object.keys(db).forEach(function(modelName) {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});


sequelize.sync({
    //force: true
}).then(function(err) {
    console.log('It worked!');
}, function(err) {
    console.log('An error occurred while creating the table:', err);
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;