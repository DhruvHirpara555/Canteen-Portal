var express = require("express");
var router = express.Router();
var jwt = require("jsonwebtoken");
const saltRounds = 10;
const secret = require("../authsecret/secret");
const {User} = require("../models/Users");
const {Buyer} = require("../models/Users");
const {Vendor} = require("../models/Users");
const Fooditem = require("../models/Fooditem");


function decodeToken(token) {
    return jwt.verify(token, secret);
}

// using .then as alternative to await makes
// .then is callen when the promise is fullfilled

router.get("/", function (req,res) {



    const decoded = decodeToken(req.headers.authorization.substring(7));


    if(decoded.type === "vendor")
    {
        Fooditem.find({vendor: decoded.vendorId}).then(fooditems => {
            res.send(fooditems);
        }
        ).catch(err => {
            res.send(err);
        }
        );
    }

})

router.post("/deletefood",function(req,res){

    const decoded = decodeToken(req.headers.authorization.substring(7));



    if(decoded.type === "vendor")
    {
        // Fooditem.deleteOne({id: req.body.id})
        // .then(fooditem => {
        //     res.send(fooditem);
        // }
        // ).catch(err => {
        //     res.send(err);
        // }
        // );

        Fooditem.findOneAndRemove({_id:req.body.id})
        .then(fooditem => {
            res.send(fooditem);
        }
        ).catch(err => {
            res.send(err);
        }
        );

    }
})

router.post("/updatefood",function(req,res){
    console.log(req.body);

   const decoded = decodeToken(req.headers.authorization.substring(7));
//    Fooditem.findOne({_id: req.body.id}).then(fooditem => {

//        if(fooditem.vendor === decoded.vendorId){


        Fooditem.findByIdAndUpdate(req.body.id,
            {
                $set: {
                    itemname: req.body.itemname,
                    price: req.body.price,
                    type: req.body.type,
                    tags: req.body.tags,
                }
            })
        .then(fooditem => {
            console.log(fooditem);
            res.send(fooditem);
        }
        ).catch(err => {
            res.send(err);

        })
    // }
    // else{
    //     res.send("You are not authorized to update this food item");
    // }

    // }).catch(err => {
    //     res.send(err);
    // })
//    Fooditem.findByIdAndUpdate({_id: req.body.id},
//     {
//         $set: {
//             itemname: req.body.itemname,
//             price: req.body.price,
//             type: req.body.type,
//             tags: req.body.tags,
//         }
//     }).then(fooditem => {
//         res.send(fooditem);
//     }
//     ).catch(err => {
//         res.send(err);
//     }
//     );
})

router.post("/addfood", function(req,res){

    const decoded = decodeToken(req.headers.authorization.substring(7));



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

module.exports = router;

