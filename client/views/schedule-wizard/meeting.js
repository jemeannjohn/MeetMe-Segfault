/**
 * Created by Tharun on 10/21/2015.
 */

if (Meteor.isClient) {
    Meteor.startup(function () {
        AutoForm.setDefaultTemplate("semanticUI");

        Template.afCheckbox_semanticUI.onRendered(function () {
            $(this.firstNode).checkbox();
        });
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
    Template.viewMeeting.helpers({

    })
    function send_email(result)
    {
        console.log('Inside sending an email')
        list = [];
        to = Meeting.findOne({_id:result});
        emailData = {}
        emailData['title'] = to.title;
        emailData['description'] = to.description;
        emailData['date'] = to.date
        console.log(to)
        console.log(to.participants[0].email)

        for (i=0; i< to.participants.length; i++)
            list.push(to.participants[i].email)
        //console.log('inside send email function');
        console.log('list', list)
        Meteor.call('sendEmail',
            list,
            "no-reply@meetme.com",
            "MeetMe - New Meeting Request!",
            "You have a new meeting request. Please find the details below!", emailData);

    }
    function meeting_alert()
    {
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
            a = meeting_alert()
            if (!a)
            {
                Meeting.remove({_id:result})
                return false
            }
            send_email(result)
            Router.go('viewMeeting', {_id: result});
        },
        onError: function (formType, error) {
            console.log("ERROR:", error);
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
