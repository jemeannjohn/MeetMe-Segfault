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
        console.log('Inside sending an email');
        meeting_details = Meeting.findOne({_id:result});
        emailData = {}
        emailData['title'] = meeting_details.title;
        emailData['description'] = meeting_details.description;
        emailData['url'] = 'http://www.google.com';
        //emailData['meeting_id'] = result
        console.log(meeting_details)
        //console.log(to.participants[0].email)
        console.log('Meteor', Meteor.absoluteUrl())
        var options = {
            from: "no-reply@meetme.com",
            subject: "MeetMe - New Meeting Request!",
        };
        emailData['date'] = '';
        for (i = 0; i<meeting_details.date.length; i++)
            emailData['date'] += meeting_details.date[i] + ', '
        emailData['date'] = emailData['date'].slice(0, -2);

        for (i=0; i< meeting_details.participants.length; i++)
        {
            var email = meeting_details.participants[i].email;
            console.log(email)
            options['to'] = email
            emailData['url'] = Meteor.absoluteUrl() + 'poll?' + 'meeting_id=' + result +'&email=' + email;
            console.log(emailData['url'])
            console.log('emailData:', emailData)
            var html = Blaze.toHTMLWithData(Template.email_notification, emailData);
            options['html'] = html;
            console.log('calling sendEmail')
            Meteor.call('sendEmail', options);
        }
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
