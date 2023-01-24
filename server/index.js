const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');
const path = require('path');
const session = require('express-session');

const userController = require('./controllers/userController');
const cardController = require('./controllers/cardController');

const MONGO_URI = process.env.MONGO_URI;
console.log('mongo uri', MONGO_URI);

const app = express();
const port = process.env.PORT || 3000;

// app.use(express.static(path.resolve(__dirname, '../client/public')));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 1200000 }
}));

let connected = false;

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  dbName: 'flashcards'
})
  .then(() => {
    connected = true;
    console.log('Connected to Flashcard DB');
  })
  .catch(err => console.log(err))

app.get('/api/test', (req, res) => {
  const testResponse = {
    test: 'Succesful test',
    port: port,
    uri: MONGO_URI,
    connected: connected
  }
  res.status(200).json(testResponse);
})

///////////////////////////////////////////////////////////////////////////
// ---------------------- User Routes --------------------------------- //
//////////////////////////////////////////////////////////////////////////
app.post('/api/login', userController.logIn, (req, res) => {
  res.status(200).json(res.locals.user)
})

app.post('/api/signup', userController.signUp, (req, res) => {
  res.status(200).json(res.locals.user)
})

app.get('/api/users/:userId', userController.verifyUser, cardController.getUserCards, (req, res) => {
  res.status(200).json(res.locals.userCards);
})

app.get('/api/logout', (req, res) => {
    req.session.destroy();
    res.status(200).send('logged out');
})

///////////////////////////////////////////////////////////////////////////
// ---------------------- Card Routes --------------------------------- //
//////////////////////////////////////////////////////////////////////////
app.post('/api/addOrUpdateCard', userController.verifyUser, cardController.addOrUpdateCard, (req, res) => {
  const response = {
    details: res.locals.newCard,
    updated: res.locals.updated
  }
  res.status(200).json(response);
})

app.post('/api/updateCardPrep', userController.verifyUser, cardController.updatePrepLevel, (req, res) => {
  res.status(200).json(res.locals.updatedCard);
})

app.get('/api/getDetails/:id', userController.verifyUser, cardController.getDetails, (req, res) => {
  res.status(200).json(res.locals.details);
})

app.get('/api/randomCard', (req, res) => {
  res.status(200).json(res.locals.random)
})

///////////////////////////////////////////////////////////////////////////
// ---------------------- Global Routes --------------------------------- //
//////////////////////////////////////////////////////////////////////////
app.get('/*', (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, '../client/public/index.html'));
  return;
})

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send({ error: err });
});

app.listen(port, () => {
  console.log('Server listening on port 3000');
})