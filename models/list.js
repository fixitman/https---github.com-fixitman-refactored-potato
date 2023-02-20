

module.exports = (sequelize, DataTypes) => {
    const List = sequelize.define('List', {
        id:{
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4, 
            allowNull: false, 
            primaryKey: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    List.associate = (models) => {
        List.belongsToMany(models.User, {through: models.Role})
    }
    
    return List


}