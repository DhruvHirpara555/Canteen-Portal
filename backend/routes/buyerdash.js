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

function isAvailable(opening,closing){
    const currentTime = new Date();
    const currentHour = parseInt(currentTime.getHours());
    const currentMinute = parseInt(currentTime.getMinutes());
    const curr = currentHour*60 + currentMinute;
    console.log(curr);
    console.log(opening);
    console.log(closing);
    if(opening < closing){
        if(curr >= opening && curr <= closing){
            return true;
        }
        else{
            return false;
        }
    }
    else{
        if(curr >= opening || curr <= closing){
            return true;
        }
        else{
            return false;
        }
    }
}

router.get("/", async function (req, res) {
    const decoded = await decodeToken(req.headers.authorization.substring(7));
    if(decoded.type === "buyer")
    {
        const buyer = await Buyer.findOne({_id: decoded.buyerId});
        var response  = {
            status: "",
            available: [],
            unavailable: [],
            avafav: [],
            unavafav: [],
            tags: [],
            vendors: []
        }
        var tags = [];
        var vendors = []


        const foodlist = await Fooditem.find().populate("vendor");
        console.log(foodlist);


        foodlist.forEach(fooditem => {
            console.log(fooditem.vendor);
            vendors.push(fooditem.vendor.shopname);
            tags.push(fooditem.tags);
            if(isAvailable(fooditem.vendor.openingtime,fooditem.vendor.closingtime)){
                response.available.push(fooditem);
                if(buyer.favourites.includes(fooditem._id)){
                    response.avafav.push(fooditem._id);
                }
            }
            else{
                response.unavailable.push(fooditem);
                if(buyer.favourites.includes(fooditem._id)){
                    response.unavafav.push(fooditem._id);
                }
            }
        });
        response.tags = [...new Set(tags.flat())];
        response.vendors = [...new Set(vendors)];

        response.status = "success";
        console.log(response);
        return (res.send(response));

    }
    return (res.send("Invalid request"));
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

router.post("/rate", async function(req,res) {
    const decoded = decodeToken(req.headers.authorization.substring(7));
    if(decoded.type === "buyer")
    {
        // const vendor = await Vendor.findOne({_id: req.body.vendorId});
        const order = await Order.findOne({_id: req.body.orderId});

        const orderrate = await Order.updateOne({_id: req.body.orderId}, {$set: {rating: req.body.rating}})

        //const count = await Order.count({vendor: req.body.vendorId, rating: {$gt: 0}})
        const rating = await Order.aggregate([
            {$match: {fooditem: order.fooditem, rating: {$gt: 0}}},
            {$group: {_id: null, avg: {$avg: "$rating"}}}
        ])

        const foodrate = await Fooditem.updateOne({_id: order.fooditem}, {$set: {rating: rating[0].avg}})
        // const food =  await Fooditem.findOne({_id: order.fooditem});
        // console.log(food);
        // console.log(rating);
        res.send({
            status: "success",
            rating: rating[0].avg,
            orderrate: orderrate,
            foodrate: foodrate
        });



    }
})

router.post("/orderfood", async function (req,res) {
    const decoded = decodeToken(req.headers.authorization.substring(7));
    console.log(decoded)
    console.log(req.body)
    if(decoded.type === "buyer")
    {
        const fooditem = await Fooditem.findById(req.body.fooditem);
        const user  = await User.findById(decoded.userId).populate("buyer");
        console.log(fooditem);

        const price = parseInt(fooditem.price * req.body.quantity)
        console.log(price)
        if(user.buyer.wallet >= price){

            await Buyer.updateOne({_id: decoded.buyerId}, {$inc: {wallet: -price}})

            const order = new Order({
                fooditem: req.body.fooditem,
                quantity: req.body.quantity,
                buyer: decoded.userId,
                vendor: fooditem.vendor
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

router.post("/fav",async function(req,res){
    const decoded = decodeToken(req.headers.authorization.substring(7));
    if(decoded.type === "buyer")
    {
        const food = await Fooditem.findById(req.body.fooditem);
        if(food){
        const buyer = await Buyer.findOne({_id: decoded.buyerId});

            if(buyer.favourites.includes(req.body.fooditem)){
                Buyer.updateOne({_id: decoded.buyerId}, {$pull: {favourites: req.body.fooditem}})
                .then(user => {
                    res.send(user);
                })
                .catch(err => {
                    res.send(err);
                })
            }
            else{
                Buyer.updateOne({_id: decoded.buyerId}, {$push: {favourites: req.body.fooditem}})
                .then(user => {
                    res.send(user);
                })
                .catch(err => {
                    res.send(err);
                })
            }
        }
        else{
            res.send("Food item not found");
        }
    }
})

module.exports = router;