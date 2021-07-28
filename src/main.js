require("dotenv").config();
const {Client,MessageEmbed}=require('discord.js');
const client=new Client();
const {SendOptions,getTimeZonesList,createSimpleGuildMessage,createSimpleGuildMessageWithLink} =require("./util");
console.log(process.env.DISCORD_BOT_TOKEN);
const delay = (msec) => new Promise((resolve) => setTimeout(resolve, msec));
const {createEvent,createEventStepSummary,createEventStepDescription,createEventStepTimezone,createEventStepEndDate,createEventStepStartDate}=require("./events");
const {CreateReminder,CreateReminderStep}=require("./reminder");
const CreatePrefix=require("./prefix");
const {CreateChannel,CreateChannelInstructions}=require("./createChannel");
const {KickMember,BanMember} =require("./kick");
const db = require("quick.db");
const moment=require("moment");




// messaging event
let eventObject={}; // global event object 

client.on('message',async (message)=>{
    // Any message addressing to the bot will be handled by our bot
    //Channel Message
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
       // if(client.user.lastMessage)console.log("Last message",client.user.lastMessage.content);
        if(([`${prefix}event`,`${prefix}reminder`,`${prefix}channel`,`${prefix}prefix`].includes (message.content)) && !message.author.bot)
        {
            createSimpleGuildMessage(MessageEmbed,message,"Not Allowed","You Can't Use This Action In Personal Chat","https://image.shutterstock.com/image-vector/dont-touch-please-icon-no-600w-1914599251.jpg","https://image.shutterstock.com/image-vector/dont-touch-please-icon-no-600w-1914599251.jpg")

        }
       else  if(message.content.includes("Reminder") && !message.author.bot)
        {
           const reminderMessage=message.content.split("+")[1].split("-");
           console.log(reminderMessage)
           await CreateReminder(client,message,reminderMessage,MessageEmbed)
 
         }




    }
    
  
   
    

})
client.on("message",(message)=>{
    // handling only personal message
    

    if(!message.guild)
    {
        //console.log(message);
       let messageBefores= message.channel.messages.fetch({limit:3});
       messageBefores.then(data=>{
          
           
         let messageBefore=data.array()[1] // previous to last message

         if(messageBefore.embeds && messageBefore.embeds.length>0)
         {
             if(messageBefore.embeds[0].title=="Creating An Event")
             {
 
                 console.log(message.content);
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
        /*
      
        */
        

    }


})



client.on("message",(message)=>{
    // handling only personal message
    

    if(!message.guild)
    {
        //console.log(message);
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

                }
               else{

                let _event=db.get(`${message.author.id}_event`);
               db.set(`${message.author.id}_event`,{..._event,description:message.content})

                createEventStepTimezone(MessageEmbed,message)
               }
               

 
              

             }


             else  if(messageBefore.embeds[0].title=="Enter The TimeZone For The Event")
             {
             
               // gets the Summary and save 
               let _event=db.get(`${message.author.id}_event`);
               db.set(`${message.author.id}_event`,{..._event,timezone:message.content})
               createEventStepStartDate(MessageEmbed,message)
 
              

             }


             else  if(messageBefore.embeds[0].title=="Enter The StartDate For The Event")
             {

               // gets the Summary and save 
              

               if(moment(message.content).isValid())
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

            


               if(moment(message.content).isValid())
               {
                  // gets the Summary and save 
                  let _event=db.get(`${message.author.id}_event`);
                  db.set(`${message.author.id}_event`,{..._event,end_date:message.content})

                  // create event 

                  let _event2=db.get(`${message.author.id}_event`);
                  //console.log(_event2);
                  createEvent(_event2,(eventlink)=>{
                   
                    const embed = new MessageEmbed()
                    .setTitle("Google Event Created")
                    .setDescription("Your Event Is Created")
                    .setThumbnail("https://www.google.com/imgres?imgurl=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2F2%2F24%2FGoogle_Hangouts_Meet_icon_%25282017-2020%2529.png&imgrefurl=https%3A%2F%2Fcommons.wikimedia.org%2Fwiki%2FFile%3AGoogle_Hangouts_Meet_icon_(2017-2020).png&tbnid=pSmsNT8PGRguCM&vet=12ahUKEwiiytf29__xAhVEDysKHZhaBEgQMygBegUIARCuAQ..i&docid=kG6suT0DoaOhdM&w=1024&h=1024&q=google%20meeting%20image%20thumbnail&ved=2ahUKEwiiytf29__xAhVEDysKHZhaBEgQMygBegUIARCuAQ")
                    .setURL(eventlink)
                    .setColor('#FF2D00')
                    
                   
                   .setTimestamp();
                    message.author.send(embed);
                     //client.channels.cache.get(_event2.channel).send(eventlink);
                    


                  });




               }
               else{
               message.author.send("Sorry Wrong Date Format ,Please Retry").then(data=>{
                createEventStepEndDate(MessageEmbed,message)

               }).catch(err=>{

                
               })
              

               }
 
 
              

             }

             else  if(messageBefore.embeds[0].title=="Please Confirm By Typing Confirm or Cancel By Typing Cancel")
             {
                 if(message.content=="Cancel")
                 {
                     db.delete(`${messageBefore.author.id}`)
                 }

                 else if(message.content=="Confirm")
                 {
                      
                  let _event=db.get(`${messageBefore.author.id}`);
                      // Saving the vent here

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


// messaging to handle creating event


client.login(process.env.DISCORD_BOT_TOKEN);