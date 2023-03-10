// const session = require('express-session');
const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const SALT_ROUNDS = 12;


const userController = {};

userController.logIn = async (req, res, next) => {
  try {
    const {username, password} = req.body;
    const foundUser = await User.findOne({username: username});
    const match = await bcrypt.compare(password, foundUser.password);
    if (match) {
      console.log('foundUser', foundUser);
      res.locals.user = foundUser;
      // const session = req.session;
      // session.userId = foundUser._id;
      // console.log('session from login', session);
    }
    return next();
  } catch (err) {
    return next(err);
  }
}

userController.signUp = async (req, res, next) => {
  try {
    const {username, password} = req.body;
    const encryptedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    const foundUser = await User.create({username: username, password: encryptedPassword});
    if (foundUser) res.locals.user = foundUser;
    return next();
  } catch (err) {
    return next(err);
  }
}

// ------------- Session/JWT Authentication Having Issues with Vercel --------- //
// userController.createJWT = (req, res, next) => {
//   const jBody = {
//     issuedBy: 'grey2green',
//     username: res.locals.user.username,
//     userId: res.locals.user._id
//   }

//   const newJWT = jwt.sign((jBody, process.env.TOKEN_SECRET, {expiresIn: '43200s'}));
//   res.cookie('token', newJWT, {
//     httpOnly: true,
//     signed: true
//   });
//   return next();
// }


// userController.verifyJWT = (req, res, next) => {
//   const token = req.signedCookies.token;
//   if (token) {
//     jwt.verify(token, process.env.TOKEN_SECRET, (err, data) => {
//       if (err) {
//         console.error(err)
//         res.locals.verified = false
//        } else {
//         res.locals.verified = true;
//         res.locals.username = data.username;
//         res.locals.userId = data.userId;
//         res.locals.email = data.email;
//       };
//       next();
//       return;
//     });
//   } else {
//     res.locals.verified = false;
//     next();
//     return;
//   }
// }


// userController.verifyUser = async (req, res, next) => {
//   try {
//     const session = req.session;
//     console.log('session from verifyUser', session);
//     if (session.userId) {
//       res.locals.permission = true;
//     } else {
//       res.locals.permission = false;
//     }
//     return next();
//   } catch(err) {
//     return next(err);
//   }
// }
// --------------------------------------------------------------------- //

module.exports = userController;