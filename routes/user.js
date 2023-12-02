const express = require("express");
const {
  getUsers,
  getUsersGeo,
  myAccount,
  createAdress,
  getAdresses,
  createPaymentCard,
  getPaymentCards,
  updateUser,
} = require("../controllers/users");
const router = express.Router();
router.route("/").get(getUsers);
router.route("/geography").get(getUsersGeo);
router.route("/myAccount").get(myAccount);
router.route("/adress").post(createAdress);
router.route("/adresses").get(getAdresses);
router.route("/paymentCard").post(createPaymentCard);
router.route("/paymentCards").get(getPaymentCards);
router.route("/edit").put(updateUser);
module.exports = router;
