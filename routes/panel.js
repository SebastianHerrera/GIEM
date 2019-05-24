
module.exports = (app, passport, Estudiantes) => {


    const  MongoClient = require('mongodb').MongoClient

    var db

    MongoClient.connect('mongodb://localhost/login-node', (err, client) => {
    if (err) return console.log(err)
        db = client.db('login-node') // whatever your database name is
    })

   

    //profile view
    app.get('/panel', isLoggedIn,  (req, res) => {
        db.collection('estudiantes').find({psicoEmail: "sebasbeleno15@gmail.com"}).toArray(function(err, results) {
            
            if(err) console.error(err)

            console.log(results)
            // send HTML file populated with quotes here

            res.render('panel', {
                user: req.user, 
                page: req.originalUrl,
                estudiantes: results
            });
        })
        
    });

    // logout
	app.get('/logout', (req, res) => {
		req.logout();
		res.redirect('/');
	});

	app.get('/estudiantes', (req, res) => {
		res.render('estudiantes', {
            user: req.user, 
            page: req.originalUrl
        });
	})

	
	

}



/** Esto, es un middleware, que nos verifica si es usuario tiene una session abierta
 * en caso de que no, pidrá avanzar normlamente, pero en caso de que no halla inicado sesison
 * lo rederigimos al menú de inicio
 */
function isLoggedIn (req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}

	res.redirect('/');
}