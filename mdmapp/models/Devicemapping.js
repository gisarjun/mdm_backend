module.exports = function(sequelize, DataTypes) {

    var Devicemapping = sequelize.define('Devicemapping', {
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
        app_name: {
            type: DataTypes.STRING,
            allowNull: true
        },
        installed_on: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: DataTypes.NOW
        },
        size: {
            type: DataTypes.STRING,
            allowNull: true
        },
        no_of_visits_per_day: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        status: {
            type: DataTypes.STRING,
            allowNull: true
        },
        last_active_at: {
            type: DataTypes.DATE,
            allowNull: true
        },
        last_update_at: {
            type: DataTypes.DATE,
            allowNull: true
        }
    });

    Devicemapping.associate = function(models) {
        Devicemapping.belongsTo(models.Devices, { foreignKey: 'device_id', onDelete: 'cascade' });
    };

    return Devicemapping;
};