const express = require("express"); // express 모듈을 가져와서
const app = express(); // 새로운 express앱을 생성
const port = 8080;

app.get("/", (req, res) => res.send("Index.js"));

app.listen(port, () => console.log(`Example app listenint on port ${port}!`));