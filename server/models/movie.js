const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const movieSchema = new Schema({
	name: String,
	release_date: String,
	overview: String,
	average_rating: String,
	reviews:[{
		ratings:Number,
		date:String,
		username:String,
		review:String,
		rev_desc:String
	}],
	cast:[{
		cast_name:String,
		cast_img:String,
		role:String
	}],
	mainimage:String,
	director:String,
	writers:[String],
	producers:[String],
	genres:String,
	runtime:String,
	keywords:[String],
	images:[String],
	videos:[{
		vid_name:String,
		vid_img:String,
		vid_link:String
	}]
});
module.exports = mongoose.model('movie', movieSchema, 'movies');
