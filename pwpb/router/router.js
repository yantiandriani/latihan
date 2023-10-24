var express = require("express");
let router = express.Router();
const multer = require("multer");
const {register, registrasi, login, auth, logout} = require("../controller/auth") 

const {
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
  shop
} = require("../controller/market.js");


const storage = multer.diskStorage({
  destination:function(req, file, cb){
    cb(null, './public/uploads')
  },
filename: function(req, file, cb) {
  cb(null, file.originalname)
}
})
const upload = multer({storage});
router.get("/", getMarket);
router.get("/hapusJenis/:id_JenisBarang", hapusJenis);
router.get("/pilih/:id_JenisBarang", getBarang);
router.get("/pilih/:id_JenisBarang", getBarang);
router.get("/hapusBar/:id_barang", hapusBar);
router.get("transaksi", transaksi);
router.get("/shop/:id", shop);
router.get("/register", register);
router.get("/login", login);
router.get("/logout", logout);

router.post("/tambahJenisBarang", tambahJenis);
router.post("/tambahBarang", upload.single('photo'),tambahBar);
router.post("/tambahTransaksi", tambahTransaksi);
router.post("/cancelTransaksi", cancel);
router.post("/editJenis", editJenis);
router.post("/registrasi", registrasi);
router.post("/auth", auth)
module.exports = router;
