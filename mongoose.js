var mongoose = require('mongoose')
var db = 'mongodb://rooter:juandavid123@ds049548.mongolab.com:49548/todo-example'
var db = module.exports = mongoose.connect(db)

mongoose.connection.on('error', function(err) {
	console.log(err)
})

mongoose.connection.on('connected', function(e) {
	console.log('->DB Lista!!!')	
})
