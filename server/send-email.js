/**
 * Created by Nitesh on 10/17/15.
 */
//process.env.MAIL_URL = "smtp://postmaster%40sandbox8cd448e3d12f4136a23a149a735cb435.mailgun.org:@smtp.mailgun.org:587";
Meteor.startup(function() {
    var username = "postmaster@sandbox8cd448e3d12f4136a23a149a735cb435.mailgun.org";
    var password = "75963cb24da4b875b7903badd61ef1c3";
    var server = "smtp.mailgun.org";
    var port = "587"

    process.env.MAIL_URL = 'smtp://' + encodeURIComponent(username) + ':' + encodeURIComponent(password) + '@' + encodeURIComponent(server) + ':' + port;
    //console.log('mail url',process.env.MAIL_URL);
});
var emailData = {
    topic: "SER-515 Project Meet",
    location: "Noble Library",
    time: "9:30 AM - 10:30 AM "
};

SSR.compileTemplate( 'htmlEmail', Assets.getText( 'email-template.html' ) );
Meteor.methods({
    sendEmail: function (to, from, subject, text) {
        //check([to, from, subject, text], [String]);
        // console.log('mail url',process.env.MAIL_URL);
        //console.log('inside sendEMAIL');
        // Let other method calls from the same client start running,
        // without waiting for the email sending to complete.
        //this.unblock();
        console.log('sending an email');
        Email.send({
            to: to,
            from: from,
            subject: subject,
            text: text,
            html: SSR.render( 'htmlEmail', emailData )
        });
    }
});


