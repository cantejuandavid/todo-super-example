var express = require('express')
var routes = require('./routes')
var producto = require('./controllers/producto')
var user = require('./routes/user')
var stylus = require('stylus')
var nib = require('nib')
var bodyParser = require('body-parser')
var http = require('http')
var path = require('path')

var app = express()	
// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(stylus.middleware({
	src: __dirname + '/public',
	compile: compile
}));
//app.use(express.logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
//app.use(app.router);
app.use(require('stylus').middleware(__dirname + '/public'));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', producto.index)

app.get('/producto/:id', producto.show_edit)

app.post('/producto/:id', producto.update)

app.get('/delete-producto/:id', producto.remove)

app.get('/nuevo-producto', producto.create)

app.post('/nuevo-producto', producto.create)

app.get('/buscar', producto.buscar)

app.post('/buscar', producto.buscar)


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

function compile(str, path) {
	return stylus(str)
		.set('filename', path)
		.set('compress', true)
		.use(nib())
}