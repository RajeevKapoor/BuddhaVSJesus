const Discord = require('discord.js');
const config = require('./config.json');
const cleverbot = require("cleverbot-free");
const client1 = new Discord.Client();
const client2 = new Discord.Client();

const timerSet = new Set();

client1.on('ready', () => {
    console.log(`Logged in as ${client1.user.tag}!`);
    client1.channels.get(config.aichannelid).send(`<@${client2.user.id}> Hi!`)
    client1.channels.forEach(channel => {
		if(channel.type == "text"){
			channel.stopTyping()
		}
	})
});
client2.on('ready', () => {
    console.log(`Logged in as ${client2.user.tag}!`);
    client2.channels.forEach(channel => {
		if(channel.type == "text"){
			channel.stopTyping()
		}
	})
});

client1.on('message', async message => {
    if(!timerSet.has(message.author.id) && message.mentions.users.first() === client1.user &&! message.author.bot){
 	timerSet.add(message.author.id)
	setTimeout(function(){
		timerSet.delete(message.author.id)
	}, 2 * 1000)
    }
    else if(message.mentions.users.first() === client1.user &&! message.author.bot){
	return message.reply(`:no_entry: You must wait 2 seconds before talking to the bot again!`)
	}
    if (message.mentions.users.first() === client1.user) {
        await message.channel.startTyping()
        await cleverbot(message.content.replace(`<@${client1.user.id}> `, ``).replace(`<@!${client1.user.id}> `, ``)).then(async response => {
            await message.reply(response)
            await message.channel.stopTyping()
        });
    }
});
client2.on('message', async message => {
    if(!timerSet.has(message.author.id) && message.mentions.users.first() === client2.user &&! message.author.bot){
 	timerSet.add(message.author.id)
	setTimeout(function(){
		timerSet.delete(message.author.id)
	}, 2 * 1000)
    }
    else if(message.mentions.users.first() === client2.user &&! message.author.bot) {
	return message.reply(`:no_entry: You must wait 2 seconds before talking to the bot again!`)
	}

    if (message.mentions.users.first() === client2.user) {
        await message.channel.startTyping()
        await cleverbot(message.content.replace(`<@${client2.user.id}> `, ``).replace(`<@!${client2.user.id}> `, ``)).then(async response => {
            await message.reply(response)
            await message.channel.stopTyping()
        });
    }
});

// Login to the bots
client1.login(config.client1_token);
client2.login(config.client2_token);
