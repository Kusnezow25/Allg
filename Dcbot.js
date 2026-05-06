const {
    Client,
    GatewayIntentBits,
    PermissionFlagsBits
} = require('discord.js');

// ⚠️ NEUEN TOKEN HIER EINSETZEN (nach Reset!)
const TOKEN = 'HIER_NEUER_TOKEN';

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
            await message.channel.send('🧹 Lösche Nachrichten...');

            let deleted;
            do {
                deleted = await message.channel.bulkDelete(100, true);
            } while (deleted.size > 0);

            const done = await message.channel.send('✅ Channel geleert!');
            setTimeout(() => done.delete().catch(() => {}), 3000);

        } catch (err) {
            console.error("CLEAR ERROR:", err);
            message.channel.send('❌ Fehler (evtl. Nachrichten älter als 14 Tage)');
        }
    }
});

client.login(TOKEN);
