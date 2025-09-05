const fs = global.nodemodule["fs-extra"];
module.exports.config = {
  name: "goibot",
  version: "1.0.1",
  hasPermssion: 0,
  credits: "Fixed By Arun Kumar",
  description: "goibot",
  commandCategory: "Noprefix",
  usages: "noprefix",
  cooldowns: 5,
};
module.exports.handleEvent = async function({ api, event, args, Threads, Users }) {
  var { threadID, messageID, reason } = event;
  const moment = require("moment-timezone");
  const time = moment.tz("Asia/Kolkata").format("DD/MM/YYYY || HH:mm:ss");
  var idgr = `${event.threadID}`;
  var id = event.senderID;
  var name = await Users.getNameUser(event.senderID);

  var tl = ["𝗟𝗮𝗴𝗮𝗹 𝗹𝗮𝗴𝗮𝗹 𝗷𝗵𝘂𝗹𝗻𝗶𝘆𝗮 𝗺𝗲 𝗱𝗵𝗮𝗸𝗮 😁 𝗕𝗮𝗹𝗮𝗺 𝗸𝗮𝗹𝗸𝗮𝘁𝗮 𝗰𝗵𝗮𝗹𝗮 🤭😝" , "मुझसे आपसे बात नहीं करनी गंदे बाबू हो आप ☹️" , "𝗕𝗶𝗵𝗮 𝗵𝗼 𝗴𝗮𝘆𝗮 𝗮𝗽𝗸𝗮 🥵" , "इतनी बेरोजगारी है देखो और कुछ नहीं तो बॉट बॉट कर रहे हैं 😹😐" , "𝗞𝘆𝗮 𝗺𝗮𝗮𝗹 𝗵𝗮𝗶 𝘆𝗮𝗮𝗿 𝗰𝗼𝗼𝗸𝗶𝗻 𝗵𝗮𝗶 𝗰𝗼𝗼𝗸𝗶𝗻 🤤🥵" , "मैने तेरा सर खाना देना है पागल इंसान 😡" , "Chay pe Chaloge" , "Mere liye Chay Bana Kar LA ,Pura din Dekho Bot BoT🙄" , "Din vicho tere Layi Teym Kadd ke, Kardi me Promise     Milan aungi" ,  "Yee bat Delhi tak jayegi" , "𝗝𝗵𝗮𝗺𝗸𝗮𝘂𝗹𝗮 𝘀𝗲 𝗵𝗼𝗶 😜" , "ME HERAAN HU KI TUM BINA DIMAG KESE REH LETE HO☹️" , "sheHar me Hai rukka baeje Rao Saab ka🙄" , "Bewafa Nikali re tu🙂🤨", "Systemmmmmmm😴" , "Leja Leja tenu 7 samundra paar🙈🙈", "Laado puche manne kyu tera rang kala" , "Moye moye moye moye🙆🏻‍♀🙆🏻‍♀" , "Ye dukh kahe nahi khatm hota 🙁" , "Tum to dokebaz ho" , "you just looking like a wow😶" , "Mera aasmaan dhunde teri zamin" , "Kal ana abhi lunch time hai" , "Jab dekho B0T B0T b0T😒😒", "Chhodo na koi dekh lega🤭", "Kab ayega mere banjaare" , "Tum wahi ho na ,jisko.me.nahi janti 🙂" , "Ye I love you kya hota hai" , "Sunai deta hai mujhe behri nahi hu me   😒" , "so elegent, so beautiful , just looking like a wow🤭" , "began🙂" , "Aayein🤔" , "I Love you baby , mera recharge khtm hone wala h" , "paani paani uncle ji" , "apne Labhar ko dhoka do , daling hme bhi moka do🙈" , "Arry Bas Kar🤣😛" , "Me ni To Kon Be" , "naam adiya kumar 7vi kaksha me padhte hai favret subject begon😘" , "Mera Dimag Mat Khaya kro😒😒" , "Chuppp Saatvi Fail😒" , "Saste Nashe Kab Band kroge" , "Mai Jaanu Ke sath Busy hu yar, mujhe mat balao" , "Haye Jaanu Mujhe Yaad Kiya🙈" , "Hayee ese mt bulaya kro, mujhe sharm aati h" , "System pe system betha rahi chhori bot ki" , "Naach meri Bulbul tujhe pesa milega" , "me idhar se hu aap kidhar se ho" , "Khelega Free Fire🙈🙈" , "aye haye oye hoye aye haye oye hoye😍 bado badi bado badi😘" , "e halo bhai darr rha hai kya" , "akh ladi bado badi" , "haaye garmi😕" , "Ao kabhi haweli pe😍" , "Khelega Free Fire🥴" , "Hallo bai tu darr raha hai kya" , "janu bula raha h mujhe" , "I cant live without you babu😘" , "haa meri jaan" , "Agye Phirse Bot Bot Krne🙄" , "konse color ki jacket pehne ho umm btao na😚" , "dhann khachh booyaah"];
  var rand = tl[Math.floor(Math.random() * tl.length)]
   mess = "{name}"
  if (event.body.indexOf("Bot") == 0 || (event.body.indexOf("bot") == 0)) {
    var msg = {
      body: `👀${name}👀,  \n\n『\n   ${rand} 』\n\n❤️𝙲𝚛𝚎𝚍𝚒𝚝𝚜 : 𝐕𝐈𝐊𝐀𝐒 𝐑𝐀ᒍ𝐏𝐔𝐓 `
    }
    return api.sendMessage(msg, threadID, messageID);
  };

}

module.exports.run = function({ api, event, client, __GLOBAL }) { }
