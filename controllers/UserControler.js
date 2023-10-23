const { User, Photo } = require("../models");
const { generateToken } = require("../helpers/jwt");
const { comparePassword } = require("../helpers/bcrypt");

class UserController {
  static async getUsers(req, res) {
    try {
      const data = await User.findAll({
        include: Photo,
      });
      res.status(200).json(data);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static async register(req, res) {
    try {
      const { username, email, password } = req.body;
      const data = await User.create({
        username,
        email,
        password,
      });

      res.status(201).json({
        id: data.id,
        username: data.username,
        email: data.email,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static async login(req, res) {
    try {
      const { email, password } = req.body;
      const data = await User.findOne({
        where: {
          email:email
        },
      });

      if (!data) {
        throw {
          code: 404,
          message: "User tidak ada",
        };
      }


      const isValid = comparePassword(password, data.password);
      if (!isValid) {
        throw {
          code: 401,
          message: "password salah",
        };
      }


      const token = generateToken({
        id: data.id,
        email: data.email,
        username: data.username,
      });
      res.status(200).json( {token} );
    } catch (error) {

      res.status(error.code || 500).json(error);
    }
  }
}

module.exports = UserController;
