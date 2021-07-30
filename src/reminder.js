const ms = require("ms")
const db = require("quick.db")
const CreateReminder = async(client,message,args,MessageEmbed)=> {
    let timeuser = args[1]
    let reason = args[0]
 
   
    
    
    if(!timeuser) return message.reply(":x: You should enter time 10m 10s 10d")
    if(!reason) return message.reply(":x: You should enter reason")


    db.set(`remind.${message.author.id}`,Date.now() + ms(timeuser))

    const embed2 = new MessageEmbed()
    .setTitle('Reminder Created SuccessFully')
    .setAuthor('Calendar Bot')
    .setDescription(`Your Reminder`)
    .setColor('#3C33FF')
    .setThumbnail('https://example.png')
    .setImage('https://example.png')
    .addFooter('To ,Opt Out Of The Reminder ,Type  cancel-Your Reminder Id')
    .setTimestamp();

    message.channel.send(embed2)
    const interval = setInterval(function() {
    
   /**  Embed MEssage Creation*/

   const embed = new MessageEmbed()
            .setTitle('Reminder')
            .setAuthor('Calendar Bot')
            .setDescription(`${reason}`)
            .setColor('#3C33FF')
            .setThumbnail('https://example.png')
            .setImage('https://example.png')
            .setTimestamp();
            
            if(Date.now() > db.fetch(`remind.${message.author.id}`)){
            db.delete(`remind.${message.author.id}`)
            message.author.send(embed)
            .catch(e => console.log(e))
            clearInterval(interval)
        }
    
    },1000)

   
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