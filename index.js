require('dotenv').config()

const { Client, Intents, Collection } = require('discord.js');
const bot = new Client({
    allowedMentions: {
        parse: ["users", "roles"],
        repliedUser: true
    },
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_PRESENCES,
        Intents.FLAGS.GUILD_INTEGRATIONS,
        Intents.FLAGS.DIRECT_MESSAGES,
        Intents.FLAGS.DIRECT_MESSAGE_TYPING,
        Intents.FLAGS.GUILD_VOICE_STATES,
        Intents.FLAGS.GUILD_WEBHOOKS,
        Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
        Intents.FLAGS.GUILD_INVITES,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_BANS,
        Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS
    ],
    presence: {
        status: "online",
        activities: [{
            name: `${process.env.prefix}help 來獲取幫助`,
            type: "LISTENING"
        }]
    },
    userAgentSuffix: [
        "DiscordBetaMusicBot/1.0.0 (https://www.xinrui.tk/)",
        "DiscordJS/13.1.0 (https://discord.js.org)"
    ]
});
const fs = require("fs")
bot.commands = new Collection();
bot.aliases = new Collection();

fs.readdirSync("./commands/").map(dir => {
    fs.readdirSync(`./commands/${dir}/`).map(cmd => {
        let pull = require(`./commands/${dir}/${cmd}`)
        let Aliases = []; let other = ""
        bot.commands.set(pull.name, pull)
        if (pull.aliases) {
            pull.aliases.forEach(p => {
                Aliases.push(p)
                bot.aliases.set(p, pull)
            })
            other = ", 別名為：" + Aliases.join(", ")
        }
        console.log(`✔ 成功加載指令 ${pull.name}${other}`)
    })
})

bot.on('ready', () => {
    console.log(`嗨, ${bot.user.username} 现在已上綫!`)
})

bot.on('messageCreate', async message => {
    let prefix = process.env.prefix

    if (message.author.bot) return;
    if (!message.content.toLowerCase().startsWith(prefix)) return;

    if (!message.member) message.member = await message.guild.fetchMember(message);
    if (!message.guild) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();

    if (cmd.length === 0) return;

    let command = bot.commands.get(cmd);
    if (!command) command = bot.aliases.get(cmd);

    if (command) {
        console.log(`${message.member.user.tag} ` + "执行了指令:", message.content)
        command.run(bot, message, args)
    }
})

bot.login(process.env.token)