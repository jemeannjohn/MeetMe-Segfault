Router.route('/calendar', function () {
  this.render('calendar');
}, {
  name: 'calendar'
});

Router.route('/', function () {
  this.render('login');
});
