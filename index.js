const express = require("express");
const app = express();
var db = require("./db");
var cookieParser = require("cookie-parser");

var booksRoute = require("./routes/books.route");
var usersRoute = require("./routes/users.route");
var transRoute = require("./routes/trans.route");
var authRoute = require("./routes/auth.route");

var middleAuth = require("./middlewares/requireAuth");

app.set("view engine", "pug");
app.set("views", "./views");

app.use(cookieParser('sadasd35378'));
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

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
app.use("/books",middleAuth.requireAuth, booksRoute);
app.use("/users",middleAuth.requireAuth, usersRoute);
app.use("/transactions", middleAuth.requireAuth, transRoute);
app.use("/auth", authRoute);

app.listen(process.env.PORT, () => {
  console.log("Server listening on port " + process.env.PORT);
});
