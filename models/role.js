

module.exports = (sequelize, DataTypes) => {
    const Role = sequelize.define('Role', {
        role: {
            type: DataTypes.ENUM('OWNER','EDITOR','READER'),
            allowNull: false,
            defaultValue: 'READER'
        }
        
    });

    Role.associate = (models) => {

    }
    
    return Role


}