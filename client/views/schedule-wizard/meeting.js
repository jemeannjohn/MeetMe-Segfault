/**
 * Created by Tharun on 10/21/2015.
 */

if (Meteor.isClient) {
    Meteor.startup(function () {
        AutoForm.setDefaultTemplate("semanticUI");

        //Template.afCheckbox_semanticUI.onRendered(function () {
        //    $(this.firstNode).checkbox();
        //});
    });

    Template.registerHelper('Schema', function () {
        return Schema;
    });

    Template.steps.helpers({
        stepClass: function (id) {
            var activeStep = this.wizard.activeStep();
            var step = this.wizard.getStep(id);
            if (activeStep && activeStep.id === id) {
                return 'active';
            }
            if (step.data()) {
                return 'completed';
            }
            return 'disabled';
        }
    });

    Template.viewMeeting.helpers({})

    function meeting_alert() {
        if (confirm("Are you sure you want to schedule a meeting?") == true) {
            console.log('You clicked ok')
            return true
        } else {
            console.log('You clicked cancel')
            return false
        }
    }

    AutoForm.addHooks(['newMeetingWizard', 'editMeetingWizard'], {
        onSuccess: function (formType, result) {
            console.log("SUCCESS:", result);
            //a = meeting_alert();
            //if (!a) {
            //    Meeting.remove({_id: result});
            //    return false;
            //}
            /*Meeting.update(result, {
             $set: {userid: "myuserid"}
             },  {validate: false});*/
            UserMeetings.insert({
                userid: Meteor.userId(),
                meetingid: result
            });
            //send_email(result);
            Router.go('timeslotsInformation', {_id: result});
        },
        onError: function (formType, error) {
            console.log("ERROR:", error);
        },
        onSubmit: function (data, wizard) {
            var self = this;
            Meeting.insert(_.extend(wizard.mergedData(), data), function (err, id) {
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
    });

}

/*
 Router.configure({
 layoutTemplate: 'layout'
 });

 Router.route('/', function () {
 this.redirect('newMeeting');
 });
 */
