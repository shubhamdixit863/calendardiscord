require("dotenv").config();
const {Client,MessageEmbed}=require('discord.js');
const client=new Client();
const {SendOptions,getTimeZonesList,createSimpleGuildMessage,createSimpleGuildMessageWithLink, isValidDate} =require("./util");
//console.log(process.env.DISCORD_BOT_TOKEN);
const delay = (msec) => new Promise((resolve) => setTimeout(resolve, msec));
const {createEvent,createEventStepSummary,createEventStepUploadPic,createEventStepDescription,createEventStepTimezone,createEventStepEndDate,createEventStepStartDate}=require("./events");
const {CreateReminder,CreateReminderStep}=require("./reminder");
const CreatePrefix=require("./prefix");
const {CreateChannel,CreateChannelInstructions}=require("./createChannel");
const {KickMember,BanMember} =require("./kick");
const db = require("quick.db");
const moment=require("moment");
const { logError, isOperationalError } = require('./globalErrorHandler');
const {ReminderChron} =require("./reminderChron");
const timezones=require("./timezones.json");
let messageReference;
ReminderChron(client,MessageEmbed);



// messaging event
let eventObject={}; // global event object 

client.on('message',async (message)=>{
    // Any message addressing to the bot will be handled by our bot
    //Channel Message
    messageReference=message; // in case of errors send the command again
    if(message.author.bot) return;
    let prefix;
    if(!message.guild) prefix =   process.env.PREFIX
    if(message.guild) prefix = db.fetch(`prefix.${message.guild.id}`) || process.env.PREFIX
    if(message.guild)
    {
        // Addressing bot
        if(message.content.includes("bot") ||  message.content.includes("help"))
        {
         SendOptions(MessageEmbed,message,message.author,prefix);
        }

        // Channel instructions

        else if(message.content.includes(`${prefix}channel`) && !message.author.bot)
        {
            // Send Create Channel Instructions
            CreateChannelInstructions(MessageEmbed,message);
        }

        // create channel
        else if(message.content.includes("Channel+") && !message.author.bot)
        {
            // Send Create Channel Instructions
            CreateChannel(MessageEmbed,message);
    
        }
        
        // reminder instructions

        else  if(message.content.includes(`${prefix}reminder`) && !message.author.bot)
        {
           
            CreateReminderStep(MessageEmbed,message);            
         
       } 

       else  if(message.content.includes(`${prefix}kick`) && !message.author.bot)
       {
        let args=message.content.split("-")[1];
        KickMember(message,[args]);            
        
      } 

      else  if(message.content.includes(`${prefix}ban`) && !message.author.bot)
      {
       let args=message.content.split("-")[1];
       if(message.members)
       {
        BanMember(message,[args]);            

       }
       message.channel.send("You can't ban A Bot")
       
     } 
       // create reminder

     

       else  if(message.content.includes(`${prefix}event`) && !message.author.bot)
        {
            //createEventSteps(MessageEmbed,message)
            createEventStepSummary(MessageEmbed,message)
            //createEventStepTimezone(MessageEmbed,message)

   
          
    
        }
      else  if(message.content.includes(`${prefix}prefix`) && !message.author.bot)
        {
           
            
           // await CreateReminder(message,["10s","Gotcha Reminer Working"])
          await  CreatePrefix(MessageEmbed,message,[message.content.split("-")[1]])

   
          
    
        }
    }

    else{

        // One To One Message With Bot
       // if(client.user.lastMessage)//console.log("Last message",client.user.lastMessage.content);
        if(([`${prefix}event`,`${prefix}reminder`,`${prefix}channel`,`${prefix}prefix`].includes (message.content)) && !message.author.bot)
        {
            createSimpleGuildMessage(MessageEmbed,message,"Not Allowed","You Can't Use This Action In Personal Chat","https://image.shutterstock.com/image-vector/dont-touch-please-icon-no-600w-1914599251.jpg","https://image.shutterstock.com/image-vector/dont-touch-please-icon-no-600w-1914599251.jpg")

        }

        // opt out functionality for reminders-

        if(message.content.includes("!Cancel"))
        {

          let reminderID=message.content.split("-");
       
          let remindeArr=db.get("reminders");
          let filtered=remindeArr.find(ele=>ele.id==reminderID[1]);
          if(filtered)
          {
     
            let filteredRem=remindeArr.filter(ele=>ele.id!=reminderID[1]);
            db.set("reminders",filteredRem);
            message.author.send("ok");

          }
          else{
            let rzs=remindeArr.map(ele=>{

              return {name:`Id-${ele.id} ,Message- ${ele.message}`,value:'\u200b' ,inline:true}
            })
            const embed2 = new MessageEmbed()
            .setTitle('Reminder Id Not Found')
            .setAuthor('Calendar Bot')
            .setDescription('Following Are The Reminder Set By You,Please Select the Id and Retry')
            .addFields(rzs)
            .setColor('#3C33FF')
            .setThumbnail('https://example.png')
            .setImage('https://example.png')
          
            .setTimestamp();
  
            message.author.send(embed2);
          }
         
        }
      




    }
    
  
   
    

})
/*
client.on("message",(message)=>{
    // handling only personal message
    

    if(!message.guild)
    {
        ////console.log(message);
       let messageBefores= message.channel.messages.fetch({limit:3});
       messageBefores.then(data=>{
          
           
         let messageBefore=data.array()[1] // previous to last message

         if(messageBefore.embeds && messageBefore.embeds.length>0)
         {
             if(messageBefore.embeds[0].title=="Creating An Event")
             {
 
                 //console.log(message.content);
                 let eventArray=message.content.split(",");
                 let eventObject={};
                 eventObject["timezone"]=eventArray[1];
                 eventObject["summary"]=eventArray[4];
                 eventObject["description"]=eventArray[4];
                 eventObject["start_data"]=eventArray[2];
                 eventObject["end_data"]=eventArray[3];
                
                 createEvent(eventObject,(data)=>{

                    createSimpleGuildMessageWithLink(MessageEmbed,message,"Event Created","You Have An Upcoming Google Calendar event",eventArray[2],eventArray[3],data,eventArray[0],client)

                 })

             }
 
             // creating a reminder here 
          
         }
 
         else{
 
 
            // no embedded message sent before
             createSimpleGuildMessage(MessageEmbed,message,"Please Start Over In Any Channel ,I am Part Of","","","");
 
         }

           
       })
        
        

    }


})

*/



