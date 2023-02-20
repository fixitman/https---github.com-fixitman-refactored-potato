

module.exports = (sequelize, DataTypes) => {
    const List = sequelize.define('List', {
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