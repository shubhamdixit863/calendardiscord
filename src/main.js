require("dotenv").config();
const {Client,MessageEmbed}=require('discord.js');
const client=new Client();
const {SendOptions,getTimeZonesList,createSimpleGuildMessage,createSimpleGuildMessageWithLink} =require("./util");
console.log(process.env.DISCORD_BOT_TOKEN);
const delay = (msec) => new Promise((resolve) => setTimeout(resolve, msec));
const {createEvent,createEventSteps}=require("./events");
const {CreateReminder,CreateReminderStep}=require("./reminder");
const CreatePrefix=require("./prefix");
const {CreateChannel,CreateChannelInstructions}=require("./createChannel");
const {KickMember,BanMember} =require("./kick");
const db = require("quick.db");




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
            createEventSteps(MessageEmbed,message)
           

   
          
    
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
client.login(process.env.DISCORD_BOT_TOKEN);