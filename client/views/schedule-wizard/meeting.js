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

    AutoForm.addHooks(['newMeetingWizard', 'editMeetingWizard'], {
        onSuccess: function (formType, result) {
            console.log("SUCCESS:", result);
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
