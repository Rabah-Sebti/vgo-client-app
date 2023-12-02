const express = require("express");
const router = express.Router();
const {
  createAdress,
//   deleteAdress,
//   getAllAdresss,
//   updateAdress,
//   getAdress,
} = require("../controllers/adresss");
router.route("/").post(createAdress).get(getAllAdresss);
// router.route("/:id").get(getAdress).put(updateAdress).delete(deleteAdress);
module.exports = router;
