const express = require("express");
const crypto = require("crypto");
const app = express();
const port = 3000;
const clickCount = {};
const salt = "secret-key";

app.get("/shorten", (req, res) => {
  const url = req.query.url;

  if (!url) {
    return res.status(404).json({ error: "Missing URL" });
  }
  const hash = crypto
    .createHash("sha256")
    .update(req.originalUrl + salt)
    .digest("hex");

  const shortUrl = `https://example.com/${hash}`;

  clickCount[shortUrl] = 0;
  res.send({ shortUrl });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));