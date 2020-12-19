import { getMovieById, getMovies, addMovie } from "./db";

export const home = (req, res) =>
  res.render("movies", { movies: getMovies(), pageTitle: "Movies!" });

export const movieDetail = (req, res) => {
  const {
    params: { id }
  } = req;
  const movie = getMovieById(id);
  if (!movie) {
    res.render("404", { pageTitle: "Movie not found" });
  }
  return res.render("detail", { movie });
};

/*
Write the controller or controllers you need to render the form
and to handle the submission
*/

export const getAddMovie = (req, res) => {
  res.render("add", { pageTitle: "Add Movie" });
};

export const postAddMovie = async (req, res) => {
  const {
    body: { title, synopsis, genres }
  } = req;
  const arrGenres = genres.split(',');
  try {
    await addMovie({ title, synopsis, genres: arrGenres });
  } catch (error) {
    console.log(error);
  }
  res.redirect("/");
};