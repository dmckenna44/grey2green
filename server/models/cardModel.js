const mongoose = require('mongoose');


const cardSchema = new mongoose.Schema({
  topic: {
    type: String, 
    required: true,
  },
  question: {
    type: String,
    required: true
  },
  answer: {
    type: String,
    required: true
  },
  color: {
    type: String
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  }
})

const Card = new mongoose.model('card', cardSchema);

module.exports = Card;