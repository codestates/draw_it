const cors = require("cors");
const express = require("express");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended : false }));
app.use(cors());

app.get("/", (req, res) => {
  res.status(200).send("Draw it");
});

const HTTP_PORT = process.env.HTTP_PORT || 4000;

app.listen(HTTP_PORT, () => {
  console.log(`server is running on ${HTTP_PORT}`);
});