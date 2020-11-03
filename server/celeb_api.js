var mongoose = require("mongoose");
var fetch = require("node-fetch");
mongoose.connect("mongodb://localhost/blockbuster_movies");
var db = mongoose.connection;

exports.getCelebrities = async function getCelebrities() {
  const api_url =
    "https://api.themoviedb.org/3/person/popular?api_key=1b789b5e91319b39c7e94f57d31c05d7&language=en-US&page=1";
  const image_url = "https://image.tmdb.org/t/p/w500";
  try {
    const response = await fetch(api_url);
    const json = await response.json();
    var i;
    var celebrities = [];
    var known_for_list = [];
    for (i in json.results) {
      for (j in json.results[i].known_for) {
        known_for_list.push(json.results[i].known_for[j].title);
      }
      var celebrity_details = await getCelebrityDetails(json.results[i].id);
      var celebrity_images = await getCelebrityImages(json.results[i].id);

      var new_celebrity = {
        name: celebrity_details["name"],
        age: celebrity_details["age"],
        country: celebrity_details["place_of_birth"],
        description: fn(celebrity_details["biography"], 150),
        mainimage: image_url + celebrity_details["profile_path"],
        profession: json.results[i].known_for_department,
        dob: celebrity_details["birthday"],
        biography: celebrity_details["biography"],
        height: "-",
        films: known_for_list,
        images: celebrity_images["images"],
      };
      celebrities.push(new_celebrity);
    }
  } catch (error) {
    console.log(error);
  }

  db.collection("celebs").insertMany(celebrities, function (err, res) {
    if (err) throw err;
    console.log("Number of documents inserted: " + res.insertedCount);
  });
};

async function getCelebrityDetails(id) {
  const api_url =
    "https://api.themoviedb.org/3/person/" +
    id +
    "?api_key=1b789b5e91319b39c7e94f57d31c05d7&language=en-US";

  try {
    const response = await fetch(api_url);
    const json = await response.json();
    var newObj = {
      name: json.name,
      age: getAge(json.birthday),
      birthday: json.birthday,
      known_for_department: json.known_for_department,
      biography: json.biography,
      place_of_birth: json.place_of_birth,
      profile_path: json.profile_path,
    };
    return newObj;
  } catch (error) {
    console.log(error);
  }
}

async function getCelebrityImages(id) {
  const api_url =
    "https://api.themoviedb.org/3/person/" +
    id +
    "/images?api_key=1b789b5e91319b39c7e94f57d31c05d7&language=en-US";
  const image_url = "https://image.tmdb.org/t/p/w500";
  try {
    const response = await fetch(api_url);
    const json = await response.json();
    var images_list = [];
    for (i in json.profiles) {
      images_list.push(image_url + json.profiles[i].file_path);
    }
    var newObj = {
      images: images_list,
    };
    return newObj;
  } catch (error) {
    console.log(error);
  }
}

function getAge(dateString) {
  var today = new Date();
  var birthDate = new Date(dateString);
  var age = today.getFullYear() - birthDate.getFullYear();
  var m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}
function fn(text, count) {
  return text.slice(0, count) + (text.length > count ? "..." : "");
}
