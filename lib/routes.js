
Router.route('/success', function () {
    this.render('success');
}, {
    name: 'success'
});

Router.route('/calendar', function () {
  this.render('calendar');
}, {
  name: 'calendar'
});

Router.route('/profile', function () {
  this.render('profile');
}, {
  name: 'profile'
});
Router.route('/', function () {
    this.render('frontpage');
},{
    name: 'frontpage'
});

