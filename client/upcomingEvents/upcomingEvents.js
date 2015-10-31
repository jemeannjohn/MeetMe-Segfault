/**
 * Created by VISHAL on 10/31/2015.
 */

if (Meteor.isClient) {
    // This code only runs on the client
    Template.upcomingEvents.helpers({
        upcoming: function () {
            console.log("inside upcoming");
            var x = Meeting.find({}).fetch();
            console.log(x);
            return x;
            //var x = Meteor.users.find({_id: Meteor.userId()}).fetch();
            /*console.log(x);
             var temp = x[0].username;
             console.log(temp);*/
            //var record = usersList.find({ name: "Penny"}).fetch();
            //console.log("record= "+record);
        }
    });

}