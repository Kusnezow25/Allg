const {
    Client,
    GatewayIntentBits,
    PermissionFlagsBits
} = require('discord.js');

// 🔐 DEIN NEUER BOT TOKEN HIER
const TOKEN = 'HIER_NEUER_TOKEN_EINFÜGEN';

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
    if (!message.guild) return;

    if (message.content.toLowerCase() === '!c') {

        // Permission Check
        if (!message.member.permissions.has(PermissionFlagsBits.ManageMessages)) {
            return message.reply('❌ Du hast keine Rechte dafür!');
        }

        try {
            // Hinweis Nachricht
            await message.channel.send('🧹 Lösche Nachrichten...');

            let deleted;

            // löscht alle Nachrichten in 100er Blöcken
            do {
                deleted = await message.channel.bulkDelete(100, true);
            } while (deleted.size > 0);

            const msg = await message.channel.send('✅ Channel wurde geleert!');
            setTimeout(() => msg.delete().catch(() => {}), 3000);

        } catch (err) {
            console.error(err);
            message.channel.send('❌ Fehler: Nachrichten älter als 14 Tage können nicht gelöscht werden.');
        }
    }
});

client.login(TOKEN);
