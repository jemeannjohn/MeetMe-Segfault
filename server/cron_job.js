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

    name: '1',
    schedule: function (parser) {
        return parser.recur().on('08:00:00').time();
        //return parser.recur().every(1).minute();
    },
    job: function () {
        var today = new Date()
        console.log('today' + today)
        var month = today.getMonth() + 1
        if (month < 11)
            month = '0' + month;
        var day = today.getDate();
        if (day < 11)
            day = '0' + day;
        var today = today.getFullYear() + '-' + month + '-' + day + "T00:00:00.000Z";
        //console.log(today.getFullYear());
        //console.log(today.getDate());
        //console.log(today.getMonth());
        console.log('today: ' + today);

        tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate()+1)
        //console.log('tomo: ' + tomorrow);

        console.log("Sending an email...using cron job for date: "+ tomorrow);
        //for now hardcoding this value....
        //result = 'faeAhCdiMZtCSak4F';
        //emailData = {}
        var meeting_details = Meeting.find({date: tomorrow}).fetch();
        var len = Meeting.find({date: tomorrow}).count();
        //console.log('len:'+len);
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