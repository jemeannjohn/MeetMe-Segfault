Orders = new Meteor.Collection('orders');

Schema = {};

Schema.contactInformation = new SimpleSchema({
    name: {
        type: String,
        label: 'Name'
    },
    address: {
        type: String,
        label: 'Address'
    },
    zipcode: {
        type: String,
        label: 'Zipcode'
    },
    city: {
        type: String,
        label: 'City',
        optional: true
    }
});

Schema.paymentInformation = new SimpleSchema({
    paymentMethod: {
        type: String,
        label: 'Payment method',
        allowedValues: ['credit-card', 'bank-transfer'],
        autoform: {
            options: [{
                label: 'Credit card',
                value: 'credit-card'
            }, {
                label: 'Bank transfer',
                value: 'bank-transfer'
            }]
        }
    },
    acceptTerms: {
        type: Boolean,
        label: 'I accept the terms and conditions.',
        autoform: {
            label: false
        },
        autoValue: function () {
            if (this.isSet && this.value !== true) {
                this.unset();
            }
        }
    }
});

Schema.Orders = new SimpleSchema({
    contactInformation: {
        type: Schema.contactInformation
    },
    paymentInformation: {
        type: Schema.paymentInformation
    }
});

Orders.attachSchema(Schema.Orders);

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

    AutoForm.addHooks(['newOrderWizard', 'editOrderWizard'], {
        onSuccess: function (formType, result) {
            console.log("SUCCESS:", result);
            Router.go('viewOrder', {_id: result});
        },
        onError: function (formType, error) {
            console.log("ERROR:", error);
        }
    });
}

Router.configure({
    layoutTemplate: 'layout'
});

Router.route('/', function () {
    this.redirect('newOrder');
});

Router.route('/order/new/:step?', {
    name: 'newOrder'
});

Router.route('/order/:_id', {
    name: 'viewOrder',
    data: function () {
        return Orders.findOne(this.params._id);
    }
});

Router.route('/order/:_id/edit/:step?', {
    name: 'editOrder',
    data: function () {
        return Orders.findOne(this.params._id);
    }
});
