const express = require("express");
const bcrypt = require("bcrypt");
const cors = require("cors");
const knex = require("knex");

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');



const db = knex({
  client: "pg",
  connection: {
    connectionString: "process.env.DATABASE_URL",
    ssl: true
  }
});

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


app.get('/', (req, res) => { res.send('it is working!') })
//signin --> POST = success/fail
app.post("/signin", (req, res) => { signin.handelSignin(req, res, db, bcrypt) })
//register --> POST = user
app.post("/register", (req, res) => { register.handleRegister(req, res, db, bcrypt) }) 
//profile/: PUT --> user
app.get("/profile/:id", (req, res) => { profile.handleProfileGet(req, res, db) })
//image --> PUT --> user
app.put("/image", (req, res) => { image.handleImage(req, res, db) })
app.post("/imageurl", (req, res) => { image.handleApiCall(req, res) })

app.listen(process.env.PORT || 3000, () => {
  console.log(`app is running on post 3000 ${process.env.PORT}`);
});

