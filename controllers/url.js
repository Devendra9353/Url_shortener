import { Url } from "../models/url.js";
import shortid from "shortid";
import dotenv from "dotenv";
dotenv.config();
export const shortUrl = async (req, res) => {
  const longUrl = req.body.longUrl;
  // console.log(longUrl);
  const shortCode = shortid.generate();
  const shortUrl = `${process.env.BASE_URL}/${shortCode}`;

  //save in db

  //both methods 1st one to add in DB
  // try {
  //   let user = await Url.create({ shortCode, longUrl });
  //   user.save();
  // } catch (error) {
  //   console.log(error);
  // }

  //both methods 2nd one to add in DB
  const newUrl = new Url({ shortCode, longUrl });
  await newUrl.save();
  console.log(newUrl);
  res.render("index.ejs", { shortUrl });
};

export const getOriginalUrl = async (req, res) => {
  const shortCode = req.params.shortCode;
  const originalUrl = await Url.findOne({ shortCode });
  console.log(originalUrl);
  if (originalUrl) res.redirect(originalUrl.longUrl);
  else {
    res.json({ message: "invalid Short" });
  }
};
