const ms = require("ms")
const db = require("quick.db")
const CreateReminder = async(client,message,args,MessageEmbed)=> {
    let timeuser = args[1]
    let reason = args[0]
 
   
    
    
    if(!timeuser) return message.reply(":x: You should enter time 10m 10s 10d")
    if(!reason) return message.reply(":x: You should enter reason")


    db.set(`remind.${message.author.id}`,Date.now() + ms(timeuser))
    message.channel.send("ok")
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
    .setDescription('To Create a Reminder ,type Reminder+Summary-time (10s,10m,10h) ,example Reminder+Remind Me To Go Gym-10s')
    .setColor('#FF2D00')
    .setTimestamp();

  message.author.send(embed);


  }  

    module.exports={CreateReminder,CreateReminderStep};