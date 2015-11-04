/**
 * Created by Tharun on 10/18/2015.
 */

Meteor.publish(null, function () {
    return [
        Meeting.find()
    ];
});

Meteor.publish('questions', function() {
  return Questions.find();
});

Meteor.publish('answers', function() {
  return Answers.find();
});

Meteor.publish('usermeetings', function() {
  return UserMeetings.find();
});

Meteor.publish('timeslots', function() {
    return Timeslots.find();
});

Meteor.publish('users', function() {
    return Meteor.users.find();
});
Meteor.publish('poll', function() {
    return poll.find();
});
