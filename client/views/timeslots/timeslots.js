Template.timeslotsInformation.onRendered(function() {
    this.$('.datetimepicker').datetimepicker();
});
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

    participant_list = new Array();
    for (i=0; i< meeting_details.participants.length; i++)
    {
        var email = meeting_details.participants[i].email;
        participant_list.push({email: email, status: "None"});
        console.log(email)
        options['to'] = email
        //emailData['url'] = Meteor.absoluteUrl() + 'poll?' + 'meeting_id='
        // + result +'&email=' + email;
        emailData['url'] = Meteor.absoluteUrl() + 'poll/' + result +'/' + email;
        console.log(emailData['url'])
        console.log('emailData:', emailData)
        var html = Blaze.toHTMLWithData(Template.email_notification, emailData);
        options['html'] = html;
        console.log('calling sendEmail')
        Meteor.call('sendEmail', options);
    }
    return participant_list;
}

Template.timeslotsInformation.events({
    "click #timeSlotsSubmit": function (event, template) {
        var selected = template.findAll("input[type=checkbox]:checked");
        var expiryDate = template.find("input[type=text]");
        console.log(expiryDate.value);

        if (expiryDate.value === ""){
            $("#errorMessageExpiryDate").show();
            return false;
        }
        $("#errorMessageExpiryDate").hide();
        if (selected.length == 0) {
            $("#errorMessageTimeslots").show();
            return false;
        }
        $("#errorMessageTimeslots").hide();
        var meetingId = template.find("#meetingIdElement").name;
        var time = ["12-1 AM","1-2 AM", "2-3 AM", "3-4 AM", "4-5 AM", "5-6 AM", "6-7 AM", "7-8 AM", "8-9 AM", "9-10 AM",
            "10-11 AM", "11-12 PM", "12-1 PM","1-2 PM","2-3 PM","3-4 PM", "4-5 PM", "5-6 PM", "6-7 PM", "7-8 PM", "8-9 PM",
            "9-10 PM", "10-11 PM", "11-12 AM"];

        var pair = new Array();
        var end_date = new Date(expiryDate.value);
        console.log("End Date");
        console.log(end_date);
        //var pair = {};
        var dateSlotPair = _.map(selected, function (item) {

            pair.push({time: time[parseInt(item.className) - 1], slot: item.className, votes: 1});
            //pair.push({date: item.value,time: time[parseInt(item.className) - 1], slot: item.className});
            //pair.push({slot: item.className});
            return {date:item.value,expiry_date:end_date,slots:pair };
        });
        console.log(dateSlotPair[0]);
        var timeslot = new Array();
        timeslot.push({dateSlotPair: dateSlotPair[0]});
        //dateSlotPair has three elements instead of one. All three are duplicates.
        Timeslots.insert({
            meetingId: meetingId,
            expiry_date: end_date,
            email_sent: false,
            timeslots: timeslot
        });
        participants = send_email(meetingId);
        Poll.insert({
            meetingId: meetingId,
            participants: participants
        });
        console.log(participants);
        Router.go('viewMeeting', {_id: meetingId});
    },
    "click #closeErrorTimeslots": function (event, template) {
        $("#errorMessageTimeslots").hide();
    },
    "click #closeErrorExpiry": function (event, template) {
        $("#errorMessageExpiryDate").hide();
    }
});
UI.registerHelper("prettifyDate", function (timestamp) {
    var alldates = new Date(timestamp);
    alldates.setDate(alldates.getDate()+1);
    return alldates.toDateString();
});
