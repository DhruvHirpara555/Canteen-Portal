var express = require("express");
var router = express.Router();
var jwt = require("jsonwebtoken");
const saltRounds = 10;
const secret = require("../authsecret/secret");
const {User} = require("../models/Users");
const {Buyer} = require("../models/Users");
const {Vendor} = require("../models/Users");


// GET request
//

router.get("/", async (req, res) => {
    const token = req.body.token
    const decoded = jwt.verify(token, secret);
    console.log(decoded);
    const user = await User.findById(decoded.userId);

    if (decoded.type === "buyer") {
        const buyer = await Buyer.findById(decoded.buyerId);
        console.log(user);
        console.log(buyer);
        const response = {
            user : user,
            type : decoded.type,
            age : buyer.age,
        }

        res.json(response);
    }
    else if (decoded.type === "vendor"){
        const vendor = await Vendor.findById(decoded.vendorId);
        console.log(user);
        console.log(vendor);

        const response = {
            user : user,
            type : decoded.type,
            vendor : vendor
        }

        res.json(response);

    }
});

module.exports = router;


