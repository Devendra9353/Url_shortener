import express from "express";
import mongoose from "mongoose";
import { getOriginalUrl, shortUrl } from "./controllers/url.js";
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set("view engine", "ejs");
mongoose
  .connect(
    "mongodb+srv://devu935352:A5eidBqmrtUKFoyo@cluster0.ocvoeco.mongodb.net/?tlsAllowInvalidCertificates=true",
    { dbName: "url_shortener" }
  )
  .then(() => {
    console.log(`connected successfully`);
  })
  .catch((err) => console.log("error", err));

app.get("/", (req, res) => {
  res.render("index.ejs", { shortUrl: null });
  console.log(req.body);
});
app.post("/short", shortUrl);
app.get('/:shortCode',getOriginalUrl)
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
});
