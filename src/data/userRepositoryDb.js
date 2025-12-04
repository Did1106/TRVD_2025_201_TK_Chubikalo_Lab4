const User = require('../models/User');

async function getAll() {
  return await User.find().lean();
}

async function getById(id) {
  return await User.findById(id).lean();
}

async function getByEmail(email) {
  return await User.findOne({ email }).lean();
}

async function create(userData) {
  const user = new User(userData);
  await user.save();
  return user.toObject();
}

async function update(id, data) {
  return await User.findByIdAndUpdate(id, data, { new: true }).lean();
}

async function remove(id) {
  await User.findByIdAndDelete(id);
}

module.exports = {
  getAll,
  getById,
  getByEmail,
  create,
  update,
  remove
};
