const Discord = require('discord.js');
const config = require('./config.json');
const cleverbot = require("cleverbot-free");
const jesus_client = new Discord.Client();
const buddha_client = new Discord.Client();

jesus_client.on('ready', () => {
    console.log(`Logged in as ${jesus_client.user.tag}!`);
    jesus_client.channels.get(`681970286597373966`).send(`<@${buddha_client.user.id}> Hi!`)
    jesus_client.channels.forEach(channel => {
		if(channel.type == "text"){
			channel.stopTyping()
		}
	})
});
buddha_client.on('ready', () => {
    console.log(`Logged in as ${buddha_client.user.tag}!`);
    buddha_client.channels.forEach(channel => {
		if(channel.type == "text"){
			channel.stopTyping()
		}
	})
});

jesus_client.on('message', async message => {
    if (message.mentions.users.first() === jesus_client.user) {
        await message.channel.startTyping()
        await cleverbot(message.content.replace(`<@${jesus_client.user.id}> `, ``).replace(`<@!${jesus_client.user.id}> `, ``)).then(async response => {
            await message.reply(response)
            await message.channel.stopTyping()
        });
    }
});
buddha_client.on('message', async message => {
    if (message.mentions.users.first() === buddha_client.user) {
        await message.channel.startTyping()
        await cleverbot(message.content.replace(`<@${buddha_client.user.id}> `, ``).replace(`<@!${buddha_client.user.id}> `, ``)).then(async response => {
            await message.reply(response)
            await message.channel.stopTyping()
        });
    }
});

jesus_client.login(config.jesus_token);
buddha_client.login(config.buddha_token);