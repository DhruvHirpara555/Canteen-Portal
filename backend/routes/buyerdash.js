var express = require("express");
var router = express.Router();
var jwt = require("jsonwebtoken");
const saltRounds = 10;
const secret = require("../authsecret/secret");
const {User} = require("../models/Users");
const {Buyer} = require("../models/Users");
const {Vendor} = require("../models/Users");
const Fooditem = require("../models/Fooditem");
const Order = require("../models/orders");


function decodeToken(token) {
    return jwt.verify(token, secret);
}


router.post("/orderfood", async function (req,res) {
    const decoded = decodeToken(req.headers.authorization.substring(7));
    console.log(decoded)
    if(decoded.type === "buyer")
    {
        const order = new Order({
            fooditem: req.body.fooditem,
            quantity: req.body.quantity,
            buyer: decoded.userId,
            vendor: req.body.vendor
        });
        order.save().then(order => {
            res.send(order);
        }).catch(err => {
            res.send(err);
        }
        );
    }
})


module.exports = router;