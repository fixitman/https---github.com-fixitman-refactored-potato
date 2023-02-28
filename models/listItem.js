

module.exports = (sequelize, DataTypes) => {
    const ListItem = sequelize.define('ListItem', {
        id:{
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4, 
            allowNull: false, 
            primaryKey: true
        },
        itemText: {
            type: DataTypes.STRING,
            allowNull: false
        },
        completed:{
            type: DataTypes.BOOLEAN,
            alloeNull: false,
            defaultValue: false
        }
    });

    ListItem.associate = (models) => {
        ListItem.belongsTo(models.List)
        
    }
    
    return ListItem


}