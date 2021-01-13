const User = require("../models/user");

const create = async () => {
  const newUser = await User.create({});
  return newUser;
};

const findUserById = async (id) => {
  const user = await User.findById(id);
  return user;
};

module.exports = { findUserById, create };
