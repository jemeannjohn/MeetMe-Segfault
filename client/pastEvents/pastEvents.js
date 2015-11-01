/**
 * Created by VISHAL on 10/31/2015.
 */

if (Meteor.isClient) {
    // This code only runs on the client
    Template.pastEvents.helpers({
        past: function () {
            console.log("inside past");
            var x = Meeting.find({date : {$lt : new Date()}}, {sort: { date: 1 }}).fetch();
            console.log(x);
            //return x;
            var data = []
            for (i = 0; i < x.length; i++) {
                x[i]["id2"] = "#" + x[i]._id;


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