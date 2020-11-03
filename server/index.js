var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var path = require("path");
var cors = require("cors");
var fetch = require("node-fetch");
mongoose.connect("mongodb://localhost/blockbuster_movies");
var db = mongoose.connection;
var movies_api = require("./movie_api");
var celebrities_api = require("./celeb_api");

db.on("open", () => {
  console.log("Connected to DB");
});

db.on("error", (err) => {
  console.log(err);
});

var app = express();

var Profile = require("./models/profile");
var Movie = require("./models/movie");
var Celeb = require("./models/celeb");
var Blog = require("./models/blog");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors());

app.post("/sign_up", (req, res) => {
  var new_profile = {
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  };
  Profile.create(new_profile, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
      res.status(200).send({ msg: "Profile Created" });
    }
  });
});

app.post("/login", (req, res) => {
  var username = req.body.username;
  var password = req.body.password;
  Profile.find(
    { username: username, password: password },
    (err, profile_details) => {
      if (err) {
        console.log(err);
      } else {
        console.log(profile_details);
        res.status(200).send({
          profile_details: profile_details[0],
        });
      }
    }
  );
});

app.get("/profile/:id", (req, res) => {
  var userId = req.params.id;
  Profile.find({ _id: userId }, (err, details) => {
    if (err) {
      console.log(err);
    } else {
      if (Object.keys(details).length == 1) {
        if (typeof details[0].dob != "undefined") {
          var year = details[0].dob.getFullYear().toString();
          var month = (details[0].dob.getMonth() + 1).toString();
          var date = details[0].dob.getDate().toString();
          if (month.length == 1) {
            month = "0" + month;
          }
          if (date.length == 1) {
            date = "0" + date;
          }
          var birth_date = year + "-" + month + "-" + date;
        } else {
          var birth_date = "";
        }
        // console.log(birth_date);
        var profile_details = {
          username: details[0].username,
          fname: details[0].fname,
          lname: details[0].lname,
          email: details[0].email,
          dob: birth_date,
        };
        res.status(200).send({ profile_details: profile_details });
      } else {
        console.log(details);
        console.log("Error!! Invalid Email..");
      }
    }
  });
});

app.put("/profile", (req, res) => {
  var profile_details = {};
  profile_details.username = req.body.username;
  profile_details.email = req.body.email;
  profile_details.fname = req.body.fname;
  profile_details.lname = req.body.lname;
  profile_details.dob = req.body.dob;

  var query = { _id: req.body.userId };

  Profile.updateOne(query, profile_details, (err) => {
    if (err) {
      console.log(err);
    } else {
      res.status(200).send({ msg: "Profile Updated Successfully.." });
    }
  });
});

app.put("/profile/password", (req, res) => {
  var query = { _id: req.body.userId };
  Profile.find(
    { _id: req.body.userId, password: req.body.oldpassword },
    (err, profile_details) => {
      if (err) {
        console.log(err);
      } else {
        console.log(profile_details);
        if (profile_details.length == 1) {
          var new_password = { password: req.body.newpassword };
          Profile.updateOne(query, { $set: new_password }, (err, result) => {
            if (err) {
              console.log(err);
            } else {
              console.log(result);
              res.status(200).send({ msg: "Password Changed Successfully.." });
            }
          });
        } else {
          res.send({ msg: "Incorrect password" });
        }
      }
    }
  );
});

app.get("/movies", (req, res) => {
  Movie.find((err, movies) => {
    if (err) {
      console.log(err);
    } else {
      if (movies.length == 0) {
        movies_api.getMovies();
        res.send({ movie_list: movies });
      } else {
        res.send({ movie_list: movies });
      }
    }
  });
});

app.get("/movie/:id", function (req, res) {
  const mid = req.params.id;
  Movie.find({ _id: mid }).exec(function (err, movie) {
    if (err) {
      console.log("Error " + err);
    } else {
      res.json(movie);
    }
  });
});

