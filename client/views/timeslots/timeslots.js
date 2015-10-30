Timeslots = new Meteor.Collection('timeslots');
//if (Meteor.isClient) {
//    Template.steps.helpers({
//        //dates: function () {
//        //
//        //}
//
//    });
//}
$(function () {
    $(".big-box").click(function () {
        $(this).toggleClass('selected unselected');
        return false;
    });
});
UI.registerHelper("prettifyDate", function (timestamp) {
    var alldates = new Date(timestamp);
    return alldates.getMonth().toString() + " / " + alldates.getDate().toString() + " / " + alldates.getFullYear().toString();
});
UI.registerHelper("idGenerator", function (timestamp) {
    var dateElement = new Date(timestamp);

});