/**
 * Created by VISHAL on 10/31/2015.
 */

if (Meteor.isClient) {
    // This code only runs on the client
    Template.pastEvents.helpers({
        past: function () {
            console.log("inside past");
            var x = Meeting.find({date : {$lt : new Date()}}, {sort: { date: 1 }}).fetch();
            var y = UserMeetings.find({userid : Meteor.userId()}).fetch();

            console.log(y);
            console.log(x);
            //return x;
            var data = [];
            var flag = 0;
            for (i = 0; i < x.length; i++) {
                flag = 0;
                for (j = 0; j < y.length; j++) {
                    if (x[i]._id == y[j].meetingid) {
                        x[i]["id2"] = "#" + x[i]._id;
                        flag = 1;
                    }
                }
                if (flag == 0) {
                    delete x[i];
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