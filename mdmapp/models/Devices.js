module.exports = function(sequelize, DataTypes) {

    var Devices = sequelize.define('Devices', {
        id: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        udid: {
            type: DataTypes.STRING,
            allowNull: false
        },
        notification_token: {
            type: DataTypes.STRING,
            allowNull: true
        },
        device_name: {
            type: DataTypes.STRING,
            allowNull: true
        },
        model: {
            type: DataTypes.STRING,
            allowNull: true
        },
        os_version: {
            type: DataTypes.STRING,
            allowNull: true
        },
        status: {
            type: DataTypes.STRING,
            allowNull: true
        },
        last_sync: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: DataTypes.NOW
        },
        isDeleted: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    });

    Devices.associate = function(models) {
        Devices.hasMany(models.Devicemapping, { foreignKey: 'device_id', onDelete: 'cascade' });
        Devices.hasMany(models.Deviceconfig, { foreignKey: 'device_id', onDelete: 'cascade' });
    };

    return Devices;
};