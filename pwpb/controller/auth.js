const db = require("../connect");
const bcrypt = require("bcrypt");

const login = (req, res) => {
  res.render("login", { clas: "", pesan: "" });
};
const register = (req, res) => {
  res.render("register", { clas: "", pesan: "" });
};

const registrasi = (req, res) => {
  const { username, password, pass_confirm } = req.body;
  const check = `SELECT * FROM user WHERE username = '${username}'`;
  db.query(check, (error, result) => {
    if (error) throw error;
    if (result.length > 0) {
      return res.render("register", {
        clas: "danger",
        pesan: "perasaan telah terdaftar, silahkan sadar posisi",
      });
    }
    if (password != pass_confirm) {
      return res.render("register", {
        clas: "danger",
        pesan: "effort anda beda",
      });
    }
    const min = 100000;
    const max = 99999;
    const token = Math.floor(Math.random() * (max - min + 1) + min);
    bcrypt.hash(password, 10, (errorhash, hash) => {
      const sql = `INSERT INTO user(username, password,token) VALUES ('${username}', '${hash}', '${token}')`;
      console.log(sql);
      db.query(sql, (error, result) => {
        res.render("register", {
          pesan: "registrasi berhasil",
          clas: "success",
        });
      });
    });
  });
};
const auth = (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.render("login", {
      pesan: "password dan username tidak boleh kosong!",
      clas: "danger",
    });
  }
  const query = `SELECT * FROM user WHERE username = '${username}'`;
  db.query(query, (error, result) => {
    if (error) throw error;
    if (result.length === 0) {
      return res.render("login", {
        pesan: "username tidak ditemukan",
        clas: "danger",
      });
    }
    const user = result[0];
    bcrypt.compare(password, user.password, (HashError, hash) => {
      if (HashError) throw HashError;
      if (!hash) {
        res.render("login", {
          pesan: "password anda tidak salah!",
          clas: "danger",
        });
      }
    });
      req.session.user = {
        id: user.id_user,
        username: user.username,
      };
      res.redirect("/");
    
  });
};

const logout = (req, res) => {
  req.session.destroy();
  res.render('login', {pesan:"anda telah logout", clas:"succes"});
}

module.exports = { login, register, registrasi, auth, logout};
