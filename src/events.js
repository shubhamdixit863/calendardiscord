// Require google from googleapis package.
const { google } = require('googleapis')
const CalendarEvent=require("./calendarevent");
const moment=require("moment");
const  {randomHexColor} = require('random-hex-color-generator')

// Require oAuth2 from our google instance.
const { OAuth2 } = google.auth

// Create a new instance of oAuth and set our Client ID & Client Secret.
const oAuth2Client = new OAuth2(
  '272564178005-2fg1pijh16o9olcl4sson7h657k7dgg1.apps.googleusercontent.com',
  '2TG7gkwhPAEL13bs-tlOnKWm'
)

// Call the setCredentials method on our oAuth2Client instance and set our refresh token.
oAuth2Client.setCredentials({
  refresh_token: '1//04Gm_Wc8q_2-0CgYIARAAGAQSNwF-L9IrlejIVm4LQaTPB5r40_9guJ4pUPCemnutJoNm_f41g1RIrCon8ESkk_G2LFb_P8EuKvs',
})

const calendarEvent=new CalendarEvent(oAuth2Client);

const createEvent=(eventObject,cb)=>{

  calendarEvent.addEvent(eventObject["summary"],eventObject["description"],moment(eventObject["start_date"]).format("YYYY-MM-DDTHH:mm:ss"),
  moment(eventObject["end_date"]).format("YYYY-MM-DDTHH:mm:ss"),eventObject["timezone"],cb)
}


const createEventSteps=(MessageEmbed,message)=>{
  if(!message.member.hasPermission("MANAGE_GUILD")) return message.reply("You don't have required permissions")

  const embed = new MessageEmbed()
            .setTitle('Creating An Event')
            .setColor(randomHexColor())
            .setDescription("Creating An Event Requires Following Parameters")
            .addFields([{
              name: '\u200b',
              value: `1-Channel Name For Posting the Event ,By Default It would be  ${message.channel.name}`,
              inline:false
             
            }, {
              name: '\u200b',
              value: '2-TimeZone ,See The Following Wikipedia Link - https://en.wikipedia.org/wiki/List_of_tz_database_time_zones',
              inline:false
             
            },
            {
              name: '\u200b',
              value: '3-Start Date And End Date Of The Event in the Format YYYY-MM-DD HH:mm:ss ,example 2021-09-09 13:07:00',
              inline:false
             
            },
            {
              name: '\u200b',
              value: `3-Agenda Of The Event ,Like Alex's BirthDay`,
              inline:false
             
            },
            {
              name: '\u200b',
              value: '4- Final Step Would Be Posting them in Sequence ,like  channel,Asia/Kolkata,2021-09-09 13:07:00 ,2021-09-09 15:07:00,Alex Birthday',
              inline:false
             
            }
          
          
          
          ]).setFooter("Please Enter Command In the Same Format to Proceed With Event Creation")
            .setTimestamp();

          message.author.send(embed);


}

module.exports={createEvent,createEventSteps};