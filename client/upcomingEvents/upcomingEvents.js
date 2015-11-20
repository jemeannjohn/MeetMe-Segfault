/**
 * Created by VISHAL on 10/31/2015.
 */

if (Meteor.isClient) {
    // This code only runs on the client
    Template.upcomingEvents.helpers({
        upcoming: function () {
            console.log("inside upcoming");
            console.log(new Date());
            var x = Meeting.find({date : {$gte : new Date()}}, {sort: { date: 1 }}).fetch();
            var y = UserMeetings.find({userid : Meteor.userId()}).fetch();
            var z = MeetingConfirmed.find().fetch({date : {$gte : new Date()}});

            console.log(z);
            console.log(y);
            console.log(x);
            //return x;
            var data = [];
            var flag = 0;
            for (i = 0; i < z.length; i++) {
                flag = 0;
                for (j = 0; j < y.length; j++) {
                    if (z[i].meetingId == y[j].meetingid) {
                        z[i]["id2"] = "#" + z[i]._id;
                        flag = 1;
                    }
                }
                if (flag == 0) {
                    delete z[i];
                }


            }

            /*data = [{
             'id1' : '#collapse1',
             'id2' : 'collapse1',
             'title': 'abc',
             'description': 'xyz',
             'email': 'abc@gb.com'

             },
             {
             'id1' : '#collapse2',
             'id2' : 'collapse2',
             'title': 'abc2',
             'description': 'xyz2',
             'email': 'abc@gb.com'

             }]*/
            return z;
            //var x = Meteor.users.find({_id: Meteor.userId()}).fetch();
            /*console.log(x);
             var temp = x[0].username;
             console.log(temp);*/
            //var record = usersList.find({ name: "Penny"}).fetch();
            //console.log("record= "+record);
        }
    });

}