const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const celebSchema = new Schema({
  name: String,
  age: Number,
  country: String,
  description: String,
  profession: String,
  mainimage: String,
  height: String,
  dob: String,
  biography: String,
  keywords: [String],
  images: [String],
  videos: [{ title: String, link: String }],
  films: [String],
});
module.exports = mongoose.model("celeb", celebSchema, "celebs");
