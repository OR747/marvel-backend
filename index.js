const express = require("express");

const axios = require("axios");
const md5 = require("md5");
const uid2 = require("uid2");
const apiKey = "086bfb5aedabc54ca6f8e87b2d96e917";
const privateKey = "8b5f0543135e28648f209bbe9a456954cf3ece84";

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

app.listen(3000, () => {
  console.log("Server started");
});
