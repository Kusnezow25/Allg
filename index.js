const { 
    Client, 
    GatewayIntentBits, 
    PermissionFlagsBits 
} = require('discord.js');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

const TOKEN = 'MTUwMTU1MjkwODU1Mjg5NjUyMg.GS6YWZ.WDEpDXl5FI_fclleBMaa62DGKbveJNR31zBKiQ';

client.once('ready', () => {
    console.log(`✅ Eingeloggt als ${client.user.tag}`);
});

// Funktion: löscht ALLE Nachrichten (in 100er Blöcken)
async function clearAll(channel) {
    let deleted;

    do {
        deleted = await channel.bulkDelete(100, true);
    } while (deleted.size !== 0);
}

client.on('messageCreate', async (message) => {
    if (message.author.bot) return;

    if (message.content.toLowerCase() === '!c') {

        if (!message.member.permissions.has(PermissionFlagsBits.ManageMessages)) {
            return message.reply('❌ Keine Rechte!');
        }

        try {
            await message.reply('🧹 Lösche alle Nachrichten...');

            await clearAll(message.channel);

            const done = await message.channel.send('✅ Channel wurde geleert!');

            setTimeout(() => done.delete().catch(() => {}), 3000);

        } catch (err) {
            console.error(err);
            message.channel.send('❌ Fehler beim Löschen.');
        }
    }
});

client.login(TOKEN);