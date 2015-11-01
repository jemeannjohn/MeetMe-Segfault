/**
 * Created by yousuf-sap on 10/17/2015.
 */
if (Meteor.isClient) {
    Accounts.ui.config({
        requestPermissions: {google:
            ['https://www.googleapis.com/auth/calendar',
                'https://www.googleapis.com/auth/calendar.readonly',
                'https://www.googleapis.com/auth/userinfo.profile',
                'https://www.googleapis.com/auth/userinfo.email']},
        extraSignupFields: [{
            fieldName: 'name',
            fieldLabel: 'Name',
            inputType: 'text',
            visible: true,
            validate: function(value, errorFunction) {
                if (!value) {
                    errorFunction("Please write your name");
                    return false;
                } else {
                    return true;
                }
            }
        }]
    });
}
Template.profile.helpers({
    userImage :function() {
        try {
            console.log(Meteor.user);
            if (Meteor.user().services.facebook) {
                return "http://graph.facebook.com/" + Meteor.user().services.facebook.id + "/picture/?type=large";
            } else if (Meteor.user().services.google) {
                return Meteor.user().services.google.picture;
            } else {
                return "https://app-images-production.s3.amazonaws.com/uploads/user/avatar/1568/identicon.png";
            }
        }
        catch (err) {
            console.log(err);
        }
    }
});
