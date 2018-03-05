module.exports = function(sequelize, DataTypes) {

    var Deviceconfig = sequelize.define('Deviceconfig', {
        id: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        device_id: {
            type: DataTypes.UUID,
            allowNull: false,
            foreignKey: true
        },
        gps: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        wifi: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        camera: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        memory: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        services: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        email_access: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        document_access: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        network_access: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    });

    Deviceconfig.associate = function(models) {
        Deviceconfig.belongsTo(models.Devices, { foreignKey: 'device_id', onDelete: 'cascade' });
    };

    return Deviceconfig;
};