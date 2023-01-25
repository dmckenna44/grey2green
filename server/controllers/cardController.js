const Card = require('../models/cardModel');
const User = require('../models/userModel');

const cardController = {};

cardController.getUserCards = async (req, res, next) => {
  const {userId} = req.params;
  try {
    const foundUser = await User.findOne({username: userId});
    const userCards = await Card.find({userId: foundUser._id});
    res.locals.userCards = userCards;
    return next();
  } catch (err) {
    return next(err)
  }
}

cardController.addOrUpdateCard = async (req, res, next) => {
  const {username, topic, prompt, response, id} = req.body;
    if (id) {
      try {
        const selectedCard = await Card.findOne({_id: id});
        selectedCard.topic = topic;
        selectedCard.question = prompt;
        selectedCard.answer = response;
        const updatedCard = await selectedCard.save();
        res.locals.newCard = updatedCard;
        res.locals.updated = true;
        return next();
      } catch(err) {
        return next(err)
      }
    } else {
      try {
        const foundUser = await User.findOne({username: username});
        const newCard = await Card.create({
          topic: topic,
          question: prompt,
          answer: response,
          color: '#DDDDDD',
          userId: foundUser._id
        });
        res.locals.newCard = newCard;
        res.locals.updated = false;
        return next();
      } catch(err) {
        return next(err);
      }
    }
}

cardController.updatePrepLevel = async (req, res, next) => {
  const {id, color} = req.body;
    try {
      const selectedCard = await Card.findOne({_id: id});
      selectedCard.color = color;
      const updatedCard = await selectedCard.save();
      res.locals.updatedCard = updatedCard;
      return next();
    } catch (err) {
      return next(err);
    }
}

cardController.getDetails = async (req, res, next) => {
  const {id} = req.params;
  const foundCard = await Card.findOne({_id: id});
  res.locals.details = foundCard;
  return next();
}


module.exports = cardController;