app.put("/review", (req, res) => {
  var userId = req.body.userId;
  var movieId = req.body.movieId;
  var rating = req.body.rating;
  var short_rev = req.body.short_rev;
  var long_rev = req.body.review;
  var movie;
  var username = "";
  review_list = [];
  Movie.find({ _id: movieId }, (err, movie_list) => {
    if (err) {
      console.log(err);
    } else {
      movie = movie_list[0];
      Profile.find({ _id: userId }, (err, userDetails) => {
        if (err) {
          console.log(err);
        } else {
          username = userDetails[0].username;
          console.log(movie.reviews.length);
          for (var i = 0; i < movie.reviews.length; i++) {
            review_list.push({
              username: movie.reviews[i].username,
              ratings: movie.reviews[i].ratings,
              date: movie.reviews[i].date,
              review: movie.reviews[i].review,
              rev_desc: movie.reviews[i].rev_desc,
            });
            console.log(review_list);
          }
          review_list.push({
            username: username,
            ratings: rating,
            date: new Date().toLocaleDateString(),
            review: short_rev,
            rev_desc: long_rev,
          });
          console.log(review_list);
          new_review_list = { reviews: review_list };
          Movie.updateOne(
            { _id: movieId },
            { $set: new_review_list },
            (err, result) => {
              if (err) {
                console.log(err);
              } else {
                console.log(result);
                res.status(200).send({ msg: "Review Posted Successfully.." });
              }
            }
          );
        }
      });
    }
  });
});

app.get("/allcelebs", function (req, res) {
  Celeb.find({}).exec(function (err, celebs) {
    if (err) {
      console.log(err);
    } else {
      if (celebs.length == 0) {
        celebrities_api.getCelebrities();
        res.send(celebs);
      } else {
        res.send(celebs);
      }
    }
  });
});

app.get("/celeb", function (req, res) {
  const cid = req.query.celebid;
  Celeb.find({ _id: cid }).exec(function (err, celeb) {
    if (err) {
      console.log("Error " + err);
    } else {
      res.json(celeb);
    }
  });
});

app.get("/allblogs", function (req, res) {
  Blog.find({}).exec(function (err, blogs) {
    if (err) {
      console.log("Error " + err);
    } else {
      res.send(blogs);
    }
  });
});

app.get("/blog", function (req, res) {
  const bid = req.query.blogid;
  Blog.find({ _id: bid }).exec(function (err, blog) {
    if (err) {
      console.log("Error " + err);
    } else {
      res.json(blog);
    }
  });
});

app.put("/comment", (req, res) => {
  var userId = req.body.userId;
  var blogId = req.body.blogId;
  var comment = req.body.comment;
  var blog;
  var username = "";
  comment_list = [];
  Blog.find({ _id: blogId }, (err, blog_list) => {
    if (err) {
      console.log(err);
    } else {
      blog = blog_list[0];
      Profile.find({ _id: userId }, (err, userDetails) => {
        if (err) {
          console.log(err);
        } else {
          username = userDetails[0].username;
          console.log(blog.comments.length);
          for (var i = 0; i < blog.comments.length; i++) {
            comment_list.push({
              username: blog.comments[i].username,
              comment: blog.comments[i].comment,
              time: blog.comments[i].time,
            });
            console.log(comment_list);
          }
          comment_list.push({
            username: username,
            comment: comment,
            time: new Date().toLocaleDateString(),
          });
          console.log(comment_list);
          new_comment_list = { comments: comment_list };
          Blog.updateOne(
            { _id: blogId },
            { $set: new_comment_list },
            (err, result) => {
              if (err) {
                console.log(err);
              } else {
                console.log(result);
                res.status(200).send({ msg: "Comment Posted Successfully.." });
              }
            }
          );
        }
      });
    }
  });
});

app.listen(3000, () => {
  console.log("Server Running on Port 3000..");
});
