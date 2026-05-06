const {
    Client,
    GatewayIntentBits,
    PermissionFlagsBits
} = require('discord.js');

require('dotenv').config();

// 🔐 TOKEN aus ENV (SICHER!)
const TOKEN = process.env.TOKEN;

if (!TOKEN) {
    console.log("❌ Kein TOKEN gefunden! Bitte ENV Variable setzen.");
    process.exit(1);
}

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

        if (!message.member.permissions.has(PermissionFlagsBits.ManageMessages)) {
            return message.reply("❌ Keine Rechte!");
        }

        try {
            let deleted;

            do {
                deleted = await message.channel.bulkDelete(100, true);
            } while (deleted.size > 0);

            const msg = await message.channel.send("🧹 Channel geleert!");
            setTimeout(() => msg.delete().catch(() => {}), 3000);

        } catch (err) {
            console.error(err);
            message.channel.send("❌ Nachrichten älter als 14 Tage können nicht gelöscht werden.");
        }
    }
});

client.login(TOKEN);
