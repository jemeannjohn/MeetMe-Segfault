var Collections = {};

Template.registerHelper("Collections", Collections);

People = Collections.People = new Mongo.Collection("People");
People.attachSchema(Schemas.Person);

MeetingDetails = Collections.MeetingDetails = new Mongo.Collection("MeetingDetails");
MeetingDetails.attachSchema(Schemas.Meeting);

Meteor.publish(null, function () {
    return MeetingDetails.find();
});
MeetingDetails.allow({
    insert: function () {
        console.log("inside insert");
        return true;
    },
    update: function () {
        return true;
    },
    remove: function () {
        return true;
    }
});