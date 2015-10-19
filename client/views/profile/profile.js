/**
 * Created by yousuf-sap on 10/17/2015.
 */
if (Meteor.isClient) {
    Accounts.ui.config({
        requestPermissions: {google:
            ['https://www.googleapis.com/auth/calendar',
                'https://www.googleapis.com/auth/calendar.readonly',
                'https://www.googleapis.com/auth/userinfo.profile',
                'https://www.googleapis.com/auth/userinfo.email']}
    });
}
