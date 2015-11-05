/**
 * Created by Tharun on 11/4/2015.
 */
Template.pollpage.helpers({
    meeting: function () {
        console.log( Timeslots.find({"_id": "dKo89M3umFhpm77XT"}));
        return Timeslots.find({"_id": "dKo89M3umFhpm77XT"});
        //return Timeslots.find({},{fields:{'dateSlotPair':1}});
    },
    slots:function(){
        return Timeslots.find({},{fields:{'slots':1}});
    }
});
Template.registerHelper('FormatDate', function(date){
    return moment(date).format("MM/DD/YYYY")
});

