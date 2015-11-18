/**
 * Created by Tharun on 10/18/2015.
 */
Timeslots = new Meteor.Collection('timeslots');
Meeting = new Meteor.Collection('meeting');
UserMeetings = new Mongo.Collection('usermeetings');
Poll = new Mongo.Collection('poll');
GuestDetails = new Meteor.Collection('guestdetails');
GuestMeetings = new Meteor.Collection('guestmeetings');

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
            /*afFieldInput: {
            type: "bootstrap-datepicker",
                datePickerOptions: {
                multidate: true,
                autoclose: true
                }
            }*/
            type: "bootstrap-datepicker",
            datePickerOptions: {
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
UserMeetings.attachSchema(Schema.UserMeetings);

Schema.GuestDetails = new SimpleSchema({
    name: {
        type: String
    },
    email: {
        type: String,
        regEx: SimpleSchema.RegEx.Email
    }
});
GuestDetails.attachSchema(Schema.GuestDetails);

Schema.GuestMeetings = new SimpleSchema({
    guestid: {
        type: String
    },
    meetingid: {
        type: String
    }
});
GuestMeetings.attachSchema(Schema.GuestMeetings);

/*
Schema.dateSlotPair = new SimpleSchema({
    date:{
       type: String
    },
    slots:{
        type:Array
    },
    'slots.$': {
    type: Object
    },
    'slots.$.time': {
    type: String
    },
    'slots.$.slot':{
    type: String
}
});
Schema.Timeslots = new SimpleSchema({
   meetingId:{
       type:String
   },
    dateSlotPair:{
        type:Schema.dateSlotPair
    }
});
Timeslots.attachSchema(Schema.dateSlotPair);
*/
/*

Schema.Poll = new SimpleSchema({
    meetingid:{
       type: String
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
    'participants.$.status':{
        type: String
    }
});
Poll.attachSchema(Schema.Poll);
*/
