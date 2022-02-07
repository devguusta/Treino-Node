const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt")
const { User } = require("../models");
const ONE_DAY = 86400000;
module.exports = {

    register: async (req, res) => {

        try {
            var email = req.body.email;
            var password = req.body.password;
            var name = req.body.name;
            var cpf = req.body.cpf;
            console.log(req.body);
            if (!cpf || !name || !email || !password) {

                return res.status(400).json({
                    message: "Please fill all fields"
                })
            }
            User.findOne({ where: { email: email } }).then(user => {
                if (user == undefined) {
                    console.log(user);
                    const hashPassword = bcrypt.hash(password, 10);
                    const user = User.create({
                        cpf: cpf,
                        name: name,
                        email: email,
                        password: hashPassword,
                    });
                    const token = getToken(user.id, user.email);
                    console.log(user);
                    user.dataValues.token = token;
                    res.status(201).json({ status: 201, user });

                } else {
                    return res.status(400).json({
                        message: "User already exists"
                    })

                }

            });


        } catch (err) {
            res.status(500).json({ status: 500, message: err.message });
        }
    },
    login: async (req, res) => {
        try {
            const { email, password } = req.body;
            if (!(email || password)) {
                return res.status(400).json({
                    message: "Please fill all fields"
                })
            }
            
            const user = await User.findOne({ where: { email } })
            if (!user) {
                return res.status(404).json({
                    message: "User Not Found"
                })
            }
            const isPasswordValid = await bcrypt.compare(password, user.dataValues.password);
            console.log(password)
            console.log(user)
            if (!isPasswordValid) {
                return res.status(401).json({
                    message: "Invalid Password"
                })
            }
            const token = getToken(user.id, user.email);
            user.dataValues.token = token;
            res.status(200).json({ status: 200, user });
        } catch (err) {
            res.status(500).json({ status: 500, message: err.message });
        }
    }, 
};



function getToken(user_id, email) {
    return jwt.sign({ user_id, email }, process.env.TOKEN_KEY, {
        expiresIn: ONE_DAY * 30,
    });
}