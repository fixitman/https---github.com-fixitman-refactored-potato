

module.exports = (sequelize, DataTypes) => {
    const Role = sequelize.define('Role', {
        role: {
            type: DataTypes.STRING,
            allowNull: false
        }
        
    });

    Role.associate = (models) => {

    }
    
    return Role


}