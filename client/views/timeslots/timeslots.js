Template.timeslotsInformation.events({
    "click #timeSlotsSubmit": function (event, template) {
        var selected = template.findAll("input[type=checkbox]:checked");
        var meetingId=template.find("input[type=hidden]").name;
        var dateSlotPair = _.map(selected, function(item) {
            var pair=new Array();
            pair.push({date: item.value});
            pair.push({slot: item.className});
            return pair;
        });
        Timeslots.insert({
            meetingId: meetingId,
            dateSlotPair: dateSlotPair
        });
    }
});
UI.registerHelper("prettifyDate", function (timestamp) {
    var alldates = new Date(timestamp);
    var month = new Array();
    month[0] = "Jan";
    month[1] = "Feb";
    month[2] = "Mar";
    month[3] = "Apr";
    month[4] = "May";
    month[5] = "Jun";
    month[6] = "Jul";
    month[7] = "Aug";
    month[8] = "Sep";
    month[9] = "Oct";
    month[10] = "Nov";
    month[11] = "Dec";
    var monthname = month[alldates.getMonth()];
    return alldates.getDate().toString() + " " + monthname.toString() + " " + alldates.getFullYear().toString();
});
