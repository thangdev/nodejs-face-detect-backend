const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const morgan = require('morgan')

require("dotenv").config({ path: "./prod.env" });


// API Controller
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');


// Connect to db
const db = knex({
  client: "pg",
  connection: process.env.POSTGRES_URL
});






const app = express(); 
app.use(morgan('tiny'))

app.use(cors())
app.use(bodyParser.json());


// Endpoints
app.get('/', (req, res)=> { res.send("hello from docker ahihi") })
app.post('/signin', signin.handleSignin(db, bcrypt))
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })
app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db)})
app.put('/image', (req, res) => { image.handleImage(req, res, db)})
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res)})





app.listen(4646, ()=> {
  console.log('app is running on port 4646');
})
