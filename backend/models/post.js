const mongoose = require("mongoose");


//create a schema , or a blue print

const postSchema = mongoose.Schema({
  title: { type: String, required: true}, //note: nodejs and JS is String
  content: { type: String, required: true},
  imagePath: { type: String, required: true}
});
//with the schema, we need a model to be able to use it

//model
module.exports = mongoose.model("Post", postSchema);
