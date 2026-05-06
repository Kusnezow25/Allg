const {
    Client,
    GatewayIntentBits,
    PermissionFlagsBits
} = require('discord.js');

// 🔐 TOKEN HIER EINTRAGEN (oder besser ENV nutzen)
const TOKEN = 'DEIN_BOT_TOKEN_HIER';

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

// 🧹 CLEAR COMMAND (!c)
client.on('messageCreate', async (message) => {
    if (message.author.bot) return;

    if (message.content.toLowerCase() === '!c') {

        if (!message.member.permissions.has(PermissionFlagsBits.ManageMessages)) {
            return message.reply('❌ Keine Rechte!');
        }

        try {
            await message.channel.send('🧹 Lösche alle Nachrichten...');

            let deleted;
            do {
                deleted = await message.channel.bulkDelete(100, true);
            } while (deleted.size !== 0);

            const done = await message.channel.send('✅ Channel geleert!');

            setTimeout(() => done.delete().catch(() => {}), 3000);

        } catch (err) {
            console.error(err);
            message.channel.send('❌ Fehler beim Löschen.');
        }
    }
});

client.login(TOKEN);
