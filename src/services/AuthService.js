const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt")
const { User } = require("../models");

module.exports = {
register: async (req,res) => {
    try {
    const {cpf, name, email, password} = req.body;
    if(!(cpf || name || email || password)){
        return res.status(400).json({
            message: "Please fill all fields"
        })
    }
    const userExist = await User.findOne({where: {email}});

    if(userExist){
        return res
        .status(409)
        .json({ status: 409, message: "User Already Exist. Please Login" });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
        cpf,
        name,
        email, 
       password:  hashPassword,
    });
    const token = getToken(user.id, user.email);
console.log(user);
    user.dataValues.token = token;
    res.status(201).json({ status: 201, user });
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  }
},
};