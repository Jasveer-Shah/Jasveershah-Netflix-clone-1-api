const express = require('express') //importing express
const app = express()//initialize express
const port = 3000 //setting the port
const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");
const { Schema } = mongoose;  //grab the schema object from mongoos
var cors = require('cors');
require('dotenv').config()


mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0.rutnr.mongodb.net/netflix-api-db-dev?retryWrites=true&w=majority`, {
  useCreateIndex: true,
  useUnifiedTopology: true,
  useNewUrlParser: true
});

const User = mongoose.model('Users', new Schema(
  {
    name: String,
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    }
  })
);

const WishListSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'Users'
    },
    movieId: Number,
    backdrop_path: String,
    title: String,
    // password: {
    //   type: String,
    // required: true
    // }
  })

WishListSchema.index({ user: 1, movieId: 1 }, { unique: true })

const WishList = mongoose.model('WishList', WishListSchema);



app.use(cors());

app.use(express.json());

function authenticateToken(req, res, next) {
  console.log(req.headers);
  const authHeaderToken = req.headers['authorization']
  if (!authHeaderToken) return res.sendStatus(401);

  jwt.verify(authHeaderToken, "elephant12345678", (err, user) => {
    if (err) return res.sendStatus(403);
    //  console.log(user)
    req.user = user;
    next()
  })
}
//using the get method
//logic for the get request
//I`m trying to get data
app.get('/', (req, res) => {
  res.send("Hello world")
})

app.post('/wishlist', authenticateToken, (req, res) => {
  console.log(req.user);
  const newWishListItem = new WishList({
    user: req.user.id,
    movieId: req.body.movieId,
    backdrop_path: req.body.backdrop_path,
    title: req.body.title
  })

  newWishListItem.save((err, wishlistItem) => {
    if (err) {
      res.send(400, {
        status: err
      })
    } else {
      res.send({
        wishlistItem: wishlistItem,
        status: "saved"
      })
    }
  })
  // console.log(req.user);
  // console.log(req.body);
  // res.send({
  //   status: "All Good"
  // })
})



app.get('/wishlist', authenticateToken, (req, res) => {
  // console.log("I am authenticated")
  // console.log(req.user);
  WishList.find({ user: req.user.id }, (err, docs) => {
    if (err) {
      res.send(400, {
        status: err
      })
    } else {
      res.send({
        status: "good",
        results: docs
      })
    }
  })
})


app.post('/register', (req, res) => {
  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  })

  newUser.save((err, user) => {
    if (err) {                     //err syas user already exists
      // console.log(err);
      res.send(400, {
        status: err
      })
    } else {
      res.send({
        status: "registered"
      })                                //  console.log("all is good");
      //  console.log(user);
      //  res.send("registered")
    }
  })
})

function generateAccessToken(user) {
  const payload = {
    id: user.id,
    name: user.name
  }
  return jwt.sign(payload, "elephant12345678", { expiresIn: '7200s' })
}

app.post('/login', (req, res) => {
  console.log(req.body);
  const password = req.body.password;
  const email = req.body.email;
  User.findOne({ email: email, password: password }, (err, user) => {

    if (user) {

      console.log(user);
      const token = generateAccessToken(user);
      console.log(token);
      res.status(200)
        .send({
          token: token
        });
    } else {
      res.status(404).send("NOT FOUND")
    }
  })
})

//start our app
//listning to the port
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})







