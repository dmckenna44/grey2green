const session = require('express-session');
const User = require('../models/userModel');


const userController = {};

userController.logIn = async (req, res, next) => {
  try {
    const {username, password} = req.body;
    const foundUser = await User.findOne({username: username});
    if (foundUser) {
      console.log('foundUser', foundUser);
      res.locals.user = foundUser;
      const session = req.session;
      session.userId = foundUser._id;
      console.log('session from login', session);
    }
    return next();
  } catch (err) {
    return next(err);
  }
}

userController.signUp = async (req, res, next) => {
  try {
    const {username, password} = req.body;
    const foundUser = await User.create({username: username, password: password});
    if (foundUser) res.locals.user = foundUser;
    return next();
  } catch (err) {
    return next(err);
  }
}

userController.verifyUser = async (req, res, next) => {
  try {
    const session = req.session;
    console.log('session from verifyUser', session);
    if (session.userId) {
      res.locals.permission = true;
    } else {
      res.locals.permission = false;
    }
    return next();
  } catch(err) {
    return next(err);
  }
}

module.exports = userController;