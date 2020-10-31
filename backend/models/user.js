const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true},
  //unique doesnt validate, but it allows mongoose and MongoDB
  // to do some optimization
  password: { type: String, required: true},
});

userSchema.plugin(uniqueValidator);
//model
module.exports = mongoose.model("User", userSchema);
