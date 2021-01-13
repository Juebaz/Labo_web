const mongoose = require("mongoose");
const { Schema } = mongoose;
const userSchema = new Schema({
// pas besoin de rien défénir car juste un id
});

const user = mongoose.model('User', userSchema);

module.exports = user;