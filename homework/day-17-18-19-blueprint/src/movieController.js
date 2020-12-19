/*
You DONT have to import the Movie with your username.
Because it's a default export we can nickname it whatever we want.
So import Movie from "./models"; will work!
You can do Movie.find() or whatever you need like normal!
*/
import Movie from "./models/Movie";

// Add your magic here!
export const home = async (req, res) => {
    try {
        const movies = await Movie.find({}).sort({ _id: -1 });
        res.render("movies", { pageTitle: "Home", movies });
    } catch (error) {
        console.log(error);
        res.render("movies", { pageTitle: "Home", movies: [] });
    }
};

export const searchMovie = async (req, res) => {
    try {
        const {
            query: { year, rating }
        } = req;
        if (year) {
            console.log(`year: ${year}`);
            const movies = await Movie.find().gt('year', year);
            res.render("movies", { pageTitle: `Filtering by year: ${year}`, movies });
        }
        else if (rating) {
            console.log(`rating: ${rating}`);
            const movies = await Movie.find().gt('rating', rating);
            res.render("movies", { pageTitle: `Filtering by rating: ${rating}`, movies });
        }
    } catch (error) {
        console.log(error);
        res.render("404", { pageTitle: "Sorry ERROR" });
    }
};

export const getCreateMovie = (req, res) =>
    res.render("create", { pageTitle: "Create" });

export const postCreateMovie = async (req, res) => {
    const {
        body: { title, year, rating, synopsis, genres }
    } = req;
    const newMovie = await Movie.create({
        title,
        year,
        rating,
        synopsis,
        genres: genres.split(',')
    });
    res.redirect(`/${newMovie.id}`);
};

export const movieDetail = async (req, res) => {
    const { params: { id } } = req;
    try {
        const movie = await Movie.findById(id);
        res.render("detail", { pageTitle: `${movie.title}`, movie });
    } catch (error) {
        console.log(error);
        res.render("404", { pageTitle: "Sorry ERROR" });
    }
};

export const getEditMovie = async (req, res) => {
    const {
        params: { id }
    } = req;
    try {
        const movie = await Movie.findById(id);
        res.render("editMovie", { pageTitle: `Edit ${movie.title}`, movie });
    } catch (error) {
        console.log(error);
        res.render("404", { pageTitle: "Sorry ERROR" });
    }
};


export const postEditMovie = async (req, res) => {
    const {
        params: { id },
        body: { title, year, rating, synopsis, genres }
    } = req;
    try {
        await Movie.findOneAndUpdate({ _id: id }, { title, year, rating, synopsis, genres: genres.split(",") });
        res.redirect(`/${id}`);
    } catch (error) {
        console.log(error);
        res.render("404", { pageTitle: "Sorry ERROR" });
    }
};


export const deleteMovie = async (req, res) => {
    const {
        params: { id }
    } = req;
    try {
        await Movie.findOneAndRemove({ _id: id });
        res.redirect("/");
    } catch (error) {
        console.log(error);
        res.render("404", { pageTitle: "Sorry ERROR" });
    }
};

