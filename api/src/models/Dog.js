const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.

module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('dog', {
    id: {
     type: DataTypes.UUID,
     primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    imagen:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    altura: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    peso: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    anos_de_vida: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    createdInDb: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  });
};
