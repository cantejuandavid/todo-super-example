var Schema = require('mongoose').Schema

var producto_schema = new Schema({  
  user_id       : String,
  nombre        :   String,
  descripcion   :   String,
  precio        :   Number
})

var Producto = module.exports = producto_schema