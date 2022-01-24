var express = require("express");
var router = express.Router();
var jwt = require("jsonwebtoken");
const saltRounds = 10;
const secret = require("../authsecret/secret");
const { User } = require("../models/Users");
const { Buyer } = require("../models/Users");
const { Vendor } = require("../models/Users");

router.post("/", async function (req, res) {
    const tokenM = req.headers.authorization;

    const token = tokenM.substring(7);
    const decoded = jwt.verify(token, secret);

    console.log(req.body);
    console.log(decoded);

    await User.updateOne({ _id: decoded.userId },
    {
        $set:
        {
            name: req.body.name,
            email: req.body.email,
            Contact: req.body.Contact
        }
    })

    const userdata =await User.findById(decoded.userId);
    console.log(userdata)


    if (decoded.type == "buyer") {
        await Buyer.updateOne({ _id: decoded.buyerId }, {
            $set:
            {
                batchName: req.body.batchName,
                age: req.body.age
            }
        })

        const buyerdata = await Buyer.findById(decoded.buyerId)
        console.log(buyerdata)

        res.json({
            user : userdata,
            buyer: buyerdata
        })

    }

    else if (decoded.type == "vendor")
    {
        await Vendor.updateOne({_id: decoded.vendorId},{
            $set:
            {
                shopname: req.body.shopname,
                openingtime: req.body.openingtime,
                closingtime: req.body.closingtime
            }
        })

        const vendordata = await Vendor.findById(decoded.vendorId)
        console.log(vendordata);
        res.json({
            user: userdata,
            vendor: vendordata
        })
    }

})

module.exports = router;