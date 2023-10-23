const { verifyToken } = require("../helpers/jwt");
const { User } = require("../models");

const authentication = async (req, res, next) => {
  try {
    const token = req.headers["authorization"];

    if (!token) {
      throw {
        code: 401,
        message: "Login Dulu Yaa",
      };
    }

   
    const decoded = verifyToken(token);
    const userData = await User.findOne({
      where: {
        id: decoded.id,
        email: decoded.email,
      },
    });

    if (!userData) {
      throw {
        code: 401,
        message: "User Tidak ada",
      };
    }

    req.userData = {
      id: userData.id,
      email: userData.email,
      username: userData.username,
    };
    
    next();
  } catch (error) {
    res.status(error.code || 500).json(error.message);
  }
};

module.exports = { authentication };
