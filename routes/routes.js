var search = require('../models/search_books');
var passport = require('passport');
var Account = require('../models/account').Account;
var Book = require('../models/book').Book;

module.exports = function(app){

	app.get('/', function(req, res){
    var username = req.user ? req.user.username : null;
		res.render('index', { user: req.isAuthenticated(), username: username });
	});

	app.get('/register', function(req, res){
    var username = req.user ? req.user.username : null;
		res.render('register', { user: req.isAuthenticated(), username: username, email: null, un: null, userexists: false, emailexists: false });
	});

	app.post('/register', function(req, res){
      require('../models/register')(req, res);
	});

	app.get('/login', function(req, res){
    var username = req.user ? req.user.username : null;
		res.render('login', { user: req.isAuthenticated(), username: username });
	});

	app.post('/login', 
		passport.authenticate('local', { failureRedirect: '/login' }), function(req, res){
		res.redirect('/allbooks')
	});

  app.get('/logout', function(req, res){
    req.logout();
    res.redirect('/'); //Can fire before session is destroyed?
  });

  app.get('/allbooks', function(req, res){
    if (req.isAuthenticated()){
      Book.find({}, function(err, books){
        res.render('allbooks', { user: req.isAuthenticated(), username: req.user.username, books: books});
      });
    }    
  });

  app.get('/searchbooks', function(req, res){
    console.log('searching books');
    if (req.isAuthenticated()){
      res.render('searchbooks', { user: req.isAuthenticated(), username: req.user.username, })
    } else {
      res.send('you\'re not logged in.');
    }
  });

  app.post('/searchbooks', function(req, res){
    if (req.isAuthenticated()){
      search(req.body.title, function(error, results){
        if (error) return error;
        res.send(results);
      });  
    } else {
      res.send('you\'re not logged in.');
    }
  });

  app.get('/mybooks', function(req, res){
    if (req.isAuthenticated()){
      Account.findOne({ email: req.user.email }).populate('booksInUser').exec(function(err, account){
        if (err) return err;
        res.render('mybooks', { user: req.isAuthenticated(), username: req.user.username, books: account.booksInUser });
      });
    } 
  });

  app.post('/addbook', function(req, res){
    if (req.isAuthenticated()){
      require('../models/add_book')(req)
      res.send('Success')
    } else {
      res.send('you\'re not logged in.');
    }
  });

  app.post('/requesttrade', function(req, res){
    if (req.isAuthenticated()){
      require('../models/trade_book')(req)
      res.send('Success')
    } else {
      res.send('you\'re not logged in.');
    }
  });

  app.get('/traderequests', function(req, res){
    if (req.isAuthenticated()){
      Account.findOne({ email: req.user.email }).populate('tradeRequests').exec(function(err, account){
        res.render('traderequests', {user: req.isAuthenticated(), username: req.user.username, books: account.tradeRequests});
      });
    } else {
      res.send('you\'re not logged in.');
    }
  });

  app.get('/traderequestspending', function(req, res){
    if (req.isAuthenticated()){
      Account.findOne({ email: req.user.email }).populate('tradeRequestsPending').exec(function(err, account){
        res.render('traderequestspending', {user: req.isAuthenticated(), username: req.user.username, books: account.tradeRequestsPending})
      });
    } else {
      res.send('you\'re not logged in.');
    }
  });

  app.post('/accepttrade', function(req, res){
    if (req.isAuthenticated()){
      require('../models/accept_trade')(req)
      res.send('Success')
    } else {
      res.send('you\'re not logged in.');
    }
  });

  app.post('/canceltrade', function(req, res){
    if (req.isAuthenticated()){
      require('../models/cancel_trade')(req)
      res.send('Success')
    } else {
      res.send('you\'re not logged in.');
    }
  });

  app.delete('/deletebook', function(req, res){
    if (req.isAuthenticated()) {
      Book.findById(req.body.bookid).remove().exec();
    }
  })

}