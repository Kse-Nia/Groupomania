const db = require("../config/config");
const User = require("../Models/user.model");

export.register = async (req, res) => {
    //ce qui est envoyé dans la req
    const {
        username,
        useremail,
        userpassword
    } = req.body;

    try {
        const user = await UserModel.create
    }


};