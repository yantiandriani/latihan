const db = require("../connect");

const getMarket = (req, res) => {
  const sql = "SELECT * FROM jenisBarang";
  db.query(sql, (error, result) => {
    jenisBarang = result; //mengkonversi hasil query  kedalam bentuk json.stringify
    if (error) throw error;
    if (req.session.user) {
      const sql = `SELECT * FROM user WHERE username = '${req.session.user.username}'`;
      db.query(sql, (error, result) => {
        if (error) throw error;
        const user = result[0];
        res.render("jenisBarang", { jenis: jenisBarang, user: user });
      });
    } else {
      res.render("jenisBarang", { jenis: jenisBarang, user: "" });
    }
  });
};

const tambahJenis = (req, res) => {
  const sql = `INSERT INTO jenisbarang(JenisBarang) VALUES ('${req.body.JenisBarang}')`;
  db.query(sql, (error, result) => {
    if (error) throw error;
    res.redirect("/");
  });
};

const hapusJenis = (req, res) => {
  const id = req.params.id_JenisBarang;
  const sql = "DELETE FROM jenisbarang WHERE id_JenisBarang = ?";
  db.query(sql, id, (error, result) => {
    if (error) throw error;
    res.redirect("back");
  });
};

const getBarang = (req, res) => {
  const id = req.params.id_JenisBarang;
  const sql = `SELECT * FROM barang WHERE id_JenisBarang = ${id}`;
  db.query(sql, (error, result) => {
    if (error) throw error;
    const barang = result1;
    const formatSaldo = (saldo) => {
      return saldo.toLocaleString("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
      });
    };
  });
};
    const sql2 = `SELECT * FROM barang JOIN transaksi ON barang.id_barang = transaksi.id_barang`;
    db.query(sql2, (error, result) => {
      const transaksi = JSON.parse(JSON.stringify(result));
      const sql3 = "SELECT SUM(total_harga) AS total FROM transaksi";
      db.query(sql3, (error, result) => {
        const total = JSON.parse(JSON.stringify(result));
        const uang = (rupiah) => {
          return rupiah.toLocaleString("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
          });
        };
        res.render("barang", {
          produk: barang,
          id: id,
          transaksi,
          total,
          uang,
          user : ""
        });
      });
    });
const tambahBar = (req, res) => {
  const image = req.file ? req.file.filename : null;
  const sql = `INSERT INTO barang(Nama_Barang, harga, id_jenisBarang, stock, new_stock, image) VALUES ('${req.body.NamaBarang}','${req.body.harga}','${req.body.id_JenisBarang}','${req.body.stock}', '${req.body.stock}', '${image}')`;
  db.query(sql, (error, result) => {
    if (error) throw error;
    res.redirect("back");
  });
};

const hapusBar = (req, res) => {
  const idBar = req.params.id_barang;
  const sqlBar = "DELETE FROM barang WHERE id_barang = ?";
  db.query(sqlBar, idBar, (error, result) => {
    if (error) throw error;
    res.redirect("back");
  });
};

const tambahTransaksi = (req, res) => {
  if(req.session.user) {
  const jumlah = req.body.jumlah;
  const total = req.body.total;
  const sql = `INSERT INTO transaksi(id_barang,jumlah,total_harga) VALUES ('${req.body.barang_id}','${jumlah}','${total}')`;
  db.query(sql, (error, result) => {
    if (error) throw error;
    const sql2 = `UPDATE barang SET new_stock = ${req.body.new_Stock} WHERE id_barang = ${req.body.barang_id}`;
    db.query(sql2, (error, result) => {
      if (error) throw error;
      res.redirect(`back`);
      console.log(sql, sql2);
    });
  });
} else {
  res.render('login',{pesan: "anda harus login,", clas:"danger"})
}
};

const cancel = (req, res) => {
  const sql = `UPDATE barang SET new_stock = ${req.body.stockBaru} WHERE id_barang = ${req.body.barang_id2}`;
  db.query(sql, (error, result) => {
    if (error) throw error;
    const sql2 = `DELETE FROM transaksi WHERE id_transaksi = ${req.body.id_transaksi}`;
    db.query(sql2, (error, result) => {
      if (error) throw error;
      res.redirect("back");
    });
  });
};

const editJenis = (req, res) => {
  const sql = `UPDATE jenisBarang SET JenisBarang = '${req.body.Jenis}' WHERE id_JenisBarang = ${req.body.id_jenis}`;
  db.query(sql, (error, result) => {
    if (error) throw error;
    res.redirect("back");
  });
};

const transaksi = (req, res) => {
  if (req.session.user) {
    const id = req.params.id;
    const sql2 = `SELECT * FROM barang JOIN transaksi ON transaksi.id_barang = barang.id_barang WHERE status = 0 AND id_user = ${req.session.user.id}`;
    db.query(sql2, (error, result) => {
      const transaksi = JSON.parse(JSON.stringify(result));
      const sql3 = "SELECT SUM(total_harga) AS total FROM transaksi JOIN barang ON transaksi.id_barang = barang_id_barang WHERE status = 0 AND id_user";
      db.query(sql3, (error, result) => {
        const total = JSON.parse(JSON.stringify(result));
      });
      const uang = (rupiah) => {
        return rupiah.toLocaleString("id-ID", {
          style: "currency",
          currency: "IDR",
          minimumFractionDigits: 0,
        });
      };
      res.render("transaksi", {
        jenis: barang,
        transaksi,
        total: total,
        uang,
        idJbar: id,
      });
    });
  } else {
    res.red
  }
};

const shop = (req, res) => {
  const id = req.params.id;
  const sql = `SELECT * FROM barang WHERE id_JenisBarang = ${id}`;
  db.query(sql, (error, result) => {
    const barang = JSON.parse(JSON.stringify(result));
    if (error) throw error;

    const uang = (rupiah) => {
      return rupiah.toLocaleString("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
      });
    };

    res.render("shop", {
      barang,
      id: id,

      uang,
    });
  });
};

// const formatSaldo = (saldo) => {
//   return saldo.toLocaleString("id-ID", {
//     style: "currency",
//     currency: "IDR",
//     minimumFractionDigits: 0,
//   });
// };
module.exports = {
  getMarket,
  tambahJenis,
  hapusJenis,
  getBarang,
  hapusBar,
  tambahBar,
  tambahTransaksi,
  cancel,
  editJenis,
  transaksi,
  shop,
  formatSaldo,
};
