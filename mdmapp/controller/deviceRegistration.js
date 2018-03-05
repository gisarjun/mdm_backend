// DB schema files
var deviceModels = require('../models').Devices;
var deviceConfigModels = require('../models').Deviceconfig;

//config file
var config = require(__dirname + '/../config/config.json');

//external controller
var deviceConfigController = require('./deviceConfig');



module.exports = {
    // Device Registration
    deviceRegister: function(req, res) {

        try {
            var userInput = Object.assign({}, req.body);
            if (userInput.udid) {
                deviceModels.findOrCreate({
                        where: {
                            udid: userInput.udid
                        },
                        defaults: userInput
                    })
                    .spread(function(resultData, created) {
                        var sendRegisteredDevice = resultData.get({ plain: true });
                        if (created) {
                            deviceConfigController.createDeviceConfig(sendRegisteredDevice, res);
                        } else {
                            res.json({ status: false, message: 'Device Already Exist' });
                        }
                    })
                    .catch(function(err) {
                        console.log(err);
                        res.json({ status: false, message: 'Device Not Registerd' });
                    });
            } else {
                res.json({ status: false, message: 'Required variable is missing' });
            }

        } catch (error) {
            console.log(error, 'Registered Device');
            res.json({ status: false, message: 'Device Not Registerd' });
        }

    },

    updateDevice: function(req, res) {
        try {
            var userInput = Object.assign({}, req.body);
            if (userInput.device_id) {
                var searchQuery = {};
                searchQuery.name = 'findById';
                searchQuery.conditions = userInput.device_id;
                returnDeviceCommon(searchQuery, function(resultData) {
                    if (resultData) {
                        resultData.updateAttributes(userInput)
                            .then(function(updatedData) {
                                if (updatedData) {
                                    res.json({ status: true, message: 'Updated Successfully' });
                                } else {
                                    res.json({ status: false, message: 'Could not update' });
                                }
                            })
                            .catch(function(error) {
                                console.log(error, 'Updated Devices');
                                res.json({ status: false, message: 'Could not update' });
                            });
                    } else {
                        res.json({ status: false, message: 'Could not update' });
                    }
                });
            } else {
                res.json({ status: false, message: 'Required variable is missing' });
            }

        } catch (error) {
            console.log(error, 'Updated Device');
            res.json({ status: false, message: 'Could Not Update' });
        }
    },

    getAllDevices: function(req, res) {
        try {
            var inputParams = Object.assign({}, req.params);
            var searchQuery = {};
            if (inputParams && inputParams.deviceId) {
                searchQuery.name = 'findById';
                searchQuery.conditions = inputParams.deviceId;
            } else {
                searchQuery.name = 'findAll';
                searchQuery.conditions = { include: [deviceConfigModels] };
            }
            returnDeviceCommon(searchQuery, function(resultData) {
                if (resultData) {
                    res.json({ status: false, data: resultData });
                } else {
                    res.json({ status: false, message: 'Could not get' });
                }
            });
        } catch (error) {
            console.log(error, 'Get ALL Devices');
            res.json({ status: false, message: 'Could not get' });
        }
    }
};

function returnDeviceCommon(searchquery, callback) {
    try {
        deviceModels[searchquery.name](searchquery.conditions)
            .then(function(resultData) {
                if (resultData) {
                    callback(resultData);
                } else {
                    callback(resultData);
                }
            })
            .catch(function(error) {
                console.log(error);
                callback(null);
            });
    } catch (error) {
        console.log(error, 'Common Module');
        callback(null);
    }
}