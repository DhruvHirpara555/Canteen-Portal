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

router.get("/orderstats", async function (req, res) {
    const decoded = await decodeToken(req.headers.authorization.substring(7));
    console.log(decoded);
    if(decoded.type === "vendor") {
        const total = await Order.find({vendor: decoded.vendorId}).count();
        const rejectedordercount = await Order.find({vendor: decoded.vendorId, status: "rejected"}).count();
        const placedordercount = await Order.find({vendor: decoded.vendorId, status: "placed"}).count();
        const acceptedordercount = await Order.find({vendor: decoded.vendorId, status: "accepted"}).count();
        const cookingordercount = await Order.find({vendor: decoded.vendorId, status: "cooking"}).count();
        const readyordercount = await Order.find({vendor: decoded.vendorId, status: "ready"}).count();
        const completedordercount = await Order.find({vendor: decoded.vendorId, status: "completed"}).count();

        res.send({
            total: total,
            rejectedordercount: rejectedordercount,
            placedordercount: placedordercount,
            pendingordercount: acceptedordercount + cookingordercount + readyordercount,
            acceptedordercount: acceptedordercount,
            completedordercount: completedordercount
        });
    }
});

router.get("/top" , async function (req,res) {
    const decoded = await decodeToken(req.headers.authorization.substring(7));
    if(decoded.type === "vendor") {
        const fooditems = await Fooditem.find({vendor: decoded.vendorId}).sort({total: -1}).limit(5);
        res.json(fooditems);
    }
})

// router.get("/batchstats", async function (req, res) {
//     const decoded = await decodeToken(req.headers.authorization.substring(7));
//     console.log(decoded);
//     if(decoded.type === "vendor") {
//         const vendor = await Vendor.findOne({_id: decoded.vendorId});
//         const batch = ['UG1', 'UG2', 'UG3', 'UG4', 'UG5'];
//         var batchstats = [];
//         for(var i = 0; i < batch.length; i++) {
//             const buyers = await Buyer.find({batchName: batch[i]});
//             console.log(buyers);
//             const users = buyers.map(async buyer => {

//                 let retval = await User.findOne({buyer: buyer._id});
//                 return retval;

//             })
//             Promise.all(users).then(
//                 async (values) => {
//                     var total = 0;
//                     for(var j = 0; j < values.length; j++) {

//                         console.log(await Order.find({buyer: values[j]._id}));
//                         console.log(values[j]);
//                     }
//                     batchstats.push({
//                         batch: batch[i],
//                         total: total
//                     });
//                 }
//             )

//         }
//         res.json(batchstats);
//     }


// })

module.exports = router;