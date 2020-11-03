const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const blogSchema = new Schema({
	title:String,
	short_d:String,//description
	content:String,
	image:String,
	postedAt:String,
	tags:[String],
	category:String,
	comments:[{username:String,comment:String,time:"String"}]
});
module.exports = mongoose.model('blog', blogSchema, 'blogs');