// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require("express");
var app = require("express")();
var http = require("http").createServer(app);
var io = require("socket.io")(http);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

io.on("connection", socket => {
  console.log("user connected");
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});
io.on("connection", socket => {
  socket.on("chat message", msg => {
    console.log("user > " + msg);
  });
});
io.on("connection", socket => {
  socket.on("chat message", msg => {
    io.emit("chat message", msg);
  });
});

http.listen(3000, () => {
  console.log("listening on *:3000");
});
