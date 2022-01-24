var express = require("express");
var router = express.Router();
var jwt = require("jsonwebtoken");
const saltRounds = 10;
const secret = require("../authsecret/secret");
const {User} = require("../models/Users");
const {Buyer} = require("../models/Users");
const {Vendor} = require("../models/Users");
const Fooditem = require("../models/Fooditem");

router.get("/", function (req,res) {
    const tokenM = req.header.authorisation;
    const token = tokenM.substring(7);

    const decoded = jwt.verify(token, secret);

    if(decoded.type === "vendor")
    {
        Fooditem.find({vendor: decoded.id}).then(fooditems => {
            res.send(fooditems);
        }
        ).catch(err => {
            res.send(err);
        }
        );
    }

})

router.post("/deletefood",function(req,res){
    const tokenM = req.header.authorisation;
    const token = tokenM.substring(7);

    const decoded = jwt.verify(token, secret);

    if(decoded.type === "vendor")
    {
        Fooditem.deletOne({_id: req.body.id})
        .then(fooditem => {
            res.send(fooditem);
        }
        ).catch(err => {
            res.send(err);
        }
        );

    }
})


router.post("/addfood", function(req,res){
    const tokenM = req.header.authorisation;
    const token = tokenM.substring(7);

    const decoded = jwt.verify(token, secret);

    if(decoded.type === "vendor")
    {
        const fooditem = new Fooditem({
            itemname: req.body.itemname,
            price: req.body.price,
            type: req.body.type,
            tags: req.body.tags,
            vendor: decoded.vendorId
        });
        fooditem.save().then(fooditem => {
            res.send(fooditem);
        }).catch(err => {
            res.send(err);
        });
    }
})



