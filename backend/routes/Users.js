var express = require("express");
var bcrypt = require("bcrypt");
var router = express.Router();
var jwt = require("jsonwebtoken");
const saltRounds = 10;
const secret = require("../authsecret/secret");

// Load User model
const {User} = require("../models/Users");
const {Buyer} = require("../models/Users");
const {Vendor} = require("../models/Users");





// GET request
// Getting all the users
router.get("/", function(req, res) {
    User.find(function(err, users) {
		if (err) {
			console.log(err);
		} else {
			res.json(users);
		}
	})
});

// Getting all the buyer
router.get("/ball", function(req, res) {
    Buyer.find(function(err, buyers) {
        if(err) {
            console.log(err);
            } else {
                res.json(buyers);
            }
    })
});
// Getting all the vedor
router.get("/vall", function(req, res) {
    Vendor.find(function(err, vendors) {
        if(err) {
            console.log(err);
            } else {
                res.json(vendors);
            }
    })
});



router.post("/register", async (req, res)  => {

    const saltRounds = 10;
    const password = await bcrypt.hash(req.body.password, saltRounds);
    console.log(req);


    if(req.body.type == "buyer") {
        var newBuyer = new Buyer({
            age: req.body.age,
            batchName: req.body.batchName
        })
        newBuyer.save((err, buyer) => {
            if (err) {
                console.log(err);
            } else {
                console.log("new buyer added");
            }
        })
        var newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: password,
            Contact: req.body.Contact,
            buyer: newBuyer._id
        });

        newUser.save()
        .then(user => {
            res.status(200).json(user);
        })
        .catch(err => {
            res.status(400).send(err);
        });
    }

    else if(req.body.type == "vendor") {
        var newVendor = new Vendor({
            shopname: req.body.shopname,
            openingtime: req.body.openingtime,
            closingtime: req.body.closingtime
        })
        newVendor.save((err, vendor) => {
            if (err) {
                console.log(err);
            } else {
                console.log("new vendor added");
            }})

        var newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: password,
            Contact: req.body.Contact,
            vendor: newVendor._id
        });

        newUser.save()
        .then(user => {
            res.status(200).json(user);
        })
        .catch(err => {
            res.status(400).send(err);
        });
    }



});




// POST request
// Login
router.post("/login",async (req, res) => {
	const email = req.body.email;
	// Find user by email
	const user = await User.findOne({ email : req.body.email });
    if (!user) {
        return res.status(404).send("User not found");
    }



    if (!(await bcrypt.compare(req.body.password, user.password))) {
        return res.status(200).json({
            check: false,
            error: "Invalid Login details"
        });
    }


    const tokenM = user.vendor ? {userId: user._id,vendorId: user.vendor,email: user.email,type : "vendor"} : {userId: user._id,buyerId: user.buyer,email: user.email,type : "buyer"}

    const token = jwt.sign(tokenM, secret);


    // tokenM = {
    //     userId: user._id,
    //     vendor: user.vendor,
    //     buyer: user.buyer,
    // }
    return res.status(200).json({
        token: token,
        check: true

    });

});

module.exports = router;

