const axios = require("axios");
const yts = require("yt-search");

async function getStreamFromURL(url, pathName) {
    try {
        const response = await axios.get(url, { responseType: "stream" });
        response.data.path = pathName;
        return response.data;
    } catch (err) {
        throw err;
    }
}

function getVideoID(url) {
    const checkurl = /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))((\w|-){11})(?:\S+)?$/;
    const match = url.match(checkurl);
    return match ? match[1] : null;
}

module.exports.config = {
    name: "music",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "Mesbah Saxx (converted for Mirai by GPT)",
    description: "Download music from YouTube",
    commandCategory: "media",
    usages: "[song name or YouTube link]",
    cooldowns: 5,
};

module.exports.run = async function({ api, event, args }) {
    try {
        let videoID;
        const url = args[0];
        let w;

        if (!args[0]) {
            return api.sendMessage("❌ Please provide a song name or YouTube link.", event.threadID, event.messageID);
        }

        if (url.includes("youtube.com") || url.includes("youtu.be")) {
            videoID = getVideoID(url);
            if (!videoID) {
                return api.sendMessage("❌ Invalid YouTube URL.", event.threadID, event.messageID);
            }
        } else {
            const songName = args.join(" ");
            w = await api.sendMessage(`🔎 Searching song "${songName}"...`, event.threadID);
            const r = await yts(songName);
            const videos = r.videos.slice(0, 50);
            if (!videos || videos.length === 0) {
                return api.sendMessage("❌ No results found.", event.threadID, event.messageID);
            }
            const videoData = videos[Math.floor(Math.random() * videos.length)];
            videoID = videoData.videoId;
        }

        // ✅ Dipto API call
        const { data } = await axios.get(`https://api.dipto.repl.co/ytDl3?link=${videoID}&format=mp3`);
        const { title, quality, downloadLink } = data;

        if (w) api.unsendMessage(w.messageID);

        await api.sendMessage({
            body: `🎶 Title: ${title}\n✨ Quality: ${quality}`,
            attachment: await getStreamFromURL(downloadLink, title + ".mp3")
        }, event.threadID, event.messageID);

    } catch (e) {
        return api.sendMessage(`❌ Error: ${e.message}`, event.threadID, event.messageID);
    }
};
    
