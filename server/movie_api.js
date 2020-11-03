var mongoose = require("mongoose");
var fetch = require("node-fetch");
mongoose.connect("mongodb://localhost/blockbuster_movies");
var db = mongoose.connection;

exports.getMovies = async function getMovies() {
  const api_url =
    "https://api.themoviedb.org/3/movie/popular?api_key=1b789b5e91319b39c7e94f57d31c05d7&language=en-US&page=1";
  const image_url = "https://image.tmdb.org/t/p/w500";

  try {
    const response = await fetch(api_url);
    const json = await response.json();
    var i;
    var movies = [];
    for (i in json.results) {
      var movie_details = await getMovieDetails(json.results[i].id);
      var movie_cast = await getMovieCast(json.results[i].id);
      var movie_trailer = await getMovieTrailer(json.results[i].id);
      var movie_review = await getMovieReviews(json.results[i].id);
      var new_movie = {
        name: json.results[i].original_title,
        release_date: json.results[i].release_date,
        overview: json.results[i].overview,
        average_rating: json.results[i].vote_average,
        mainimage: image_url + json.results[i].poster_path,
        genres: movie_details["genre"],
        runtime: movie_details["run_time"],
        cast: movie_cast["cast"],
        director: movie_cast["director"],
        writers: movie_cast["writer"],
        producers: movie_cast["producer"],
        videos: movie_trailer["video"],
        reviews: movie_review["review"],
      };
      movies.push(new_movie);
    }
  } catch (error) {
    console.log(error);
  }

  db.collection("movies").insertMany(movies, function (err, res) {
    if (err) throw err;
    console.log("Number of documents inserted: " + res.insertedCount);
  });
};

async function getMovieDetails(id) {
  const api_url =
    "https://api.themoviedb.org/3/movie/" +
    id +
    "?api_key=1b789b5e91319b39c7e94f57d31c05d7&language=en-US";

  try {
    const response = await fetch(api_url);
    const json = await response.json();
    var i;
    var genre_list = "";
    for (i in json.genres) {
      genre_list += json.genres[i].name + " ";
    }
    var newObj = {
      genre: genre_list,
      run_time: json.runtime,
    };
    return newObj;
  } catch (error) {
    console.log(error);
  }
}

async function getMovieCast(id) {
  const api_url =
    "https://api.themoviedb.org/3/movie/" +
    id +
    "/credits?api_key=1b789b5e91319b39c7e94f57d31c05d7";
  const image_url = "https://image.tmdb.org/t/p/w500";
  try {
    const response = await fetch(api_url);
    const json = await response.json();
    var i;
    var producer_list = [];
    var writer_list = [];
    var movie_director = "";
    var cast_list = [];
    for (i in json.cast) {
      if (json.cast[i].profile_path == null) {
        var image_default = "https://i.ibb.co/0ZnWDZJ/765-default-avatar.png";
      } else {
        var image_default = image_url + json.cast[i].profile_path;
      }
      var cast_list_json = {
        cast_name: json.cast[i].name,
        cast_img: image_default,
        role: json.cast[i].character,
      };
      cast_list.push(cast_list_json);
    }
    for (i in json.crew) {
      if (json.crew[i].job == "Producer") {
        producer_list.push(json.crew[i].name);
      } else if (json.crew[i].department == "Writing") {
        writer_list.push(json.crew[i].name);
      } else if (json.crew[i].job == "Director") {
        movie_director = json.crew[i].name;
      }
    }

    var newObj = {
      cast: cast_list,
      producer: producer_list,
      writer: writer_list,
      director: movie_director,
    };
    return newObj;
  } catch (error) {
    console.log(error);
  }
}

async function getMovieTrailer(id) {
  const api_url =
    "https://api.themoviedb.org/3/movie/" +
    id +
    "/videos?api_key=1b789b5e91319b39c7e94f57d31c05d7";
  const image_url = "https://img.youtube.com/vi/";
  const youtube_url = "https://www.youtube.com/watch?v=";
  try {
    const response = await fetch(api_url);
    const json = await response.json();
    var video_list = [];
    var video_list_json = {
      vid_name: json.results[0].name,
      vid_img: image_url + json.results[0].key + "/sddefault.jpg",
      vid_link: youtube_url + json.results[0].key,
    };
    video_list.push(video_list_json);

    var newObj = {
      video: video_list,
    };
    return newObj;
  } catch (error) {
    console.log(error);
  }
}
async function getMovieReviews(id) {
  const api_url =
    "https://api.themoviedb.org/3/movie/" +
    id +
    "/reviews?api_key=1b789b5e91319b39c7e94f57d31c05d7";
  try {
    const response = await fetch(api_url);
    const json = await response.json();
    var review_list = [];
    for (i in json.results) {
      var review_list_json = {
        ratings: Math.floor(Math.random() * 6 + 5),
        username: json.results[0].author,
        rev_desc: json.results[0].content,
      };
      review_list.push(review_list_json);
    }

    var newObj = {
      review: review_list,
    };
    return newObj;
  } catch (error) {
    console.log(error);
  }
}
