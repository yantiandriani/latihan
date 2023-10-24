var express = require("express");
var app = "express";
var bodyparser = require("body-parser");
var router = require("./router/router.js");
const path = require("path");
const session = require ('express-session');
const db = require("./connect");
const MySQLStore = require('express-mysql-session')(session);
//fungsinya untuk menjalankan req.body
var app = express();
const port = 8000;
app.use(bodyparser.json());
//fungsinya untuk menjalankan post
app.use(bodyparser.urlencoded({ extended: true }));
const sessionStore = new MySQLStore({
  expiration: 24*60*60*1000,
  clearExpired: true,
  createDatabaseTable: true,
},
db
);
app.use(session({
  secret:"naonwe/key",
  store: sessionStore,
  resave: true,
  saveUninitialized: true,
}))

app.set("view engine", "ejs");
app.set("views", "view");
//berfungsi untuk menghubungkan folder dengan folder public dan untuk mengakses folder public
app.use(express.static(path.join(__dirname, "public")));
setHeaders: (res, path) => {
  //jika filenya berakhir dengan css maka atur header dengan content type, jika berakhir dengan js maka
  if (path.endsWith(".css")) {
    res.setHeader("content-type", "text/css");
  } else if (path.endsWith(".js")) {
    res.setHeader("content-type", "application/javascript");
  }
};

app.use(router);

app.listen(port, () => {
  console.log("server telah berjalan");
});
