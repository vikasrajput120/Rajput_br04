module.exports.config = {
  name: "rankup",
  version: "7.3.1",
  hasPermssion: 1,
  credits: "Vikas Rajput",
  description: "Announce rankup for each group, user",
  commandCategory: "Edit-IMG",
  dependencies: {
    "fs-extra": "",
    "canvas": "",
    "axios": ""
  },
  cooldowns: 2,
};

module.exports.handleEvent = async function({ api, event, Currencies, Users, getText }) {
  const { threadID, senderID } = event;
  const fs = global.nodemodule["fs-extra"];
  const { loadImage, createCanvas } = require("canvas");
  const axios = global.nodemodule["axios"];

  let pathImg = __dirname + "/cache/rankup.png";
  let pathAvt = __dirname + "/cache/avt.png";
  let id = String(senderID);

  const thread = global.data.threadData.get(String(threadID)) || {};

  let exp = (await Currencies.getData(id)).exp;
  exp += 1;
  if (isNaN(exp)) return;

  if (thread["rankup"] === false) {
    await Currencies.setData(id, { exp });
    return;
  }

  const curLevel = Math.floor((Math.sqrt(1 + (4 * exp / 3) + 1) / 2));
  const level = Math.floor((Math.sqrt(1 + (4 * (exp + 1) / 3) + 1) / 2));

  if (level > curLevel && level != 1) {
    const name = global.data.userName.get(id) || await Users.getNameUser(id);
    let message = thread.customRankup || getText("levelup");

    message = message.replace(/\{name}/g, name).replace(/\{level}/g, level);

    // Random background
    const backgrounds = [
      "https://i.postimg.cc/Z5VRbCqN/Picsart-24-07-07-08-59-35-199-1.jpg",
      "https://i.postimg.cc/KYYTz0KJ/Picsart-24-01-18-11-46-47-596.jpg",
    ];
    const rd = backgrounds[Math.floor(Math.random() * backgrounds.length)];

    // Avatar
    let getAvt = (
      await axios.get(`https://graph.facebook.com/${id}/picture?width=720&height=720&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`, { responseType: "arraybuffer" })
    ).data;
    fs.writeFileSync(pathAvt, Buffer.from(getAvt, "utf-8"));

    // Background
    let getBg = (await axios.get(rd, { responseType: "arraybuffer" })).data;
    fs.writeFileSync(pathImg, Buffer.from(getBg, "utf-8"));

    // Canvas
    let baseImage = await loadImage(pathImg);
    let baseAvt = await loadImage(pathAvt);
    let canvas = createCanvas(baseImage.width, baseImage.height);
    let ctx = canvas.getContext("2d");

    ctx.drawImage(baseImage, 0, 0, canvas.width, canvas.height);
    ctx.rotate(-25 * Math.PI / 180);
    ctx.drawImage(baseAvt, 37, 120, 125, 130);

    const imageBuffer = canvas.toBuffer();
    fs.writeFileSync(pathImg, imageBuffer);
    fs.removeSync(pathAvt);

    api.sendMessage(
      { body: message, mentions: [{ tag: name, id }], attachment: fs.createReadStream(pathImg) },
      threadID,
      () => fs.unlinkSync(pathImg)
    );
  }

  await Currencies.setData(id, { exp });
};

module.exports.languages = {
  "vi": {
    "off": "𝗧𝗮̆́𝘁",
    "on": "𝗕𝗮̣̂𝘁",
    "successText": "thông báo rankup ✨",
    "levelup": "{name} vừa lên level {level}!"
  },
  "en": {
    "on": "on",
    "off": "off",
    "successText": "success notification rankup!",
    "levelup": "🎉 Congrats {name}, you reached level {level}!"
  }
};

module.exports.run = async function({ api, event, Threads, getText }) {
  const { threadID, messageID } = event;
  let data = (await Threads.getData(threadID)).data;

  if (typeof data["rankup"] == "undefined" || data["rankup"] == false) data["rankup"] = true;
  else data["rankup"] = false;

  await Threads.setData(threadID, { data });
  global.data.threadData.set(threadID, data);
  return api.sendMessage(`${(data["rankup"] == true) ? getText("on") : getText("off")} ${getText("successText")}`, threadID, messageID);
};
		
