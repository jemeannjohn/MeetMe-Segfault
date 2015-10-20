/**
 * Created by Tharun on 10/18/2015.
 */

Schemas = {};

Template.registerHelper("Schemas", Schemas);

Schemas.Person = new SimpleSchema({
    firstName: {
        type: String,
        index: 1,
        unique: true
    }
});

Schemas.myDate = new SimpleSchema({
    date: {
        type: Date,
        autoform: {
            type: "bootstrap-datepicker",
            datePickerOptions: {
                multidate: true,
                autoclose: true}
        }
    }

});
Schemas.Date = new SimpleSchema(
{
    typeTest: {
        type: String,
            optional: true,
            autoform: {
            afFieldInput: {
                type: "bootstrap-datetimepicker"
            }
        }
    }

});

Schemas.Meeting = new SimpleSchema({
        title: {
            type: String,
            index: 1,
            unique: true
        },
        description: {
            type: String,
            index: 1,
            max: 2000,
            autoform: {
                rows: 5
            }
        },
        date: {
        type: Date,
        autoform: {
            type: "bootstrap-datepicker",
            datePickerOptions: {
                multidate: true,
                autoclose: true}
        }
        },
        participants: {
            type: Array,
            optional: true
        },
        'participants.$': {
            type: Object
        },
        'participants.$.email': {
            type: String
        },

});
