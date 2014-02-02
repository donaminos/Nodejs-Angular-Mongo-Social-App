module.exports = function(app, model) {
  app.get('/', function(req, res) {
    res.render('index', {title: 'Hello'});
  });

  /**
   * Check if user is currently logged in
   */
  app.get('/users/authenticated', function(req, res) {
    if (req.session.me) {
      res.json(req.session.me);
    }
    res.send(401);
  });

  /**
   * Log current user out
   */
  app.get('/users/logout', function(req, res) {
    // Clear authentication session
    if (req.session.me) {
      req.session.me = null;
    }
    res.send(200);
  });

  app.get('/users/:userId?', function(req, res) {
    var criteria = {};

    if (req.params.userId) {
      criteria.id = req.params.userId;
    }

    // Exclude password from the fields list
    model.User.find(criteria, {password: 0}, function(error, data) {
      if (error) {
        res.send(404);
      }
      res.json(data);
    });
  });

  /**
   * User login
   */
  app.post('/users/login', function(req, res) {
    var email = req.body.email;
    var password = req.body.password;

    if (!email || !password) {
      res.send(400);
    }

    model.login(email, password, function(user) {
      if (user) {
        console.log(user);
        req.session.me = user;
        res.json(user);
      }
      else {
        res.send(401);
      }
    });
  });

  /**
   * User registration
   */
  app.post('/users/register', function(req, res) {
    var data = req.body;

    model.register(data, function(err, user) {
      if (err) {
        res.send(401);
      }
      else {
        res.json(user);
      }
    });
  });

  /**
   * User account update
   */
  app.post('/users/account', function(req, res) {
    var user = req.body;

    model.update(user, function(err, account) {
      if (err) {
        res.send(401);
      } else {
        res.send(200);
      }
    });
  });
};
