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
      type: DataTypes.BLOB,
      allowNull: false,
    },
    name: {
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
    alturaMax: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    alturaMin: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    pesoMax: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    pesoMin: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    edadMax: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    edadMin: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    colorFondo: {
      type: DataTypes.STRING,
      allowNull: true
    },
    años_de_vida: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
};
