module.exports = function(app){
    app.get('/todo', function(req, res){
        res.render('todo');
      });
  };