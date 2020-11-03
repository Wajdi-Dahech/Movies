var mongoose = require('mongoose');

var profile_schema = mongoose.Schema({
	fname:{
		type:String,
		required:false
	},
	lname:{
		type:String,
		required:false
	},
	username:{
		type:String,
		required:true
	},
	email:{
		type:String,
		required:true,
		unique:true
	},
	dob:{
		type:Date,
		required:false
	},
	password:{
		type:String,
		required:true
	}

});
var Profile = module.exports = mongoose.model('profile', profile_schema);