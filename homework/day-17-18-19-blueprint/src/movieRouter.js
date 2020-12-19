import express from "express";
import { home, getCreateMovie, postCreateMovie, searchMovie, movieDetail, getEditMovie, postEditMovie, deleteMovie } from "./movieController";

const movieRouter = express.Router();

// Add your magic here!
movieRouter.get("/", home);
movieRouter
    .route("/create")
    .get(getCreateMovie)
    .post(postCreateMovie);
movieRouter.get("/search", searchMovie);
movieRouter.get("/:id", movieDetail);
movieRouter
    .route("/:id/edit")
    .get(getEditMovie)
    .post(postEditMovie);
movieRouter.get("/:id/delete", deleteMovie);

export default movieRouter;