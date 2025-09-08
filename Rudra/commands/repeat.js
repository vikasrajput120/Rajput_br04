const axios = require("axios");
const fs = require("fs");
const path = require("path");

module.exports.config = {
    name: "repeat",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "Vikas Rajput",
    description: "Repeat text as cute Hindi voice",
    commandCategory: "fun",
    usages: "[text]",
    cooldowns: 5
};

module.exports.run = async function ({ api, event, args }) {
    const text = args.join(" ");
    if (!text) {
        return api.sendMessage("❌ Please enter some text!", event.threadID, event.messageID);
    }

    try {
        // ElevenLabs API settings
        const apiKey = process.env.ELEVEN_API_KEY || "sk_ba000e93e0d86e17842c19994791f38a938fef3663f0c5fa"; // tumhari key
        const voiceId = "EXAVITQu4vr4xnSDxMaL"; // Anika ka default voiceId

        // Request TTS
        const response = await axios.post(
            `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
            {
                text,
                voice_settings: { stability: 0.6, similarity_boost: 0.8 }
            },
            {
                headers: {
                    "Accept": "audio/mpeg",
                    "Content-Type": "application/json",
                    "xi-api-key": apiKey
                },
                responseType: "arraybuffer"
            }
        );

        // Save audio file
        const filePath = path.join(__dirname, "repeat.mp3");
        fs.writeFileSync(filePath, response.data);

        // Send audio as voice message
        return api.sendMessage(
            { body: `🔁 ${text}`, attachment: fs.createReadStream(filePath) },
            event.threadID,
            () => fs.unlinkSync(filePath), // delete after sending
            event.messageID
        );

    } catch (err) {
        console.error(err);
        return api.sendMessage("⚠️ Error generating voice!", event.threadID, event.messageID);
    }
};
