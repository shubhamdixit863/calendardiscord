const KickMember=async (message, args) => {
    if (!message.member.hasPermission('KICK_MEMBERS')) return message.reply('You cannot kick members')
    
    let member = message.mentions.members.first()
    if (!member) return message.reply('Please specify a member for me to kick them')
    let reason = args.slice(1).join(" ");
    if (!reason) reason = 'No Reason Given';
    if (!member.kickable) return message.reply('This member is not kickable')
    
    member.kick(reason).catch(err => console.log(err));
    message.channel.send("Kicked Out")
  }


  const BanMember=async (msg, args) => {
     
    if (msg.member.hasPermission("BAN_MEMBERS")) {
        if (msg.members.mentions.first()) {
            try {
                msg.members.mentions.first().ban();
            } catch {
                msg.reply("I do not have permissions to ban" + msg.members.mentions.first());
            }
        } else {
            msg.reply("You do not have permissions to ban" + msg.members.mentions.first());
        }
    }
 
  }

  module.exports={
    KickMember,
    BanMember
  }