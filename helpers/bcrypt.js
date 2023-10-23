const bcrypt = require("bcryptjs");

function comparePassword(plainPassword, hashedPassword) {
  return bcrypt.compareSync(plainPassword, hashedPassword);
}
function hashPassword(plainPassword) {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(plainPassword, salt);
  return hash;
}


module.exports = {
  hashPassword,
  comparePassword,
};