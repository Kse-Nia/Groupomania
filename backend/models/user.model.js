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
    console.log("connexion pas reussi");
};


// Création modèle utilisateur

const User = sequelize.define("User", {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: true,
    },
    username: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    useremail: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    userpassword: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    isAdmin: {
        type: Sequelize.BOOLEAN,
        defaultValue: 0,
    },
});

User.sync({
    alter: true,
});

module.exports = User;