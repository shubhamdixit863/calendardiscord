require("dotenv").config();
const {Client}=require('discord.js');
const client=new Client();
console.log(process.env.DISCORD_BOT_TOKEN);

client.on('ready',()=>{

    console.log(client.user.tag);
})

// messaging event

client.on('message',(message)=>{
    // Any message addressing to the bot will be handled by our bot
    
    if(message.content.includes("bot"))
    {
     message.channel.send(`Hey ${message.author} this is calendar ,How Can I help You ?`);
    }
    


})

client.login(process.env.DISCORD_BOT_TOKEN);