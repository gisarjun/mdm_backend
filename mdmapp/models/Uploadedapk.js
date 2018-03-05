module.exports = function(sequelize, DataTypes) {

    var Uploadedapk = sequelize.define('Uploadedapk', {
        id: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        app_name: {
            type: DataTypes.STRING,
            allowNull: true
        },
        size: {
            type: DataTypes.STRING,
            allowNull: true
        },
        uploaded_on: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: DataTypes.NOW
        },
        status: {
            type: DataTypes.STRING,
            allowNull: true
        },
        image_path: {
            type: DataTypes.STRING,
            allowNull: true
        },
        file_path: {
            type: DataTypes.STRING,
            allowNull: true
        }
    });

    return Uploadedapk;
};