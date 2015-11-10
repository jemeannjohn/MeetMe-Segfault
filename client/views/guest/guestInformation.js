/**
 * Created by VISHAL on 11/7/2015.
 */

AutoForm.hooks({
    submitPostForm: {
        onSuccess: function(operation, post) {
            console.log("congrats success!")
            Router.go("timeslotsInformation", {_id: "guest"});
        }
    }
});

if (Meteor.isClient) {

    /*Template.guestInformation.helpers({
        onSubmit: function () {
            console.log("inside on submit of guest");
        }
    })*/
    AutoForm.addHooks(['postInsert', 'postUpdate'], {
        onSuccess: function(operation, result, template) {

            Router.go("timeslotsInformation");
        },
        onSubmit: function(){
            console.log("inside onsubmit");
        }
    });


    /*Meteor.startup(function () {
        AutoForm.setDefaultTemplate("semanticUI");

        //Template.afCheckbox_semanticUI.onRendered(function () {
        //    $(this.firstNode).checkbox();
        //});
    });

    Template.registerHelper('Schema', function () {
        return Schema;
    });*/


    /*AutoForm.addHooks(['newMeetingWizard', 'editMeetingWizard'], {
        onSuccess: function (formType, result) {
            console.log("SUCCESS:", result);
            //a = meeting_alert();
            //if (!a) {
            //    Meeting.remove({_id: result});
            //    return false;
            //}
            /!*Meeting.update(result, {
             $set: {userid: "myuserid"}
             },  {validate: false});*!/
            /!*UserMeetings.insert({
                userid: Meteor.userId(),
                meetingid: result
            });*!/
            //send_email(result);
            Router.go('timeslotsInformation', {_id: result});
        },
        onError: function (formType, error) {
            console.log("ERROR:", error);
        },
        onSubmit: function (data, wizard) {
            var self = this;
            GuestDetails.insert(_.extend(wizard.mergedData(), data), function (err, id) {
                //console.log(wizard.mergedData());
                //wizard.mergedData().userid = "myuserid";
                //this.done();
                console.log("merged data" + wizard.mergedData())
                if (err) {
                    console.log("error onsubmit inserion");
                    self.done();
                } else {
                    self.done();
                }
            });
        }
    });*/

}