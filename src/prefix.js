const db = require("quick.db");
const CreatePrefix=async (MessageEmbed,message,args)=>
{

    let changes = args[0]


    if(!message.member.hasPermission("MANAGE_GUILD")) return message.reply("You don't have required permissions")
    if(!changes) return message.reply(":x: You must enter a prefix! \n !prefix !!")
    
    if(changes > 1950) return message.reply(":x: Max 1950 characters")

    if(changes < 1) return message.reply(":x: Min 1 character")




    db.set(`prefix.${message.guild.id}`,changes)

    const embed = new MessageEmbed()
    .setTitle("Prefix Changed")
    .setDescription(`Your New Prefix Is ${changes}`)
    .setColor('#FF2D00')
    .setTimestamp();
    message.channel.send(embed)
}

module.exports=CreatePrefix;