// HAndling event creation in personal message here 

client.on("message",(message)=>{
    // handling only personal message
    

    if(!message.guild)
    {
        ////console.log(message);
       let messageBefores= message.channel.messages.fetch({limit:3});
       messageBefores.then(data=>{
          
           
         let messageBefore=data.array()[1] // previous to last message

         if(messageBefore.embeds && messageBefore.embeds.length>0)
         {
             
             if(messageBefore.embeds[0].title=="Enter The Summary For The Event")
             {

               // gets the Summary and save 
               let _event=db.get(`${message.author.id}_event`);

               db.set(`${message.author.id}_event`,{..._event,summary:message.content})

               createEventStepDescription(MessageEmbed,message)
 
              

             }


            else  if(messageBefore.embeds[0].title=="Enter The Description For The Event")
             {  

                if(message.content=="skip")
                {
                    let _event=db.get(`${message.author.id}_event`);
                    db.set(`${message.author.id}_event`,{..._event,description:_event.summary})
                    createEventStepTimezone(MessageEmbed,message)
                   // createEventStepStartDate(MessageEmbed,message)


                }
               else{

                let _event=db.get(`${message.author.id}_event`);
               db.set(`${message.author.id}_event`,{..._event,description:message.content})

                createEventStepTimezone(MessageEmbed,message)
                //createEventStepStartDate(MessageEmbed,message)

               }
               

 
              

             }


             else  if(messageBefore.embeds[0].title=="Enter The TimeZone For The Event")
             {
             
              //console.log("hii------")
               // gets the Summary and save 
               let _event=db.get(`${message.author.id}_event`);
               if(timezones.includes(message.content))
               {
                db.set(`${message.author.id}_event`,{..._event,timezone:message.content})
                createEventStepStartDate(MessageEmbed,message)
               }
               else{
                 // If timezone is not proper 

                message.author.send("Please Enter Proper Time Zone ,See The Link Below").then(data=>{
                  createEventStepTimezone(MessageEmbed,message)

  
                 }).catch(err=>{
  
  
                 })
               

               }
               
 
              

             }


             else  if(messageBefore.embeds[0].title=="Enter The StartDate For The Event")
             {

               // gets the Summary and save 
               

               if(moment(message.content,moment.ISO_8601).isValid()  && isValidDate(message.content))
               {
                let _event=db.get(`${message.author.id}_event`);
                db.set(`${message.author.id}_event`,{..._event,start_date:message.content})
                createEventStepEndDate(MessageEmbed,message);


               }
               else{
               message.author.send("Sorry Wrong Date Format ,Please Retry").then(data=>{
                createEventStepStartDate(MessageEmbed,message)

               }).catch(err=>{


               })
              

               }
 
              

             }

             else  if(messageBefore.embeds[0].title=="Enter The EndDate For The Event")
             {

            


               if(moment(message.content,moment.ISO_8601).isValid() && isValidDate(message.content) )
               {
                  // gets the Summary and save 
                  let _event=db.get(`${message.author.id}_event`);
                  db.set(`${message.author.id}_event`,{..._event,end_date:message.content})

                  // create event 

                  createEventStepUploadPic(MessageEmbed,message);

             




               }
               else{
               message.author.send("Sorry Wrong Date Format ,Please Retry").then(data=>{
                createEventStepEndDate(MessageEmbed,message)

               }).catch(err=>{

                
               })
              

               }
 
 
              

             }





         // uploading the image here 


         else  if(messageBefore.embeds[0].title=="Upload The Picture For Your Event")
         {

        
          

           if( message.attachments.size > 0)
           {
              

            let messageAttachment = message.attachments.array()[0].url ;
            var substrings = ["jpg", "jpeg", "png"];
            if (!new RegExp(substrings.join("|")).test(messageAttachment)) {
              // At least one match
              message.author.send("Only Png ,jpg and jpeg format supported ,Please Retry").then(data=>{
                createEventStepUploadPic(MessageEmbed,message)
    
               }).catch(err=>{
    
                
               })

               return ;
              
              
          }
           
            let _event=db.get(`${message.author.id}_event`);
                db.set(`${message.author.id}_event`,{..._event,url:messageAttachment})
                //console.log(messageAttachment);

                let _event2=db.get(`${message.author.id}_event`);
                

                createEvent(_event2,(err,eventlink)=>{
                 
                  if(err) return message.author.send("There was Some Problem Creating the Event,Please make sure start data and end data should be In future");
                 
                  const embed = new MessageEmbed()
                  .setTitle(_event2.summary)
                  .setDescription(_event2.description)
                  .setThumbnail(messageAttachment)
                  .setImage(messageAttachment)
                  .setURL(eventlink)
                  .setColor('#FF2D00')
                  .addFields([
                  {name:"Summary",value:_event2.summary,inline:true},
                   {name:"Start Date",value:moment(_event2.start_date).format('MMMM Do YYYY, h:mm:ss a') ,inline:true},
                   {name:"End Date",value:moment(_event2.end_date).format("MMMM Do YYYY, h:mm:ss a"),inline:true},
                   //{name:"Timezone",value:_event2.timezone,inline:true},
                   {name:"Timezone",value:"UTC",inline:true}



                  ])
                  
                 
                 .setTimestamp();
                  message.author.send(embed);
                  client.channels.cache.get(_event2.channel).send(embed);
                  


                });


           }
           else{
           message.author.send("Please Upload Image ,Please Retry").then(data=>{
            createEventStepUploadPic(MessageEmbed,message)

           }).catch(err=>{

            
           })
          

           }


          

         }
         
 
             // creating a reminder here 
          
         }
 
         else{
 
 
            // no embedded message sent before
             createSimpleGuildMessage(MessageEmbed,message,"Please Start Over In Any Channel ,I am Part Of","","","");
 
         }

           
       })
        /*
      
        */
        

    }


})




client.on("message",(message)=>{
  // handling the  reminder event



  if(!message.guild)
  {
    let messageBefores= message.channel.messages.fetch({limit:3});
    messageBefores.then(async data=>{

      let messageBefore=data.array()[1] // previous to last message

         if(messageBefore.embeds && messageBefore.embeds.length>0)
         {


             
             if(messageBefore.embeds[0].title=="Create Reminder")
             {


              const reminderMessage=message.content.split("-");
              //console.log(reminderMessage)
              await CreateReminder(client,message,reminderMessage,MessageEmbed)

             }
         }



    })
    
  }


})

// Error Handling Globally


process.on('uncaughtException', error => {
  logError(error)

  messageReference.channel.send("There was Some error ,Please retry the Command")

  // 

 })

 process.on('unhandledRejection', error => {
  messageReference.channel.send("There was Some error ,Please retry the Command")

  logError(error)
 })

 client.on("message",async(message)=>{
  if(!message.guild)
  {

  
        //message.delete()
  }

 })

client.login(process.env.DISCORD_BOT_TOKEN);