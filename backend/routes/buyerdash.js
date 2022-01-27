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

router.get("/", function (req, res) {
    const decoded = decodeToken(req.headers.authorization.substring(7));
    if(decoded.type === "buyer")
    {
        Fooditem.find().populate("vendor")
        .then(fooditems => {
            res.send(fooditems);
        })
        .catch(err => {
            res.send(err);
        })

    }
})

router.get("/money", function (req,res) {
    const decoded = decodeToken(req.headers.authorization.substring(7));
    Buyer.findById(decoded.buyerId)
    .then(buyer => {
        res.send({
            wallet : buyer.wallet
        })
    })
    .catch(err => {
        res.send(err);
    }
    )
})

router.post("/addmoney", function (req, res) {
    const decoded = decodeToken(req.headers.authorization.substring(7));
    if(decoded.type === "buyer")
    {
        Buyer.findOneAndUpdate({_id: decoded.buyerId}, {$inc: {wallet: req.body.amount}})
        .then(user => {

            res.send(user);
        })
        .catch(err => {
            res.send(err);
        })
    }
})

router.post("/orderfood", async function (req,res) {
    const decoded = decodeToken(req.headers.authorization.substring(7));
    console.log(decoded)
    if(decoded.type === "buyer")
    {
        const fooditem = await Fooditem.findById(req.body.fooditem);
        const user  = await User.findById(decoded.userId).populate("buyer");

        const price = parseInt(fooditem.price * req.body.quantity)
        console.log(price)
        if(user.buyer.wallet >= price){

            await Buyer.updateOne({_id: decoded.buyerId}, {$inc: {wallet: -price}})

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
        else{

            res.send("Insufficient Balance");
        }
    }
})


module.exports = router;