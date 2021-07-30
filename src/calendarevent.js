const {google} = require('googleapis');


class CalendarEvent {

    //This auth object should be passed whenever a new instance of class is created in order to authenticate the requests.
    constructor(auth){
        this.auth = auth;
        this.calendar = google.calendar({version: 'v3', auth});
    }

    addEvent(summary, description, start_date, end_date,timezone,cb){

        //This is a standard format for creating calendar events.
        let event = {
            'summary': summary,
            'description': description,
            'visibility':'public',
            'anyoneCanAddSelf':true,
            'guestsCanSeeOtherGuests':true,
            'guestsCanModify':true,
            'start': {
                'dateTime': start_date,     // Format: '2015-05-28T09:00:00-07:00'
                'timeZone': timezone,
            },
            'end': {
                'dateTime': end_date,
                'timeZone': timezone,
            },
            'reminders': {
                'useDefault': false,
                'overrides': [
                    {'method': 'email', 'minutes': 24 * 60},
                    {'method': 'popup', 'minutes': 15},
                ],
            },
        };

        //We make a request to Google Calendar API.
        
        this.calendar.events.insert({
            auth: this.auth,
            calendarId: 'primary',
            resource: event,
           
          }, function(err, event) {
            if (err) {
                console.log('There was an error contacting the Calendar service: ' + err);
                return;
            }
            console.log('Event created: %s', event["data"]["htmlLink"]);
            cb(err,event["data"]["htmlLink"]);
        });
    }
}

module.exports = CalendarEvent;