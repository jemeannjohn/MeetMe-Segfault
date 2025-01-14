/**
 * Created by Tharun on 11/4/2015.
 */
Template.pollpage.helpers({
    meeting: function () {
        //console.log( Timeslots.find({"_id": "dKo89M3umFhpm77XT"}));
        //return Timeslots.find({"_id": "dKo89M3umFhpm77XT"});
        //PGrdK8Z5gGsrKKZCx
        //console.log( Timeslots.find({"meetingId": "QTeT5vZpCKea7rxya"}));
        //return Timeslots.find({"meetingId": "QTeT5vZpCKea7rxya"});
        console.log(meetingId);
        console.log(email);
        console.log("Returned obj");
        console.log(Timeslots.find({"meetingId": this.params.meetingId}));
        return Timeslots.find({"meetingId": this.params.meetingId});
        //return Timeslots.find({},{fields:{'dateSlotPair':1}});
    },
    hasNotVoted: function () {
        var meetingId = Router.current().params.meetingId;
        var participant_email = Router.current().params.email;
        var notVoted=true;
        Poll.find({meetingId: meetingId})
        .forEach(function (doc) {
                doc.participants.forEach(function (participant) {
                    if (participant.email === participant_email && (participant.status === "Coming" || participant.status === "Not Coming" )){
                        notVoted = false;
                    }
                });
            });
        return notVoted;
    }

});

Template.registerHelper('FormatDate', function(date){
    return moment(date).format("MM/DD/YYYY")
});

Template.pollpage.events({
    "click #preferredtimeSlotsSubmit": function (event, template) {
        var selected = template.findAll("input[type=checkbox]:checked");
        if (selected.length == 0) {
            $("#errorMessageTimeslots").show();
            return false;
        }
        $("#errorMessageTimeslots").hide();
        //var meetingId = template.find("input[type=hidden]").name;
        //var meetingId = this.params.meetingId;
        var meetingId = template.find("input#meetingId").name;
        var participant_email = Router.current().params.email;
        console.log(meetingId);
        console.log("Email"+ participant_email);
        var time = ["12-1 AM", "1-2 AM", "2-3 AM", "3-4 AM", "4-5 AM", "5-6 AM", "6-7 AM", "7-8 AM", "8-9 AM", "9-10 AM",
            "10-11 AM", "11-12 PM", "12-1 PM", "1-2 PM", "2-3 PM", "3-4 PM", "4-5 PM", "5-6 PM", "6-7 PM", "7-8 PM", "8-9 PM",
            "9-10 PM", "10-11 PM", "11-12 AM"];
        var pair = new Array();
        var selectedslots = _.map(selected, function (item) {

            pair.push(item.className);
            return {date: item.value, slots: pair};
        });
        console.log(selectedslots[0].slots);

        Timeslots.find({meetingId: meetingId })
            .forEach(function (doc) {
                doc.timeslots.forEach(function (pair) {
                    console.log("Inside timeslots");
                    console.log(pair);
                    console.log(pair.dateSlotPair.date);
                    console.log(pair.dateSlotPair.slots);
                    pair.dateSlotPair.slots.forEach(function(slot) {
                        if (_.contains(selectedslots[0].slots,slot.slot)) {
                            console.log("Slot is selected");
                            slot.votes += 1;
                            console.log("Votes incremented to "+slot.votes);

                        }
                        console.log(pair);

                    });

                });
                Timeslots.remove({_id:doc._id});
                console.log("Saved Document");
                Timeslots.insert(doc);
                console.log(doc);

            });
        //Workaround since updating from client not working.
        Poll.find({meetingId: meetingId})
        .forEach(function (doc) {
                doc.participants.forEach(function (participant) {
                    if (participant.email === participant_email){
                        participant.status = "Coming"
                    }
                });
                console.log("Remove Poll");
                Poll.remove({_id:doc._id});
                console.log("Saved Poll");
                Poll.insert(doc);
                console.log(doc);
            });

        //The below statement should work but is not working. Error:
        // Untrusted code.
        //Poll.update({"meetingId":meetingId, "participants.email":
        // participant_email},{$set: {"participants.$.status":true}});
    },
    "click #closeError": function (event, template) {
        $("#errorMessageTimeslots").hide();
    },
    "click #cannotMakeItButton": function (event, template) {
        var meetingId = template.find("input#meetingId").name;
        var participant_email = Router.current().params.email;

        Poll.find({meetingId: meetingId})
            .forEach(function (doc) {
                doc.participants.forEach(function (participant) {
                    if (participant.email === participant_email){
                        participant.status = "Not Coming"
                    }
                });
                console.log("Remove Poll");
                Poll.remove({_id:doc._id});
                console.log("Saved Poll");
                Poll.insert(doc);
                console.log(doc);
            });

    }
});