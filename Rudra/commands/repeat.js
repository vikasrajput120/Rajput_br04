const fs = require("fs");
const axios = require("axios");
const path = require("path");

module.exports.config = {
  name: "repeat",
  version: "1.0.0",
  permission: 0,
  credits: "Vikas Rajput",
  prefix: true,
  description: "Repeat text in cute Hindi voice",
  category: "voice",
  usages: ".repeat <text>",
  cooldowns: 5,
};

module.exports.run = async function ({ api, event, args }) {
  const text = args.join(" ");
  if (!text) {
    return api.sendMessage("❌ Please enter some text!", event.threadID, event.messageID);
  }

  const apiKey = "sk_ba000e93e0d86e17842c19994791f38a938fef3663f0c5fa"; // tumhari key
  const voiceId = "EXAVITQu4vr4xnSDxMaL"; // Anika voice
  const url = `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`;

  try {
    const response = await axios.post(
      url,
      {
        text,
        model_id: "eleven_multilingual_v2"
      },
      {
        headers: {
          "Accept": "audio/mpeg",
          "Content-Type": "application/json",
          "xi-api-key": apiKey,
        },
        responseType: "arraybuffer",
      }
    );

    // temp file save
    const filePath = path.join(__dirname, "voice.mp3");
    fs.writeFileSync(filePath, response.data);

    // send voice
    api.sendMessage(
      {
        body: "",
        attachment: fs.createReadStream(filePath)
      },
      event.threadID,
      () => fs.unlinkSync(filePath), // delete after sending
      event.messageID
    );
  } catch (err) {
    console.error(err);
    api.sendMessage("⚠️ Error generating voice!", event.threadID, event.messageID);
  }
};
