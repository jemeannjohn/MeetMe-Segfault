/**
 * Created by Tharun on 10/18/2015.
 */
Meteor.publish(null, function () {
    return [
        People.find()
    ];
});