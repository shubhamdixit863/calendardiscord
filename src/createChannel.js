const CreateChannel=(MessageEmbed,message)=>{


    if(!message.member.hasPermission("MANAGE_GUILD")) return message.reply("You don't have required permissions")
    let channelName=message.content.split("+");
            console.log("Author"+message.author);
            message.guild.channels.create(channelName[1], { type:"text" ,permissionOverwrites: [
                {
                  id: message.author.id,
                  allow: ['VIEW_CHANNEL','MANAGE_CHANNELS'],
                  
               },
             ],})
            .then(()=>message.channel.send("SuccessFully Created Channel"))
            .catch(err=>message.channel.send("Please Allow Me Permissions To Create Channels ,See Link-https://support.discord.com/hc/en-us/articles/206029707-How-do-I-set-up-Permissions-"));
            
}

const CreateChannelInstructions=(MessageEmbed,message,type)=>{
    if(!message.member.hasPermission("MANAGE_GUILD")) return message.reply("You don't have required permissions")

    const embed = new MessageEmbed()
    .setTitle('Follow Below Instructions To Create  A channel')
    .setURL('https://example.com')
    .setDescription(`Enter Channel+channelName ,example Channel+MyFavChannel`)
    .setColor('#FF2D00')
    .setThumbnail('https://example.png')
    .setImage('https://example.png')
    .setTimestamp();
  if(type)
  {

    message.author.send(embed);

  }

  else{
    message.channel.send(embed);

  }

}

module.exports={CreateChannel,CreateChannelInstructions};