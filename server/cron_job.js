/**
 * Created by Nitesh on 11/3/15.
 */
SyncedCron.config({
    // Log job run details to console
    log: true,

    // Use a custom logger function (defaults to Meteor's logging package)
    logger: null,

    // Name of collection to use for synchronisation and logging
    collectionName: 'cronHistory',

    // Default to using localTime
    utc: false,

    /*
     TTL in seconds for history records in collection to expire
     NOTE: Unset to remove expiry but ensure you remove the index from
     mongo by hand

     ALSO: SyncedCron can't use the `_ensureIndex` command to modify
     the TTL index. The best way to modify the default value of
     `collectionTTL` is to remove the index by hand (in the mongo shell
     run `db.cronHistory.dropIndex({startedAt: 1})`) and re-run your
     project. SyncedCron will recreate the index with the updated TTL.
     */
    collectionTTL: 172800
});

SyncedCron.add({

    name: '1',
    schedule: function (parser) {
        return parser.recur().on('01:30:00').time();
    },
    job: function () {
        console.log("Sending an email...using cron job")
        var options = {
            from: "no-reply@meetme.com",
            subject: "MeetMe - Email Reminder!",
            to: 'niteshthali08@gmail.com',
            text: 'Runs every day at 8:00 Am'

        };
        Meteor.call('sendEmail', options);

    }
});