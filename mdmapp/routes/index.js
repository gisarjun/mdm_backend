var express = require('express');

var authenticateOAuth = require("../controller/googleOAuthVerfication");
var deviceController = require("../controller/deviceRegistration");
var deviceConfigController = require("../controller/deviceConfig");
var config = require('../config/config.json');

module.exports = function(app) {

    app.get('/', function(req, res, next) {
        res.render('index', { title: 'MDM' });
    });

    app.use('/api', async function(req, res, next) {
        try {
            var origin = req.get('origin');
            var token = typeof req.headers.authorization === 'string' ? req.headers.authorization.slice(7) : undefined;

            if (origin === 'mdmapp' && token) {
                var getAutheticate = await authenticateOAuth(token, config.web.client_id, config.web.client_secret);
                if (getAutheticate.status) {
                    next();
                    // res.json({ status: true, data: getAutheticate.data });
                } else {
                    res.json({ status: false, message: 'Authentication Failed or Token Expires' });
                }
            } else {
                res.status(403).json({ status: false, message: 'No token provided' });
            }
        } catch (error) {
            res.json({ status: false, message: error });
        }
    });

    // Device Details CRUD
    app.put('/api/deviceRegistration', deviceController.deviceRegister);
    app.post('/api/updateDevice', deviceController.updateDevice);
    app.get('/api/getAllDevices', deviceController.getAllDevices);
    app.get('/api/getDeviceDetail/:deviceId', deviceController.getAllDevices);

    // Device Config CRUD
    app.post('/api/updateDeviceConfig', deviceConfigController.updateDeviceConfig);
    app.get('/api/getAllDeviceConfigs', deviceConfigController.getAllDevicesConfig);
    app.get('/api/getDeviceConfig/:deviceId', deviceConfigController.getAllDevicesConfig);
};