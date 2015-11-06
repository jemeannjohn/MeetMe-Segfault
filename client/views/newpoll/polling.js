/**
 * Created by Tharun on 11/4/2015.
 */
Template.pollpage.helpers({
    meeting: function () {
        console.log( Timeslots.find({"_id": "dKo89M3umFhpm77XT"}));
        return Timeslots.find({"_id": "dKo89M3umFhpm77XT"});
        //return Timeslots.find({},{fields:{'dateSlotPair':1}});
    },
    slots:function(){
        return Timeslots.find({},{fields:{'slots':1}});
    }
});
Template.registerHelper('FormatDate', function(date){
    return moment(date).format("MM/DD/YYYY")
});

Template.pollpage.events({
    "click #timeSlotsSubmit": function (event, template) {
        var selected = template.findAll("input[type=checkbox]:checked");
        if (selected.length == 0) {
            $("#errorMessageTimeslots").show();
            return false;
        }
        $("#errorMessageTimeslots").hide();
        var meetingId = template.find("input[type=hidden]").name;
        var time = ["12-1 AM", "1-2 AM", "2-3 AM", "3-4 AM", "4-5 AM", "5-6 AM", "6-7 AM", "7-8 AM", "8-9 AM", "9-10 AM",
            "10-11 AM", "11-12 PM", "12-1 PM", "1-2 PM", "2-3 PM", "3-4 PM", "4-5 PM", "5-6 PM", "6-7 PM", "7-8 PM", "8-9 PM",
            "9-10 PM", "10-11 PM", "11-12 AM"];

        var pair = new Array();
        var dateSlotPair = _.map(selected, function (item) {

            pair.push({time: time[parseInt(item.className) - 1], slot: item.className});
            return {date: item.value, slots: pair};
        });
        console.log(dateSlotPair[0]);
        var timeslot = {dateSlotPair: dateSlotPair[0]};
        //dateSlotPair has three elements instead of one. All three are duplicates.
        Timeslots.insert({
            meetingId: meetingId,
            timeslots: timeslot
        });
    },
    "click #closeError": function (event, template) {
        $("#errorMessageTimeslots").hide();
    }
});