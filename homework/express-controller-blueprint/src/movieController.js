import {
  getMovieById,
  getMovies,
  getMovieByMinimumRating,
  getMovieByMinimumYear
} from "./db";

export const home = async (req, res) => {
  try {
    const videos = await getMovies({});
    res.render("movie", { pageTitle: "Movies", videos });
  } catch (error) {
    console.log(error);
    res.render("404");
  }
};

export const movieDetail = async (req, res) => {
  const {
    params: { id }
  } = req;
  try {
    const video = await getMovieById(id);
    const genres = video.genres;
    res.render("detail", { pageTitle: "Video Detail", video, genres });
  } catch (error) {
    console.log(error);
    res.render("404");
  }
};
export const filterMovie = async (req, res) => {
  try {
    const {
      query: { year, rating }
    } = req;
    if (year) {
      console.log(`year: ${year}`);
      const videos = await getMovieByMinimumYear(parseInt(year));
      res.render("movie", { pageTitle: `Searching by year: ${year}`, videos });
    }
    else if (rating) {
      console.log(`rating: ${rating}`);
      const videos = await getMovieByMinimumRating(parseInt(rating));
      res.render("movie", { pageTitle: `Searching by rating: ${rating}`, videos });
    }
  } catch (error) {
    console.log(error);
    res.render("404");
  }
};