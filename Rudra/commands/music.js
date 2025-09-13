const ytdl = require("ytdl-core");
const yts = require("yt-search");
const fs = require("fs");
const path = require("path");

module.exports.config = {
    name: "music",
    version: "1.1.0",
    hasPermssion: 0,
    credits: "Mesbah Saxx (fixed by GPT)",
    description: "Download music from YouTube",
    commandCategory: "media",
    usages: "[song name or YouTube link]",
    cooldowns: 5,
};

module.exports.run = async function({ api, event, args }) {
    try {
        if (!args[0]) {
            return api.sendMessage("❌ Please provide a song name or YouTube link.", event.threadID, event.messageID);
        }

        let videoID;
        let title;
        const url = args[0];

        if (url.includes("youtube.com") || url.includes("youtu.be")) {
            if (!ytdl.validateURL(url)) return api.sendMessage("❌ Invalid YouTube URL.", event.threadID, event.messageID);
            videoID = ytdl.getURLVideoID(url);
            const info = await ytdl.getInfo(videoID);
            title = info.videoDetails.title;
        } else {
            const songName = args.join(" ");
            const r = await yts(songName);
            if (!r.videos.length) return api.sendMessage("❌ No results found.", event.threadID, event.messageID);
            const videoData = r.videos[0];
            videoID = videoData.videoId;
            title = videoData.title;
        }

        const filePath = path.join(__dirname, "cache", `${title}.mp3`);
        const stream = ytdl(videoID, { filter: "audioonly", quality: "highestaudio" });

        stream.pipe(fs.createWriteStream(filePath)).on("finish", () => {
            api.sendMessage({
                body: `🎶 Title: ${title}`,
                attachment: fs.createReadStream(filePath)
            }, event.threadID, () => fs.unlinkSync(filePath), event.messageID);
        });

    } catch (e) {
        return api.sendMessage(`❌ Error: ${e.message}`, event.threadID, event.messageID);
    }
};
