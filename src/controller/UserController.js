const {User} = require("../models");
const AuthService = require("../services/AuthService");

module.exports = {
    create: async (req, res) => {
        try {
          const user = await User.create(req.body);
          res.status(201).json(user);
        } catch (err) {
          res.status(500).json({ message: err.message });
        }
      },
}