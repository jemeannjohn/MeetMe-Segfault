

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

Router.route('/timeslotsInformation/:_id', function () {
    this.render('timeslotsInformation', {
        data: function () {
            return Meeting.findOne({_id: this.params._id});
        }
    });
}, {
    name: 'timeslotsInformation'
});

Router.route('/', function () {
    this.render('newMeeting');
});

//Routing for wizard


Router.configure({
    layoutTemplate: 'profile'
});




Router.route('/schedule', {
    name: 'schedule'
},function () {
    this.redirect('meeting/new/title');
});

//Router.route('/meeting/:step', {name: 'order'});
Router.route('/meeting/new/:step?', {
    name: 'newMeeting'
});

Router.route('/meeting/:_id', {
    name: 'viewMeeting',
    data: function () {
        return Meeting.findOne(this.params._id);
    }
});

Router.route('/meeting/:_id/edit/:step?', {
    name: 'editMeeting',
    data: function () {
        return Meeting.findOne(this.params._id);
    }
});

Router.route('/upcomingEvents', function () {
    this.render('upcomingEvents');
}, {
    name: 'upcomingEvents'
});

//Router.route('/poll', {name: 'pollpage'});

Router.route('/questions/:_id', {
  name: 'questionPage',
  data: function() { return Questions.findOne(this.params._id); }
});

Router.route('/pastEvents', function () {
    this.render('pastEvents');
}, {
    name: 'pastEvents'
});

Router.route('/poll/:meetingId/:email', {
    name: 'pollpage',
    data: function () {
        return Timeslots.findOne({meetingId: this.params.meetingId});
    }
});

Router.route('/guestInformation', function () {
    this.render('guestInformation');
}, {
    name: 'guestInformation'
});