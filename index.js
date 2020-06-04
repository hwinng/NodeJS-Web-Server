require("dotenv").config();

const express = require("express");
const app = express();
var db = require("./db");
var cookieParser = require("cookie-parser");
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });

var booksRoute = require("./routes/books.route");
var usersRoute = require("./routes/users.route");
var transRoute = require("./routes/trans.route");
var authRoute = require("./routes/auth.route");
var cartRoute = require('./routes/cart.route');
var apiLoginRoute = require("./api/routes/login.route");
var apitTransRoute = require("./api/routes/trans.route");
var apiUserRoute = require("./api/routes/users.route");
var apiBookRoute = require("./api/routes/books.route");

var middleAuth = require("./middlewares/requireAuth");
var sessionMiddleware = require("./middlewares/session.middleware");

app.set("view engine", "pug");    
app.set("views", "./views");    


app.use('/api/login', apiLoginRoute);
app.use('/api/transactions', apiTransRoute);
app.use('/api/users', apiUserRoute);
app.use('/api/books', apiBookRoute);

app.use(cookieParser('abcd5678'));
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(sessionMiddleware); 

//home
app.get("/", (req, res) => {
  res.render("index");  
});

function countCookieMiddleware(req, res, next) {
  if (req.cookies) {
    var count = req.cookies.count
    res.cookie('count', ++count)
  } else {
    res.cookie('count', 0)
  }

  next()
}

app.use("/", countCookieMiddleware);
app.use("/cart", cartRoute);
app.use("/books", booksRoute);
app.use("/users",middleAuth.requireAuth, usersRoute);
app.use("/transactions", middleAuth.requireAuth, transRoute);
app.use("/auth", authRoute);


app.listen(process.env.PORT, () => {
  console.log("Server listening on port " + process.env.PORT);
});
