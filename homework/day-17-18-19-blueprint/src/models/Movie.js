import mongoose from "mongoose";

/*
PLEASE ADD YOUR USERNAME IN THIS LINE.
ALL THE MODELS YOU WILL CREATE WILL HAVE YOUR USERNAME APPENDED TO THEM
SO YOU CAN SEARCH / ADD / EDIT / DELETE YOUR DOCUMENTS ONLY.
PLEASE FOLLOW THIS STEP
WE NEED TO SHARE THE SAME DB SO NICO CAN CHECK OUT EVERYBODYS PROJECT.
*/
const YOUR_USERNAME = "youngmi9347";

const MovieSchema = mongoose.Schema({
  // HERE YOU HAVE TO CREATE AND COMPLETE THE MOVIE SCHEMA
  // id: {
  //   type: String,
  //   // type: Schema.ObjectId,
  //   required: "ID is required"
  //   // ref: "Movie"
  // },
  title: {
    type: String,
    required: "Title is required",
    validate: [
      function (title) {
        return title.length >= 3;
      },
      "Title should be longer"
    ]
  },
  year: {
    type: Number,
    required: "Year is required",
    default: 2020
  },
  rating: {
    type: Number,
    required: "Rating is required",
    default: 0
  },
  synopsis: {
    type: String,
    required: "Synopsis is required"
  },
  genres: {
    type: Array,
    required: "Genres required"
  },
  createdAt: {
    type: Date,
    required: "createdAt is required",
    default: Date.now
  }
});

if (YOUR_USERNAME === null || typeof YOUR_USERNAME !== "string") {
  /*
  PLEASE ADD YOUR USERNAME ON THE LINE 10
  THIS LINE WILL REMIND YOU IF YOU HAVEN'T ADDED IT
  PLEASE DONT REMOVE THIS LINE
  */
  throw Error(
    "❌  Please add your username in the line 10 of models/Movie.js  ❌"
  );
}

if (YOUR_USERNAME.includes("@")) {
  throw Error("❌  Please remove the @ from your username  ❌");
}

const model = mongoose.model(`Movie_${YOUR_USERNAME}`, MovieSchema);

export default model;


