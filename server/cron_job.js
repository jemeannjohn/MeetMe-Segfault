/**
 * Created by Nitesh on 11/3/15.
 */
//SyncedCron.config({
//    // Log job run details to console
//    log: true,
//
//    // Use a custom logger function (defaults to Meteor's logging package)
//    logger: null,
//
//    // Name of collection to use for synchronisation and logging
//    collectionName: 'cronHistory',
//
//    // Default to using localTime
//    utc: false,
//
//    /*
//     TTL in seconds for history records in collection to expire
//     NOTE: Unset to remove expiry but ensure you remove the index from
//     mongo by hand
//
//     ALSO: SyncedCron can't use the `_ensureIndex` command to modify
//     the TTL index. The best way to modify the default value of
//     `collectionTTL` is to remove the index by hand (in the mongo shell
//     run `db.cronHistory.dropIndex({startedAt: 1})`) and re-run your
//     project. SyncedCron will recreate the index with the updated TTL.
//     */
//    collectionTTL: 172800
//});
// Not taken care for leap year
//
SyncedCron.add({

    name: 'Reminder_for_Event',
    schedule: function (parser) {
        return parser.recur().on('08:00:00').time();
        //return parser.recur().every(1).minute();
    },
    job: function () {
        //var today = new Date();
        var tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate()+1)
        tomorrow = new Date (tomorrow)
        console.log('tomorrow: ' + tomorrow)

        var month = tomorrow.getMonth() + 1
        if (month < 11)
            month = '0' + month;
        var day = tomorrow.getDate();
        if (day < 11)
            day = '0' + day;
        tomorrow = tomorrow.getFullYear() + '-' + month + '-' + day + "T00:00:00.000Z";
        console.log('tomo string: '+tomorrow)
        tomorrow = new Date (tomorrow)

        //console.log(today.getFullYear());
        //console.log(today.getDate());
        //console.log(today.getMonth());

        console.log('tomorrow: ' + tomorrow);
        //console.log('tomo: ' + tomorrow);

        console.log("Sending an email...using cron job for date: "+ tomorrow);
        //for now hardcoding this value....
        //result = 'faeAhCdiMZtCSak4F';
        //emailData = {}
        var meeting_details = Meeting.find({date: tomorrow}).fetch();
        console.log(meeting_details)
        var len = Meeting.find({date: tomorrow}).count();
        console.log('No meeting for tomorrow, len:'+len);
        //window.alert(meeting_details)
        //console.log(meeting_details[3].participants[0].email);
        if (len)
        {
        for (var i = 0; i < len; i++)
        {
            //console.log('Inside loop' + meeting_details[i])
            var title = meeting_details[i].title;
            var description = meeting_details[i].description;
            var meeting_date = ''
            for (var j = 0; j < meeting_details[i].date.length; j++)
                meeting_date += meeting_details[i].date[j] + ', '
            meeting_date = meeting_date.slice(0, -2);
            //var html = Blaze.toHTMLWithData(Template.meeting_reminder, emailData);
            var text = "Title: " + title + '\n' + 'Description: ' + description + '\n' + 'Date: ' + meeting_date + '\n'
            //var html = SSR.render('meeting_reminder', {result:'faeAhCdiMZtCSak4F' } );
            //console.log(html);
            var to = [];
            var e_len = meeting_details[i].participants.length;
            //console.log(e_len);
            for (j = 0; j < meeting_details[i].participants.length; j++)
            {
                var email = meeting_details[i].participants[j].email;
                //console.log(email)
                to.push(email)
                console.log('--------getting emails-------')

            }
            var options = {
                to: to,
                from: "no-reply@meetme.com",
                subject: "MeetMe - Reminder for tomorrow's Event!",
                text: text
            };
            //console.log(options)
            console.log('calling sendEmail()')
            Meteor.call('sendEmail', options);
        }
        }
    }


});


