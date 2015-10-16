
console.log("coming to calendar.j");
if (Meteor.isClient) {
    console.log("coming to isClient...");
    Template.calendar.events({
        "click #slot_submit": function (event) {

            event.preventDefault();
            var title = $('#meeting_title').val();
            var description = $('#description').val();
            var location = $('#location').val();
            var meeting_date = $('#datepicker').val();
            var duration = $('#duration').val();
            var array = new Array();
            $(".tag").each(function (k, v) {
                array.push(v.value)
            })
            $("#slot_table_div").css({ visibility: "visible"});
        }
    });

}