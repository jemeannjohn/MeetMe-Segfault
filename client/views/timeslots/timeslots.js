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
        var meetingId = template.find("input[type=hidden]").name;
        var time = ["12-1 AM","1-2 AM", "2-3 AM", "3-4 AM", "4-5 AM", "5-6 AM", "6-7 AM", "7-8 AM", "8-9 AM", "9-10 AM",
            "10-11 AM", "11-12 PM", "12-1 PM","1-2 PM","2-3 PM","3-4 PM", "4-5 PM", "5-6 PM", "6-7 PM", "7-8 PM", "8-9 PM",
            "9-10 PM", "10-11 PM", "11-12 AM"];

        var pair = new Array();

        //var pair = {};
        var dateSlotPair = _.map(selected, function (item) {

            pair.push({time: time[parseInt(item.className) - 1], slot: item.className, votes: 1});
            //pair.push({date: item.value,time: time[parseInt(item.className) - 1], slot: item.className});
            //pair.push({slot: item.className});
            return {date:item.value,expiry_date:expiryDate,slots:pair };
        });
        console.log(dateSlotPair[0]);
        var timeslot = new Array();
        timeslot.push({dateSlotPair: dateSlotPair[0]});
        //dateSlotPair has three elements instead of one. All three are duplicates.
        Timeslots.insert({
            meetingId: meetingId,
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
    //"change .all": function (event, template) {
    //    if( $(event.target).is(":checked") ) {
    //        var amOrPm = $(event.target).attr('value');
    //        var allCheckboxes = template.findAll("input[type=checkbox]");
    //        console.log(allCheckboxes);
    //        var allids = _.pluck(allCheckboxes, 'className');
    //        alert(allids);
    //        if (name == "AM") {
    //            for(var i=0;i<allids.length;i++){
    //                if(allCheckboxes[i].id<12){
    //
    //                }
    //            }
    //        }
    //    }
    //},
    "click #closeError": function (event, template) {
        $("#errorMessageTimeslots").hide();
    },
    "click #authorize-button": function (event, template) {
        var SCOPES = ["https://www.googleapis.com/auth/calendar.readonly"];
        var CLIENT_ID = '379128109747-tfrqdiuvmaeq7m46ojahtfcdgavkv0e3.apps.googleusercontent.com';
        //var CLIENT_ID = Meteor.call('getCalendarClientId');
        gapi.auth.authorize(
            {client_id: CLIENT_ID, scope: SCOPES, immediate: false},
            handleAuthResult);
        return false;
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
function checkAuth() {
    gapi.auth.authorize(
        {
            'client_id': CLIENT_ID,
            'scope': SCOPES.join(' '),
            'immediate': true
        }, handleAuthResult);
}
function handleAuthResult(authResult) {
    var authorizeDiv = document.getElementById('authorize-div');
    if (authResult && !authResult.error) {
        // Hide auth UI, then load client library.
        authorizeDiv.style.display = 'none';
        loadCalendarApi();
    } else {
        // Show auth UI, allowing the user to initiate authorization by
        // clicking authorize button.
        authorizeDiv.style.display = 'inline';
    }
}
function handleAuthClick(event) {
    var SCOPES = ["https://www.googleapis.com/auth/calendar.readonly"];
    var CLIENT_ID = '379128109747-tfrqdiuvmaeq7m46ojahtfcdgavkv0e3.apps.googleusercontent.com';
    gapi.auth.authorize(
        {client_id: CLIENT_ID, scope: SCOPES, immediate: false},
        handleAuthResult);
    return false;
}
function loadCalendarApi() {
    gapi.client.load('calendar', 'v3', listUpcomingEvents);
}
function listUpcomingEvents() {
    var request = gapi.client.calendar.events.list({
        'calendarId': Meteor.user().services.google.email,
        'timeMin': (new Date()).toISOString(),
        'showDeleted': false,
        'singleEvents': true,
        'maxResults': 10,
        'orderBy': 'startTime'
    });

    request.execute(function(resp) {
        var events = resp.items;
        appendPre('Upcoming events:');

        if (events.length > 0) {
            for (i = 0; i < events.length; i++) {
                var event = events[i];
                var when = event.start.dateTime;
                if (!when) {
                    when = event.start.date;
                }
                appendPre(event.summary + ' (' + when + ')')
            }
        } else {
            appendPre('No upcoming events found.');
        }

    });
}
function appendPre(message) {
    var pre = document.getElementById('output');
    var textContent = document.createTextNode(message + '\n');
    pre.appendChild(textContent);
}
