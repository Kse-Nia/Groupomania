const Sequelize = require("sequelize");
const sequelize = new Sequelize(
    "Groupomania",
    "kseniya",
    "password", {
        host: "localhost",
        dialect: "mysql",
    }
);

try {
    sequelize.authenticate();
    console.log("connexion reussi");
} catch (error) {
    console.log("connexion non reussi");
};

// Création modèle utilisateur

module.exports = (sequelize, DataTypes) => {
    const Comments = sequelize.define("Comments", {
        commentBody: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });

    return Comments;
};