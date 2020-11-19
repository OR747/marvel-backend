const express = require("express");

const axios = require("axios");
const md5 = require("md5");
const uid2 = require("uid2");
require("dotenv").config();
const apiKey = process.env.PUBLIC_KEY;
const privateKey = process.env.PRIVATE_KEY;

const app = express();

app.get("/characters", async (req, res) => {
  try {
    const ts = uid2(8);
    const hash = md5(ts + privateKey + apiKey);
    console.log("coco");
    const response = await axios.get(
      `http://gateway.marvel.com/v1/public/characters?ts=${ts}&apikey=${apiKey}&hash=${hash}`
    );
    console.log("requete");
    return res.json(response.data);
  } catch (error) {
    return res.status(400).json(error.message);
  }
});
app.get("/characters/:id", async (req, res) => {
  try {
    const id = req.params.id;
    //const id = 1011334;
    const ts = uid2(8);
    console.log(ts);
    const hash = md5(ts + privateKey + apiKey);
    console.log("before");

    const response = await axios.get(
      `http://gateway.marvel.com/v1/public/characters/${id}?ts=${ts}&apikey=${apiKey}&hash=${hash}`
    );
    console.log(response.data);

    return res.json(response.data);
  } catch (error) {
    return res.status(403).json(error.message);
  }
});

app.get("/comics", async (req, res) => {
  try {
    const ts = uid2(8);

    const hash = md5(ts + privateKey + apiKey);

    const response = await axios.get(
      `http://gateway.marvel.com/v1/public/comics?ts=${ts}&apikey=${apiKey}&hash=${hash}`
    );
    //console.log(response.data);

    return res.json(response.data);
  } catch (error) {
    return res.status(403).json(error.message);
  }
});

app.all("*", (req, res) => {
  res.status(404).json({ message: error.message });
});

app.listen(process.env.PORT, () => {
  console.log(`Server Started on port ${process.env.PORT}`);
});
