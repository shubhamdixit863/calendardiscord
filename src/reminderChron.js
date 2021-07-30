const db = require("quick.db")

const ReminderChron=(client,MessageEmbed)=>{
  setInterval(()=>{

    let remiderArray= db.fetch("reminders") || [];
    //console.log(remiderArray);
    remiderArray.forEach(element => {

        if(Date.now() > element.reminderDate){

            const embed = new MessageEmbed()
            .setTitle('Reminder')
            .setAuthor('Calendar Bot')
            .setDescription(`${element.message}`)
            .setColor('#3C33FF')
            .setThumbnail('https://example.png')
            .setImage('https://example.png')
            .setTimestamp();
          //  db.delete(`remind.${message.author.id}`)
          let filteredRem=remiderArray.filter(ele=>ele.id!=element.id);
          db.set("reminders",filteredRem);

          client.users.cache.get(element.authorId).send(embed).catch(e => console.log(e))
          
        }
        
    });

 


  },1000)



}

module.exports={
    ReminderChron
}