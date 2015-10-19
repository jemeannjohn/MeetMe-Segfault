/**
 * Created by Tharun on 10/18/2015.
 */

mySchema = new SimpleSchema({
    date: {
        type: Date,
            autoform: {
            type: "bootstrap-datepicker"
        }
    }

});
typesSchema = new SimpleSchema({
    typeTest: {
        type: String,
            optional: true
    }
});