const {
    Client,
    GatewayIntentBits,
    PermissionFlagsBits
} = require('discord.js');

// 🔐 TOKEN NICHT HARDCODEN (besser ENV nutzen)
const TOKEN = process.env.TOKEN;

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

client.once('ready', () => {
    console.log(`✅ Bot online als ${client.user.tag}`);
});

client.on('messageCreate', async (message) => {
    if (message.author.bot) return;
    if (!message.guild) return;

    if (message.content.toLowerCase() === '!c') {

        if (!message.member.permissions.has(PermissionFlagsBits.ManageMessages)) {
            return message.reply('❌ Keine Rechte!');
        }

        try {
            let messages;
            do {
                messages = await message.channel.bulkDelete(100, true);
            } while (messages.size > 0);

            const msg = await message.channel.send('🧹 Channel geleert!');
            setTimeout(() => msg.delete().catch(() => {}), 3000);

        } catch (err) {
            console.error(err);
            message.channel.send('❌ Nachrichten älter als 14 Tage können nicht gelöscht werden.');
        }
    }
});

client.login(TOKEN);
