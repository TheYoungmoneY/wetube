import express from "express";
import path from "path";
import "./db";
import movieRouter from "./movieRouter";
import { localsMiddlewares } from "./middlewares";

const app = express();
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
app.use(localsMiddlewares);
app.use("/", movieRouter);

// Codesanbox does not need PORT :)
// app.listen(() => console.log(`✅  Server Ready!`));
const PORT = process.env.PORT || 4000;
const handleListening = () => { console.log(`Listening on: http://localhost:${PORT}`) };

app.listen(PORT, handleListening);