import express from "express";
import path from "path";
import bodyParser from "body-parser";
import multer from "multer";
import fs from "fs";


const multerFile = multer({ dest: "uploads/" })
export const uploadFile = multerFile.single("txtFile");

const app = express();
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(uploadFile);

export const home = (req, res) => {
    res.render("home");
};
export const handleGet = (req, res) =>
    res.render("read", { pageTitle: "Upload" });

export const handlePost = (req, res) => {
    const {
        file: { path }
    } = req;
    const newFile = fs.readFileSync(`${path}`, 'utf8');
    console.log(newFile);
    res.render("read", { newFile });
};

app.get("/", home);
app.get("/read", handleGet);
app.post("/read", handlePost);

// Codesanbox does not need PORT :)
app.listen(4000, () => console.log(`Listening!`));



