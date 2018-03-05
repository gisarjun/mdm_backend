// DB schema files
var deviceConfigModels = require('../models').Deviceconfig;

//config file
var config = require(__dirname + '/../config/config.json');



module.exports = {
    // Device Config Creation
    createDeviceConfig: function(createdData, res) {

        try {
            deviceConfigModels.create({
                    device_id: createdData.id
                })
                .then(function(result) {
                    if (result) {
                        if (typeof createdData === 'object') {
                            createdData.config = result.get({ plain: true });
                        }
                        res.json({ status: true, data: createdData, message: 'Created Successfully' });
                    } else {
                        res.json({ status: false, message: 'Could not create' });
                    }
                })
                .catch(function(error) {
                    console.log(error);
                    res.json({ status: false, message: 'Could not create' });
                });

        } catch (error) {
            console.log(error);
            res.json({ status: false, message: 'Could not create' });
        }

    },

    updateDeviceConfig: function(req, res) {
        try {
            var userInput = Object.assign({}, req.body);
            if (userInput.device_id) {
                var searchQuery = {};
                searchQuery.name = 'findOne';
                searchQuery.conditions = { where: { device_id: userInput.device_id } };
                returnDeviceCommon(searchQuery, function(resultData) {
                    if (resultData) {
                        resultData.updateAttributes(userInput)
                            .then(function(updatedData) {
                                if (updatedData) {
                                    res.json({ status: true, message: 'Config Updated Successfully' });
                                } else {
                                    res.json({ status: false, message: 'Could not update' });
                                }
                            })
                            .catch(function(error) {
                                console.log(error, 'Config Updated');
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
            console.log(error, 'Config Updated Device');
            res.json({ status: false, message: 'Could Not Update' });
        }
    },

    getAllDevicesConfig: function(req, res) {
        try {
            var inputParams = Object.assign({}, req.params);
            var searchQuery = {};
            if (inputParams && inputParams.deviceId) {
                searchQuery.name = 'findOne';
                searchQuery.conditions = { where: { device_id: inputParams.deviceId } };
            } else {
                searchQuery.name = 'findAll';
                searchQuery.conditions = {};
            }
            returnDeviceCommon(searchQuery, function(resultData) {
                if (resultData) {
                    res.json({ status: false, data: resultData });
                } else {
                    res.json({ status: false, message: 'Could not get' });
                }
            });
        } catch (error) {
            console.log(error, 'Get ALL Devices Config');
            res.json({ status: false, message: 'Could not get' });
        }
    }
};

function returnDeviceCommon(searchquery, callback) {
    try {
        deviceConfigModels[searchquery.name](searchquery.conditions)
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