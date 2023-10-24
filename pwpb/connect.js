var mysql = require("mysql");
var db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "market_yanti_xiirpl2",
});

db.connect(function (error) {
  if (error) throw error;
  console.log("conect");
});
module.exports = db;
