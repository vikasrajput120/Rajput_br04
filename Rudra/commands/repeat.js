const { ElevenLabsClient } = require("elevenlabs");
const fs = require("fs");
const path = require("path");

// 📝 Vikas Rajput credit
module.exports = {
    name: "repeat",
    description: "Anime (Anika) voice me text bolke audio bhejo",
    usage: "!say <text>",

    run: async (client, message, args) => {
        if (!args.length) {
            return message.reply("❌ Please text likho jo bolwana hai!");
        }

        const text = args.join(" ");

        try {
            // 🔑 ElevenLabs client setup
            const elevenlabs = new ElevenLabsClient({
                apiKey: "sk_ba000e93e0d86e17842c19994791f38a938fef3663f0c5fa", // <- tumhara API key
            });

            // 🎤 Anika voice ka ID (fixed)
            const voiceId = "EXAVITQu4vr4xnSDxMaL"; // Anika voice ID

            // 📂 File path (temporary audio save)
            const filePath = path.resolve(__dirname, `../temp/say-${Date.now()}.mp3`);

            // 🔊 Convert text to speech
            const audioStream = await elevenlabs.generate({
                voice: voiceId,
                model_id: "eleven_multilingual_v2",
                text,
            });

            // Save audio file
            const buffer = Buffer.from(await audioStream.arrayBuffer());
            fs.writeFileSync(filePath, buffer);

            // Send file in chat
            await message.reply({ files: [filePath] });

            // Delete file after sending
            setTimeout(() => {
                fs.unlinkSync(filePath);
            }, 5000);

        } catch (err) {
            console.error(err);
            return message.reply("⚠️ Error aaya voice generate karte waqt!");
        }
    }
};