SyncedCron.add({
    name: 'Final_Email_Confirmation',
    schedule: function (parser) {
        //return parser.recur().on('08:00:00').time();
        return parser.recur().every(1).minute();
    },
    job: function(){
        var now = new Date();
        var final_email_list = Timeslots.find({ $and : [{expiry_date : { $lte : now} }, {email_sent: false}]}).fetch();
        //console.log('Final list: ', final_email_list[0]);
        var l = final_email_list.length;
        console.log("length:"+ l);
        if (l)
        {
            console.log('meeting id: ',final_email_list[0].meetingId )
            for (i = 0; i<l; i++)
            {
                var mID = final_email_list[i].meetingId
                console.log('meeting id inside: '+ mID );
                var m_details = Meeting.findOne({_id: mID});
                console.log( "m_details:"+ m_details);
                var all_emails = Poll.findOne({meetingId : mID})
                console.log( "all_emails:"+ all_emails);
                var participants = all_emails.participants;
                var to = []
                var meeting_date = ''
                var reject = []
                for (var j = 0; j < m_details.date.length; j++)
                     meeting_date += m_details.date[j] + ', '
                meeting_date = meeting_date.slice(0, -2);
                console.log('meeting date: ', meeting_date);

                for (j = 0; j<participants.length; j++)
                {
                    if(participants[j].status == "Coming" || participants[j].status == "None")
                    {
                        to.push(participants[j].email)
                        console.log(participants[j].email)
                    }
                    else
                    {
                        reject.push(participants[j].email)
                    }
                }
                // determining maximum votes
                console.log('done with emails')
                console.log(final_email_list[i].timeslots[0]);
                var all_slots = final_email_list[i].timeslots[0].dateSlotPair.slots;
                var max_index = 0
                var max_value = 1
                max_value = all_slots[0].votes
                for (var k = 1; k < all_slots.length; k++)
                {
                    if(all_slots[k].votes > max_value)
                    {
                        max_value = all_slots[k].votes
                        max_index = k
                    }
                }
                var time =  all_slots[max_index].time
                var text = "Title: " + m_details.title + '\n' + 'Description: ' + m_details.description + '\n' + 'Date: ' + meeting_date + '\n' + 'Time: ' + time +'\n'

                if (to.length == 0) // Meeting will be cancelled
                {
                    var text = 'Following meeting has been cancelled since no one is free during the proposed time slots. Please take a note of this!' + '\n\n' + text
                    var sub = 'MeetMe - Meeting cancelled'
                    to = reject
                }
                else
                {
                    var text = 'Meeting has been finalized, Please find the details below:' + '\n\n' + text
                    var sub = 'MeetMe - Meeting Scheduled'
                    console.log('Inserting into confirmed table');
                    MeetingConfirmed.insert(
                        {
                            meetingId: mID,
                            date: meeting_date,
                            time: time,
                            title: m_details.title,
                            description:  m_details.description,
                            participants: to
                        });
                }
                //console.log('to:'+ to);
                Timeslots.update({meetingId: mID},{$set: {email_sent: true}})
                console.log('text: '+text);
                var options = {
                    to: to,
                    from: "no-reply@meetme.com",
                    subject: sub,
                    text: text
                };
                console.log('calling sendEmail()')
                Meteor.call('sendEmail', options);
            }

        }
    }

});
/**
 * Created by Nitesh on 11/6/15.
 */
//SSR.compileTemplate('meeting_reminder', Assets.getText('meeting_reminder.html'));
//Template.meeting_reminder = function (result) {return result}
//Template.meeting_reminder = function (result) {
//    console.log('Inside process an email');
//    console.log('result:'+ result)
//    meeting_details = Meeting.findOne({_id: 'faeAhCdiMZtCSak4F'});
//    emailData = {}
//    emailData['title'] = meeting_details.title;
//    emailData['description'] = meeting_details.description;
//
//    emailData['date'] = '';
//    for (i = 0; i < meeting_details.date.length; i++)
//        emailData['date'] += meeting_details.date[i] + ', '
//    emailData['date'] = emailData['date'].slice(0, -2);
//    emailData['url'] = Meteor.absoluteUrl();
//    console.log(emailData)
//    console.log('returning email data')
//    return emailData
//}