const {google} = require('googleapis');


class CalendarEvent {

    //This auth object should be passed whenever a new instance of class is created in order to authenticate the requests.
    constructor(auth){
        this.auth = auth;
        this.calendar = google.calendar({version: 'v3', auth});
    }

    addEvent(summary, description, start_date, end_date,timezone,attachmentUrl,cb){

        //This is a standard format for creating calendar events.
        let event = {
            'summary': summary,
            'description': description,
            'visibility':'public',
            'anyoneCanAddSelf':true,
            'guestsCanSeeOtherGuests':true,
            'guestsCanInviteOthers':true,
            'guestsCanModify':true,
             'attachments':[attachmentUrl],
            'start': {
                'dateTime': start_date,     // Format: '2015-05-28T09:00:00-07:00'
                'timeZone': "UTC",
            },
            'end': {
                'dateTime': end_date,
                'timeZone': "UTC",
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
                cb(err,null);
                return;
            }
            console.log('Event created: %s', event["data"]["htmlLink"]);
            let startDateCombined=event["data"].start.dateTime.replace(/[^a-z\d\s]+/gi, "");
            let endDateCombined=event["data"].end.dateTime.replace(/[^a-z\d\s]+/gi, "");
            let eventLink=`https://calendar.google.com/calendar/r/eventedit?text=${summary.replace(/\s+/g, "")}&details=${description.replace(/\s+/g, "")}&dates=${startDateCombined}Z/${endDateCombined}Z&ctz=${timezone}&location=${event["data"].location}`
            cb(err,eventLink);
        });
    }
}

module.exports = CalendarEvent;