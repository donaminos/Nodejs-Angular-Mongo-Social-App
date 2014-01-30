module.exports = function(app, models) {
  app.get('/', function(req, res) {
    res.render('index', {title: 'Hello'});
  });

  app.get('/users/:userId?', function(req, res) {
    var criteria = {};

    if (req.params.userId) {
      criteria.id = req.params.userId;
    }

    // Exclude password from the fields list
    models.User.find(criteria, {password: 0}, function(error, data) {
      if (error) {
        res.status(404);
      }
      res.json(data);
    });
  });
};
