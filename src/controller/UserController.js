const {User} = require("../models");
const AuthService = require("../services/AuthService");
class UserController {
  async index (req,res){
    try {
      const users = await User.findAll();
      return res.status(200).json({status: 200, users});
    } catch (err) {
      return res.status(500).json({status: 500, message: err.message});
    }
  }
  async show(req,res){
    try {
      const user = await User.findByPk(req.params.user_id);
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
  async create(req,res){
    try {
      const user = await User.create(req.body);
      res.status(201).json(user);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
  async update(req,res){
    try {
      const user = await User.findByPk(req.params.user_id);
      await user.update(req.body);
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
  async delete(req,res){
    try {
      const user = await User.findByPk(req.params.user_id);
      await user.destroy();
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
  async register(req,res){
    await AuthService.register(req,res);
  }
  async login(req,res){
    await AuthService.login(req,res);
  }
}
export default new UserController();