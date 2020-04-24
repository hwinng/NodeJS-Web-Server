var express = require('express');
var cookieParser = require('cookie-parser');

var userRoute = require('./routes/user.route');
var authRoute = require('./routes/auth.route')

var port = 9090;
var app = express();

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.use(express.static('public'));

app.set('view engine', 'pug');
app.set('views', './views');

//homepage
app.get('/', function(req, res){
	res.render('index', {
		users: db.get("users").value()
	});
});

app.use('/users', userRoute);
app.use('/auth', authRoute);

app.listen(port, function(){
	console.log('Server listening on port ' + port);
});