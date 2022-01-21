const jwt = require("jsonwebtoken")
const AUTH_SECRET  = require("../authsecret/secret")




module.exports = (req,res,next) =>{

        const autherizer = req.headers.authorization
        if (!(autherizer && autherizer.toLowerCase().startsWith("bearer "))) {
            return res.status(401).json({
                status: 1,
                error: "No token provided"
            })

        }
        const token = autherizer.substring(7)



        jwt.verify(token, AUTH_SECRET, function(err, data) {
            if (err){
                return res.status(400).json({
                    status : 1,
                    error : {err}
                })
            }
            req.user = data;
            next();

        })

}




