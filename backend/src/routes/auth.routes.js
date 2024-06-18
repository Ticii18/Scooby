const express = require("express");
const path = require("path");
const { registerUser, login } = require("../controllers/auth.controller.js");

const router = express.Router();

router.get("/register", (req, res) => {
    res.sendFile(path.join(__dirname, '../../../Client/register.html'));
});

router.post("/register", registerUser);
router.post("/login", login);

module.exports = router;
