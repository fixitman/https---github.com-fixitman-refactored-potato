

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        id:{
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false, 
            primaryKey: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        pwHash: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    User.associate = (models) => {
        User.belongsToMany(models.List, {through: models.Role})
    }
    
    return User


}