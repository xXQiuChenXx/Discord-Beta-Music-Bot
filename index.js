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
        Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS
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
    /*
    bot.application.commands.set([{
        name: "play",
        description: "Plays a song!",
        options: [
            {
                name: "query",
                type: "STRING",
                description: "The song you want to play",
                required: true
            }
        ]
    }])*/
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



const client = bot
const { Player } = require("premium-player");
// Create a new Player (you don't need any API Key)
const player = new Player(client);
const downloader = require("premium-extractor").Downloader;
const Kristen = require("epic-extractor").Downloader;

player.use("YOUTUBE_DL", downloader);
player.use("Kristen", Kristen)

// add the trackStart event so when a song will be played this message will be sent
player.on("trackStart", (queue, track) => queue.metadata.channel.send(`🎶 | Now playing **${track.title}**!`))
client.on("interactionCreate", async (interaction) => {
    if (!interaction.isCommand()) return;

    // /play Despacito
    // will play "Despacito" in the voice channel
    if (interaction.commandName === "play") {
        if (!interaction.member.voice.channelId) return await interaction.reply({ content: "You are not in a voice channel!", ephemeral: true });
        if (interaction.guild.me.voice.channelId && interaction.member.voice.channelId !== interaction.guild.me.voice.channelId) return await interaction.reply({ content: "You are not in my voice channel!", ephemeral: true });
        const query = interaction.options.get("query").value;
        const queue = player.createQueue(interaction.guild, {
            metadata: {
                channel: interaction.channel
            }
        });

        // verify vc connection
        try {
            if (!queue.connection) await queue.connect(interaction.member.voice.channel);
        } catch {
            queue.destroy();
            return await interaction.reply({ content: "Could not join your voice channel!", ephemeral: true });
        }

        await interaction.deferReply();
        const track = await player.search(query, {
            requestedBy: interaction.user
        }).then(x => x.tracks[0]);
        if (!track) return await interaction.followUp({ content: `❌ | Track **${query}** not found!` });

        queue.play(track);

        return await interaction.followUp({ content: `⏱️ | Loading track **${track.title}**!` });
    }
});

bot.login(process.env.token)