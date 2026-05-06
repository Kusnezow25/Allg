const { 
    Client, 
    GatewayIntentBits, 
    PermissionFlagsBits 
} = require('discord.js');

// 🔐 HIER TOKEN EINTRAGEN
const TOKEN = 'MTUwMTU1MjkwODU1Mjg5NjUyMg.G3s8-V.vJkIqkL5c-lNikiMkeXIwwkBZMWBRQ7_V1cKUM';

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

        // Permission Check
        if (!message.member.permissions.has(PermissionFlagsBits.ManageMessages)) {
            return message.reply('❌ Du hast keine Rechte dafür!');
        }

        try {
            await message.channel.send('🧹 Lösche Nachrichten...');

            let deleted;
            do {
                deleted = await message.channel.bulkDelete(100, true);
            } while (deleted.size > 0);

            const msg = await message.channel.send('✅ Chat wurde geleert!');
            setTimeout(() => msg.delete().catch(() => {}), 3000);

        } catch (err) {
            console.error(err);
            message.channel.send('❌ Fehler beim Löschen (evtl. Nachrichten älter als 14 Tage).');
        }
    }
});

client.login(TOKEN);
