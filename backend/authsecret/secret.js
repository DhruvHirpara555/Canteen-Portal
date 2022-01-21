require('dotenv').config();

secret_key=process.env.JWT_SECRET;

module.exports = secret_key;

// module.exports = {
//     jwtSecret: process.env.JWT_SECRET
//   }
