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

// using .then as alternative to await makes
// .then is callen when the promise is fullfilled

router.get("/", function (req,res) {



    const decoded = decodeToken(req.headers.authorization.substring(7));


    if(decoded.type === "vendor")
    {
        Fooditem.find({vendor: decoded.vendorId})
        .then(fooditems => {
            res.send(fooditems);
        }
        ).catch(err => {
            res.send(err);
        }
        );
    }

})

router.get("/orders",async  (req,res) => {
    const decoded = decodeToken(req.headers.authorization.substring(7));



    const orders = await Order.find({vendor: decoded.vendorId}).sort({createdAt: -1}).populate(["fooditem", "buyer", "vendor"])
    const orderlist = await orders.map( (order,inx) => {
        return ({
            key : inx,
            fooditem: order.fooditem.itemname,
            price: order.fooditem.price,
            quantity: order.quantity,
            status: order.status,
            buyer: order.buyer.name,
            Contact: order.buyer.Contact,
            buyerId: order.buyer.buyer,
            placedtime: order.createdAt,
            orderId : order._id
        })
    })
    console.log(orderlist);
    res.send(orderlist);
    // const orderlist = await orders.map(async (order,inx) => {
    //     const food = await Fooditem.findById(order.fooditem);
    //     const buyer = await User.findById(order.buyer);
    //     console.log(order);
    //     console.log(food);
    //     console.log(buyer);
    //     const data = ({
    //                 key: inx,
    //                 fooditem: food.itemname,
    //                 price: food.price,
    //                 status: order.status,
    //                 buyer: buyer.name,
    //                 Contact: buyer.Contact,
    //                 placedtime: order.createdAt,
    //                 orderId: order._id
    //     })
    //     console.log(data);
    //     return data;
    // })

    // Promise.all(orderlist).then(data => {
    //     console.log(data);
    //     res.send(data);
    // })
    // .catch(err => {
    //     res.send(err);
    // }
    // );
    //The Promise.all() method is actually a promise that takes an array of promises(an iterable) as an input. It returns a single Promise that resolves when all of the promises passed as an iterable, which have resolved or when the iterable contains no promises. In simple way, if any of the passed-in promises reject, the Promise.all() method asynchronously rejects the value of the promise that already rejected, whether or not the other promises have resolved.


})

router.post("/order/reject",async function (req,res) {
    const decoded = decodeToken(req.headers.authorization.substring(7));
    const orderup = await Order.updateOne({_id: req.body.orderId}, {$set : {status : 'rejected'}})
    const buyerup = await Buyer.updateOne({_id : req.body.buyerId}, { $inc : {wallet : (req.body.price * req.body.quantity)}})

    res.send({
        orderstat : orderup,
        buyerstat : buyerup
    })


})

router.post("/order/movetonext", async function (req,res) {
    const decoded = decodeToken(req.headers.authorization.substring(7));
    if(decoded.type === "vendor")
    {
        const order = await Order.findById(req.body.orderId);
        console.log(order);

        if(order.status === "placed")
        {
            Order.findByIdAndUpdate(req.body.orderId, { $set: { status: "accepted" } })
            .then(order => {
                res.send(order);
            }
            ).catch(err => {
                res.send(err);
            }
            );
        }
        else if(order.status === "accepted")
        {
            Order.findByIdAndUpdate(req.body.orderId, { $set: { status: "cooking" } })
            .then(order => {
                res.send(order);
            }
            ).catch(err => {
                res.send(err);
            }
            );
        }
        else if(order.status === "cooking")
        {
            Order.findByIdAndUpdate(req.body.orderId, { $set: { status: "ready" } })
            .then(order => {
                res.send(order);
            }
            ).catch(err => {
                res.send(err);
            }
            );
        }
        else if(order.status === "ready")
        {
            Order.findByIdAndUpdate(req.body.orderId, { $set: { status: "completed" } })
            .then(order => {
                res.send(order);
            }
            ).catch(err => {
                res.send(err);
            }
            );
        }
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

