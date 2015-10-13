var db = require('../mongoose.js')

var producto_schema = require('../models/producto')
  , Producto = db.model('Producto', producto_schema)

exports.index = function (req, res, next) {

	Producto.find(gotProducts)

	function gotProducts(err, productos) {
		if(err) {
			console.log(err)
			return next()
		}

		return res.render('index', {tilte: ' Lista de Productos', productos: productos})
	}
}
exports.show_edit = function (req, res, next) {
    var id = req.params.id

    Producto.findById(id, gotProduct)

    function gotProduct (err, producto) {
    	if(err) {
    		console.log(err)
    		return next(err)
    	}
        if(!producto) {
            console.log('ERROR: ID no existe')
            return res.send('ID Inválida')
        } else {
    	   return res.render('show_edit', {title: 'Producto a editar', producto: producto})
        }
    }
}
exports.update = function (req, res, next) {
    var id = req.params.id

    var nombre = req.body.nombre	|| ''
    var descripcion = req.body.descripcion	|| ''
    var precio = req.body.precio 	|| ''

    if((nombre==='') || (descripcion==='')) {
    	console.log('ERROR: Campos vacios')
    	return res.send('Hay campos vacíos, revisar')
    }

    if(isNaN(precio)) {    	
    	return res.send('Precio no es un número !!!')
    }

    Producto.findById(id, gotProduct)

    function gotProduct(err, producto) {
    	if(err) {
    		console.log(err)
    		return next(err)
    	}

    	if(!producto) {
    		console.log('ERROR: ID no existe')
    		return res.send('ID Inválida')
    	} else {
    		producto.nombre = nombre
    		producto.descripcion = descripcion
    		producto.precio = precio

    		producto.save(onSaved)
    	}
    }

    function onSaved(err) {
    	if(err) {
    		console.log(err)
    		return next(err)
    	}

    	return res.redirect('/')
    }
}
exports.remove = function (req, res, next) {
	var id = req.params.id

	Producto.findById(id, gotProduct)

	function gotProduct(err, producto) {
		if(err) {
			console.log(err)
			return next(err)
		}

		if(!producto) {
			return res.send('Invalid Id. (De algún otro lado la sacaste tú...)')
		}

		producto.remove(onRemoved)
	}

	function onRemoved(err) {
		if(err) {
			console.log(err)
			return next(err)
		}

		return res.redirect('/')
	}
}
exports.create = function (req, res, next) {
    if (req.method === 'GET') {
    return res.render('show_edit', {title: 'Nuevo Producto', producto: {}})
  } else if (req.method === 'POST') {
    // Obtenemos las variables y las validamos
    var nombre      = req.body.nombre       || ''
    var descripcion = req.body.descripcion  || ''
    var precio      = req.body.precio       || ''

    // Validemos que nombre o descripcion no vengan vacíos
    if ((nombre=== '') || (descripcion === '')) {
      console.log('ERROR: Campos vacios')
      return res.send('Hay campos vacíos, revisar')
    }

    // Validemos que el precio sea número
    if (isNaN(precio)) {
      console.log('ERROR: Precio no es número')
      return res.send('Precio no es un número !!!!!')
    }

    // Creamos el documento y lo guardamos
    var producto = new Producto({
        nombre        : nombre
      , descripcion   : descripcion
      , precio        : precio
    })

    producto.save(onSaved)

    function onSaved (err) {
      if (err) {
        console.log('NO SE PUDO CREAR ESTE PRODUCTO')
        console.log(err)
        return next(err)
      }

      return res.redirect('/')
    }
  }  
}
exports.buscar = function(req, res, next) {
    if(req.method === 'GET') {
        res.render('buscar', {title:'Buscar'})
    } else if(req.method === 'POST') {        
                
        Producto.find({ nombre: { $regex: req.body.parametro} }, onFind)
    }
    function onFind(err, producto) {
        if(err) {
            console.log(err)
            return err
        }
        else {
            res.send(producto)
        }
    }
} 