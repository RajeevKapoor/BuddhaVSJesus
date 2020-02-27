const Discord = require('discord.js');
const config = require('./config.json');
const cleverbot = require("cleverbot-free");
const client1 = new Discord.Client();
const client2 = new Discord.Client();

const timerSet = new Set();

client1.on('ready', () => {
    console.log(`Logged in as ${jesus_client.user.tag}!`);
    jesus_client.channels.get(`681970286597373966`).send(`<@${buddha_client.user.id}> Hi!`)
    jesus_client.channels.forEach(channel => {
		if(channel.type == "text"){
			channel.stopTyping()
		}
	})
});
client2.on('ready', () => {
    console.log(`Logged in as ${buddha_client.user.tag}!`);
    buddha_client.channels.forEach(channel => {
		if(channel.type == "text"){
			channel.stopTyping()
		}
	})
});

client1.on('message', async message => {
    if(!timerSet.has(message.author.id) && message.mentions.users.first() === jesus_client.user &&! message.author.bot){
 	timerSet.add(message.author.id)
	setTimeout(function(){
		timerSet.delete(message.author.id)
	}, 2 * 1000)
    }
    else if(message.mentions.users.first() === jesus_client.user &&! message.author.bot){
	return message.reply(`:no_entry: You must wait 2 seconds before talking to the bot again!`)
	}
    if (message.mentions.users.first() === jesus_client.user) {
        await message.channel.startTyping()
        await cleverbot(message.content.replace(`<@${jesus_client.user.id}> `, ``).replace(`<@!${jesus_client.user.id}> `, ``)).then(async response => {
            await message.reply(response)
            await message.channel.stopTyping()
        });
    }
});
client2.on('message', async message => {
    if(!timerSet.has(message.author.id) && message.mentions.users.first() === buddha_client.user &&! message.author.bot){
 	timerSet.add(message.author.id)
	setTimeout(function(){
		timerSet.delete(message.author.id)
	}, 2 * 1000)
    }
    else if(message.mentions.users.first() === buddha_client.user &&! message.author.bot) {
	return message.reply(`:no_entry: You must wait 2 seconds before talking to the bot again!`)
	}

    if (message.mentions.users.first() === buddha_client.user) {
        await message.channel.startTyping()
        await cleverbot(message.content.replace(`<@${buddha_client.user.id}> `, ``).replace(`<@!${buddha_client.user.id}> `, ``)).then(async response => {
            await message.reply(response)
            await message.channel.stopTyping()
        });
    }
});

// Login to the bots
client1.login(config.buddha_token);
client2.login(config.jesus_token);
