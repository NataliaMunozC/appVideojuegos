const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.


module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('videogame', {
    id:{
      type:DataTypes.UUID,
      defaultValue:DataTypes.UUIDV1,
      allowNull:false,
      primaryKey:true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    released: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    rating: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    platforms: {
      type:DataTypes.ARRAY(DataTypes.TEXT),
      allowNull: false,
    },
    image:{
      type:DataTypes.TEXT,
      allowNull:true,
    },
    created:{
      type:DataTypes.BOOLEAN,
      allowNull:false,
      defaultValue:true,
    }   
  },
  {timestamps:false});
};