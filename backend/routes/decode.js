var express = require("express");
var router = express.Router();
var jwt = require("jsonwebtoken");
const secret = require("../authsecret/secret");

router.get("/", function(req, res) {
    const tokenM = req.headers.authorization;

    const token = tokenM.substring(7);
    const decoded = jwt.verify(token, secret);
    console.log(decoded);
    res.json(decoded);
});

module.exports = router;