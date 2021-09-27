// Require google from googleapis package.
const { google } = require('googleapis')
const CalendarEvent=require("./calendarevent");
const moment=require("moment");
const  {randomHexColor} = require('random-hex-color-generator')
const {getTimeZonesList}=require("./util");
// Require oAuth2 from our google instance.
const { OAuth2 } = google.auth
const db = require("quick.db");


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
  moment(eventObject["end_date"]).format("YYYY-MM-DDTHH:mm:ss"),eventObject["timezone"],eventObject["url"], cb)
}


const createEventStepSummary=(MessageEmbed,message)=>{
  
  if(!message.member.hasPermission("MANAGE_GUILD")) return message.reply("You don't have required permissions")


  // saving the channel name as well in db
  db.set(`${message.author.id}_event`,{channel:message.channel.id})

  const embed = new MessageEmbed()
            .setTitle('Enter The Summary For The Event')
            .setColor(randomHexColor())
            .setDescription("Enter Brief Summary About  The Event You Are Creating")
             .setFooter("To exit type 'cancel'")
            .setTimestamp();

          message.author.send(embed);


}

const handleCancel=(message)=>{
  message.author.send("Please restart the Process In Any channel");

}

const createEventStepDescription=(MessageEmbed,message)=>{
 // if(!message.member.hasPermission("MANAGE_GUILD")) return message.reply("You don't have required permissions")
 if(message.content==="cancel") {handleCancel(message); return};

  const embed = new MessageEmbed()
            .setTitle('Enter The Description For The Event')
            .setColor(randomHexColor())
            .setDescription("Enter Detailed Description  About  The Event You Are Creating")
            .setFooter("To exit type 'cancel'")
            .setTimestamp();

          message.author.send(embed);


}

function getRandom(arr, n) {
  var result = new Array(n),
      len = arr.length,
      taken = new Array(len);
  if (n > len)
      throw new RangeError("getRandom: more elements taken than available");
  while (n--) {
      var x = Math.floor(Math.random() * len);
      result[n] = arr[x in taken ? taken[x] : x];
      taken[x] = --len in taken ? taken[len] : len;
  }
  return result;
}

const createEventStepTimezone=(MessageEmbed,message)=>{
//  if(!message.member.hasPermission("MANAGE_GUILD")) return message.reply("You don't have required permissions")
/*
 const tzs= getTimeZonesList().map((ele,i)=>{

    if(i !=0 && i%5==0)
    {
     return {name:'\u200b', value:'\u200b'}
    }

    else{
      return {name:`${i+1}-${ele}`,value:'\u200b',inline:true}

    }



  })
  */
  if(message.content==="cancel") {handleCancel(message); return};


 let index=0;
  const tzs= getTimeZonesList().map((ele,i)=>{
  
    let obj={
      "name": ele.continent,
      "value": ele.timezone.reduce((acc,ele,i)=>{
        acc+=`${index+1} ${ele} \n`

        index++;
      
      return acc;
      },""),
      "inline": true
    }
   
    return obj;
  


  })
  const embed = new MessageEmbed()
            .setTitle("Enter The TimeZone For The Event")
            .setColor(randomHexColor())
            .setDescription("Enter The TimeZone For The Event ,This Step Is Mandatory  See Full List Here [Timezones .](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones)")
            .addFields(tzs)
            .setFooter("To exit type 'cancel'")
            
            .setTimestamp();

          message.author.send(embed);


}

const createEventStepStartDate=(MessageEmbed,message)=>{
  console.log("hii----------")
  console.log(message.content);
  //if(!message.member.hasPermission("MANAGE_GUILD")) return message.reply("You don't have required permissions")
  if(message.content==="cancel") {handleCancel(message); return};

  const embed = new MessageEmbed()
            .setTitle('Enter The StartDate For The Event')
            .setColor(randomHexColor())
            .setDescription("Enter Start Date In Format YYYY-MM-DD HH:mm:ss")
            .setFooter("To exit type 'cancel'")
            .setTimestamp();

          message.author.send(embed);


}

const createEventStepEndDate=(MessageEmbed,message)=>{
  //if(!message.member.hasPermission("MANAGE_GUILD")) return message.reply("You don't have required permissions")
  if(message.content==="cancel") {handleCancel(message); return};

  const embed = new MessageEmbed()
            .setTitle('Enter The EndDate For The Event')
            .setColor(randomHexColor())
            .setDescription(" Enter The EndDate For The Event In Format YYYY-MM-DD HH:mm:ss")
            .setFooter("To exit type 'cancel'")
            .setTimestamp();

          message.author.send(embed);


}


const createEventStepUploadPic=(MessageEmbed,message)=>{
  //if(!message.member.hasPermission("MANAGE_GUILD")) return message.reply("You don't have required permissions")
  if(message.content==="cancel") {handleCancel(message); return};

  const embed = new MessageEmbed()
            .setTitle('Upload The Picture For Your Event')
            .setColor(randomHexColor())
            .setDescription("Select The Image with + icon and upload It")
            .setFooter("To exit type 'cancel'")
            .setTimestamp();

          message.author.send(embed);


}


module.exports={createEvent,createEventStepSummary,createEventStepDescription,createEventStepTimezone,

  createEventStepEndDate,createEventStepStartDate,createEventStepUploadPic
};