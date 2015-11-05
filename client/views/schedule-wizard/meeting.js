/**
 * Created by Tharun on 10/21/2015.
 */

if (Meteor.isClient) {
    Meteor.startup(function () {
        AutoForm.setDefaultTemplate("semanticUI");

        Template.afCheckbox_semanticUI.onRendered(function () {
            $(this.firstNode).checkbox();
        });
    });
    Meteor.methods({
	'slotSuggestionLogic': function(){
		var calendarData = {
			  "kind": "calendar#events",
			  "etag": "\"1445204637202000\"",
			  "summary": "tharunniranjan@gmail.com",
			  "updated": "2015-10-18T21:43:57.202Z",
			  "timeZone": "UTC",
			  "accessRole": "owner",
			  "defaultReminders": [
				{
				  "method": "popup",
				  "minutes": 30
				},
				{
				  "method": "email",
				  "minutes": 30
				}
			  ],
			  "nextSyncToken": "CNDsnOj-zMgCENDsnOj-zMgCGAU=",
			  "items": [
				{

				  "kind": "calendar#event",
				  "etag": "\"2890409259470000\"",
				  "id": "64o34e1g6dhjgb9nc4r66b9k6crm8bb26ko6cb9i60q38cj16lh66p9o60",
				  "status": "confirmed",
				  "htmlLink": "https://www.google.com/calendar/event?eid=NjRvMzRlMWc2ZGhqZ2I5bmM0cjY2YjlrNmNybThiYjI2a282Y2I5aTYwcTM4Y2oxNmxoNjZwOW82MCB0aGFydW5uaXJhbmphbkBt",
				  "created": "2015-10-18T21:43:49.000Z",
				  "updated": "2015-10-18T21:43:49.790Z",
				  "summary": "Meeting 1",
				  "creator": {
					"email": "tharunniranjan@gmail.com",
					"displayName": "Tharun Niranjan",
					"self": true
				  },
				  "organizer": {
					"email": "tharunniranjan@gmail.com",
					"displayName": "Tharun Niranjan",
					"self": true
				  },
				  "start": {
					"dateTime": "2015-10-18T16:00:00Z",
					"timeZone": "America/Phoenix"
				  },
				  "end": {
					"dateTime": "2015-10-18T17:00:00Z",
					"timeZone": "America/Phoenix"
				  },
				  "iCalUID": "64o34e1g6dhjgb9nc4r66b9k6crm8bb26ko6cb9i60q38cj16lh66p9o60@google.com",
				  "sequence": 0,
				  "reminders": {
					"useDefault": false,
					"overrides": [
					  {
						"method": "popup",
						"minutes": 30
					  },
					  {
						"method": "email",
						"minutes": 30
					  }
					]
				  }
				},
				{

				  "kind": "calendar#event",
				  "etag": "\"2890409261461000\"",
				  "id": "60p3icj6cgp66b9l60qj2b9k6cqm8bb26cq3ebb4ccoj0eb66gpjid316g",
				  "status": "confirmed",
				  "htmlLink": "https://www.google.com/calendar/event?eid=NjBwM2ljajZjZ3A2NmI5bDYwcWoyYjlrNmNxbThiYjI2Y3EzZWJiNGNjb2owZWI2NmdwamlkMzE2ZyB0aGFydW5uaXJhbmphbkBt",
				  "created": "2015-10-18T21:43:50.000Z",
				  "updated": "2015-10-18T21:43:50.793Z",
				  "summary": "Meeting 2",
				  "creator": {
					"email": "tharunniranjan@gmail.com",
					"displayName": "Tharun Niranjan",
					"self": true
				  },
				  "organizer": {
					"email": "tharunniranjan@gmail.com",
					"displayName": "Tharun Niranjan",
					"self": true
				  },
				  "start": {
					"dateTime": "2015-10-18T19:00:00Z",
					"timeZone": "America/Phoenix"
				  },
				  "end": {
					"dateTime": "2015-10-18T20:00:00Z",
					"timeZone": "America/Phoenix"
				  },
				  "iCalUID": "60p3icj6cgp66b9l60qj2b9k6cqm8bb26cq3ebb4ccoj0eb66gpjid316g@google.com",
				  "sequence": 0,
				  "reminders": {
					"useDefault": false,
					"overrides": [
					  {
						"method": "popup",
						"minutes": 30
					  },
					  {
						"method": "email",
						"minutes": 30
					  }
					]
				  }
				},
				{

				  "kind": "calendar#event",
				  "etag": "\"2890409263137000\"",
				  "id": "6gp68d9jc8r3abb169h3ib9k6pijebb169im4b9i6dj64c9g68oj2d9m6s",
				  "status": "confirmed",
				  "htmlLink": "https://www.google.com/calendar/event?eid=NmdwNjhkOWpjOHIzYWJiMTY5aDNpYjlrNnBpamViYjE2OWltNGI5aTZkajY0YzlnNjhvajJkOW02cyB0aGFydW5uaXJhbmphbkBt",
				  "created": "2015-10-18T21:43:51.000Z",
				  "updated": "2015-10-18T21:43:51.624Z",
				  "summary": "Meeting 3",
				  "creator": {
					"email": "tharunniranjan@gmail.com",
					"displayName": "Tharun Niranjan",
					"self": true
				  },
				  "organizer": {
					"email": "tharunniranjan@gmail.com",
					"displayName": "Tharun Niranjan",
					"self": true
				  },
				  "start": {
					"dateTime": "2015-10-18T22:00:00Z",
					"timeZone": "America/Phoenix"
				  },
				  "end": {
					"dateTime": "2015-10-18T23:00:00Z",
					"timeZone": "America/Phoenix"
				  },
				  "iCalUID": "6gp68d9jc8r3abb169h3ib9k6pijebb169im4b9i6dj64c9g68oj2d9m6s@google.com",
				  "sequence": 0,
				  "reminders": {
					"useDefault": false,
					"overrides": [
					  {
						"method": "popup",
						"minutes": 30
					  },
					  {
						"method": "email",
						"minutes": 30
					  }
					]
				  }
				},
				{

				  "kind": "calendar#event",
				  "etag": "\"2890409267158000\"",
				  "id": "ckqm2cj274r34bb3cgom2b9kc8pj6b9p69gj4b9jchi32cr3cos34cr16c",
				  "status": "confirmed",
				  "htmlLink": "https://www.google.com/calendar/event?eid=Y2txbTJjajI3NHIzNGJiM2Nnb20yYjlrYzhwajZiOXA2OWdqNGI5amNoaTMyY3IzY29zMzRjcjE2YyB0aGFydW5uaXJhbmphbkBt",
				  "created": "2015-10-18T21:43:53.000Z",
				  "updated": "2015-10-18T21:43:53.648Z",
				  "summary": "Meeting 4",
				  "creator": {
					"email": "tharunniranjan@gmail.com",
					"displayName": "Tharun Niranjan",
					"self": true
				  },
				  "organizer": {
					"email": "tharunniranjan@gmail.com",
					"displayName": "Tharun Niranjan",
					"self": true
				  },
				  "start": {
					"dateTime": "2015-10-19T00:00:00Z",
					"timeZone": "America/Phoenix"
				  },
				  "end": {
					"dateTime": "2015-10-19T01:00:00Z",
					"timeZone": "America/Phoenix"
				  },
				  "iCalUID": "ckqm2cj274r34bb3cgom2b9kc8pj6b9p69gj4b9jchi32cr3cos34cr16c@google.com",
				  "sequence": 0,
				  "reminders": {
					"useDefault": false,
					"overrides": [
					  {
						"method": "popup",
						"minutes": 30
					  },
					  {
						"method": "email",
						"minutes": 30
					  }
					]
				  }
				},
				{

				  "kind": "calendar#event",
				  "etag": "\"2890409271955000\"",
				  "id": "6op36dpi6dhmcb9nc5imcb9kc4q3gbb269j68b9i6gpj8p31cdim6e1k70",
				  "status": "confirmed",
				  "htmlLink": "https://www.google.com/calendar/event?eid=Nm9wMzZkcGk2ZGhtY2I5bmM1aW1jYjlrYzRxM2diYjI2OWo2OGI5aTZncGo4cDMxY2RpbTZlMWs3MCB0aGFydW5uaXJhbmphbkBt",
				  "created": "2015-10-18T21:43:55.000Z",
				  "updated": "2015-10-18T21:43:56.086Z",
				  "summary": "Meeting 5",
				  "creator": {
					"email": "tharunniranjan@gmail.com",
					"displayName": "Tharun Niranjan",
					"self": true
				  },
				  "organizer": {
					"email": "tharunniranjan@gmail.com",
					"displayName": "Tharun Niranjan",
					"self": true
				  },
				  "start": {
					"dateTime": "2015-10-19T03:00:00Z",
					"timeZone": "America/Phoenix"
				  },
				  "end": {
					"dateTime": "2015-10-19T04:00:00Z",
					"timeZone": "America/Phoenix"
				  },
				  "iCalUID": "6op36dpi6dhmcb9nc5imcb9kc4q3gbb269j68b9i6gpj8p31cdim6e1k70@google.com",
				  "sequence": 0,
				  "reminders": {
					"useDefault": false,
					"overrides": [
					  {
						"method": "popup",
						"minutes": 30
					  },
					  {
						"method": "email",
						"minutes": 30
					  }
					]
				  }
				},
				{

				  "kind": "calendar#event",
				  "etag": "\"2890409273896000\"",
				  "id": "6hgm4cpm6kpm2bb375j34b9k6hi66b9p6kqm8bb371i3cdj1cor3ad1k68",
				  "status": "confirmed",
				  "htmlLink": "https://www.google.com/calendar/event?eid=NmhnbTRjcG02a3BtMmJiMzc1ajM0YjlrNmhpNjZiOXA2a3FtOGJiMzcxaTNjZGoxY29yM2FkMWs2OCB0aGFydW5uaXJhbmphbkBt",
				  "created": "2015-10-18T21:43:56.000Z",
				  "updated": "2015-10-18T21:43:57.003Z",
				  "summary": "Meeting 6",
				  "creator": {
					"email": "tharunniranjan@gmail.com",
					"displayName": "Tharun Niranjan",
					"self": true
				  },
				  "organizer": {
					"email": "tharunniranjan@gmail.com",
					"displayName": "Tharun Niranjan",
					"self": true
				  },
				  "start": {
					"dateTime": "2015-10-19T05:00:00Z",
					"timeZone": "America/Phoenix"
				  },
				  "end": {
					"dateTime": "2015-10-19T06:00:00Z",
					"timeZone": "America/Phoenix"
				  },
				  "iCalUID": "6hgm4cpm6kpm2bb375j34b9k6hi66b9p6kqm8bb371i3cdj1cor3ad1k68@google.com",
				  "sequence": 0,
				  "reminders": {
					"useDefault": false,
					"overrides": [
					  {
						"method": "popup",
						"minutes": 30
					  },
					  {
						"method": "email",
						"minutes": 30
					  }
					]
				  }
				}
			  ]
			}

        slots = {}
        for(i = 0; i < calendarData.items.length; i++) {
            obj = calendarData.items[i];
            key = obj["start"]["dateTime"].split('T')[0];
            startTime = new Date(obj["start"]["dateTime"]).getHours() + (new Date(obj["start"]["dateTime"]).getMinutes())/100
            endTime = new Date(obj["end"]["dateTime"]).getHours() + (new Date(obj["end"]["dateTime"]).getMinutes())/100
            if(slots[key]!= null)
            {
                slots[key].push({"startTime":startTime, "endTime":endTime});
            }
            else {
                slots[key] = [{"startTime":startTime, "endTime":endTime}];
            }
        }
		slot_suggestion = {}
		//TODO:remove the hardcoding
		var duration = 2;
        keys = Object.keys(slots);
		for (var key in slots) {
    		for( i=7;i+duration <=19;i++) {
        		flag = "GREEN"
        		for(j=0;j<slots[key].length;j++){
            		if(i >= slots[key][j]["startTime"] && i<= slots[key][j]["endTime"]) { flag= "RED"; break;}
            		else if(i+duration >= slots[key][j]["startTime"] && i+duration<= slots[key][j]["endTime"]) {flag = "RED"; break;}
        		}
  				if (slot_suggestion.hasOwnProperty(key)) {
  					slot_suggestion[key].push({"startTime" : i, "endTime": i+duration, "flag" :flag});
  				}
        		else {
            		slot_suggestion[key] = [{"startTime" : i, "endTime": i+duration, "flag" :flag}];
        		}

    		}
		}
		console.log(slot_suggestion);
        }
    });

    Template.registerHelper('Schema', function () {
        return Schema;
    });

    Template.steps.helpers({
        stepClass: function (id) {
            var activeStep = this.wizard.activeStep();
            var step = this.wizard.getStep(id);
            if (activeStep && activeStep.id === id) {
                return 'active';
            }
            if (step.data()) {
                return 'completed';
            }
            return 'disabled';

        }



    });
    Template.participantInformation.helpers({
      settings: function() {
        return {
          position: "top",
          limit: 10,
          rules: [
            {
              token: '@',
              collection: Meteor.users,
              field: "username",
              template: Template.userPill
            }
          ]
        };
      }
    });
    Template.viewMeeting.helpers({

    })
    function send_email(result)
    {
        console.log('Inside sending an email')
        list = [];
        to = Meeting.findOne({_id:result});
        emailData = {}
        emailData['title'] = to.title;
        emailData['description'] = to.description;
        emailData['date'] = to.date
        console.log(to)
        console.log(to.participants[0].email)

        for (i=0; i< to.participants.length; i++)
            list.push(to.participants[i].email)
        //console.log('inside send email function');
        console.log('list', list)
        Meteor.call('sendEmail',
            list,
            "no-reply@meetme.com",
            "MeetMe - New Meeting Request!",
            "You have a new meeting request. Please find the details below!", emailData);

    }
    function meeting_alert()
    {
        if (confirm("Are you sure you want to schedule a meeting?") == true) {
            console.log('You clicked ok')
            return true
        } else {
            console.log('You clicked cancel')
            return false
        }
    }
    AutoForm.addHooks(['newMeetingWizard', 'editMeetingWizard'], {
        onSuccess: function (formType, result) {
            console.log("SUCCESS:", result);
            a = meeting_alert()
            if (!a)
            {
                Meeting.remove({_id:result})
                return false
            }
            /*Meeting.update(result, {
            $set: {userid: "myuserid"}
            },  {validate: false});*/
            UserMeetings.insert({
                userid: Meteor.userId(),
                meetingid: result
            });
            send_email(result);
            Router.go('viewMeeting', {_id: result});
        },
        onError: function (formType, error) {
            console.log("ERROR:", error);
        },
        onSubmit: function(data, wizard) {
          var self = this;
          Meeting.insert(_.extend(wizard.mergedData(), data), function(err, id) {
              //console.log(wizard.mergedData());
              //wizard.mergedData().userid = "myuserid";
              //this.done();
              console.log(wizard.mergedData())
            if (err) {
              self.done();
            } else {
              Router.go('viewMeeting', {
                _id: id
              });
            }

          });
        }
    });

}

/*
Router.configure({
    layoutTemplate: 'layout'
});

Router.route('/', function () {
    this.redirect('newMeeting');
});
*/
