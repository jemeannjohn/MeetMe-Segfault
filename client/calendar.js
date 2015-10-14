
console.log("coming to calendar.j");
if (Meteor.isClient) {
    console.log("coming to isClient...");
    Template.calendar.events({
        "submit #slot_submit": function (event) {
            // Prevent default browser form submit
            console.log("coming in event");
            event.preventDefault();
            var title = document.getElementById('title').value();
            var description = document.getElementById('description').value();
            var location = document.getElementById('location').value();
            var meeting_date = document.getElementById('datepicker').value();
            var duration = document.getElementById('duration').value();
            var array = new Array();
            $(".tag").each(function () {
                array.push(this.value())
            })
            console.log(array);
        }
    });
//
//    function clicked(event){
//    alert("coming here");
//    }
}