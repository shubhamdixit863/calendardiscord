const ms = require("ms")
const db = require("quick.db")
const { v4: uuidv4 } = require('uuid');

const CreateReminder = async(client,message,args,MessageEmbed)=> {
    let timeuser = args[1]
    let reason = args[0]

    if(!ms(timeuser)) return message.reply(":x: You should enter time 10m 10s 10d")
 
   
    
    
    if(!timeuser) return message.reply(":x: You should enter time 10m 10s 10d 10h")
    if(!reason) return message.reply(":x: You should enter reason")

    // Getting the reminder Array for the user
    let reminderArr=db.get("reminders") || [];
    console.log(reminderArr);
    let reminderId=uuidv4().replaceAll("-","");



    db.set("reminders",[...reminderArr,{reminderDate:Date.now() + ms(timeuser),id:reminderId,message:reason,authorId:message.author.id}])

    const embed2 = new MessageEmbed()
    .setTitle('Reminder Created SuccessFully')
    .setAuthor('Calendar Bot')
    .setDescription(`Your Reminder Has Been Set With Id -${reminderId}`)
    .setColor('#3C33FF')
    .setThumbnail('https://example.png')
    .setImage('https://example.png')
    .setFooter(`To ,Opt Out Of The Reminder ,Type  !Cancel-Your Reminder Id  ie Cancel-${reminderId} `)
    .setTimestamp();

    message.channel.send(embed2)
   

   
    /*
     if(type=="personal")
    {

      
    }
    else if(type==="channel"){
        // posting to channel
        db.set(`remind.${message.author.id}`,Date.now() + ms(timeuser))
        message.channel.send("ok")
        const interval = setInterval(function() {
        
        
            if(Date.now() > db.fetch(`remind.${message.author.id}`)){
                db.delete(`remind.${message.author.id}`);
                const channell = client.channels.cache.find(channel => channel.name === channelName)

                channell.send(`**Remind:**${reason}`)
                
                .catch(e => console.log(e))
                clearInterval(interval)
            }
        
        },1000)


    }
    */
    
   
    }

  const CreateReminderStep=(MessageEmbed,message)=>{
    const embed = new MessageEmbed()
    .setTitle('Create Reminder')
    .setURL('https://example.com')
    .setAuthor('Calendar Bot')
    .setDescription('To Type The Reminder ,Type Reminder-timeinterval example Go To Gym -20s')
    .setColor('#FF2D00')
    .setTimestamp();

  message.author.send(embed);


  }  

    module.exports={CreateReminder,CreateReminderStep};