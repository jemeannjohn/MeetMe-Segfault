/**
 * Created by Tharun on 10/18/2015.
 */
Timeslots = new Meteor.Collection('timeslots');
Meeting = new Meteor.Collection('meeting');
UserMeetings = new Mongo.Collection('usermeetings')

Schema = {};

Schema.Meeting = new SimpleSchema({

    title: {
        type: String,
        index: 1
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
        type: [Date],
        autoform: {
            //patch for multidate array. Works okay. But datepicker raising
            // some problems.
            //afFieldInput: {
            //type: "bootstrap-datepicker",
            //    datePickerOptions: {
            //    multidate: true,
            //    autoclose: true}
            //}
            type: "bootstrap-datepicker",
            datePickerOptions: {
                multidate: true,
                autoclose: true
            }
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
        type: String,
        regEx: SimpleSchema.RegEx.Email
    },
    finalized : {
        type: Boolean
    }
});
Meeting.attachSchema(Schema.Meeting);

Schema.UserMeetings = new SimpleSchema({
    userid: {
        type: String
    },
    meetingid: {
        type: String
    }
});
UserMeetings.attachSchema(Schema.UserMeetings)