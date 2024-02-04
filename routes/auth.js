const express = require("express");
const router = express.Router();
const { authRegister, authLogin } = require("../controllers/auth.js");
router.post("/register", authRegister);
router.post("/login", authLogin);

module.exports = router;
