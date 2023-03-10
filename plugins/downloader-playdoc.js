import { youtubeSearch } from '@bochilteam/scraper'
import fetch from 'node-fetch'
let handler = async (m, { conn, command, text, usedPrefix }) => {
if (!text) throw `*Please enter a song name*\n\n*ββ Example:*\n*${usedPrefix + command} Good Feeling - Flo Rida*`
let vid = (await youtubeSearch(text)).video[0]
if (!vid) throw '*[βππππβ] π»πΎ ππΈπ΄π½ππΎ, π½πΎ πΏππ³π΄ π΄π½π²πΎπ½πππ°π π΄π» π°ππ³πΈπΎ/ππΈπ³π΄πΎ, πΈπ½ππ΄π½ππ΄ π²πΎπ½ πΎπππΎ π½πΎπΌπ±ππ΄/ππΈπππ»πΎ*'
try {
let { title, description, thumbnail, videoId, durationH, viewH, publishedTime } = vid
const url = 'https://www.youtube.com/watch?v=' + videoId
var doc = ['pdf','zip','vnd.openxmlformats-officedocument.presentationml.presentation','vnd.openxmlformats-officedocument.spreadsheetml.sheet','vnd.openxmlformats-officedocument.wordprocessingml.document']
var document = doc[Math.floor(Math.random() * doc.length)]
const buttons = [
{ buttonId: `#ytmp3doc ${url}`, buttonText: { displayText: 'π΅ AUDIODOC π΅' }, type: 1 },
{ buttonId: `#ytmp4doc ${url}`, buttonText: { displayText: 'π₯ VIDEODOC π₯' }, type: 1 },
{ buttonId: `#playlist ${text}`, buttonText: { displayText: 'π MORE RESULTS π' }, type: 1 }, ]    
let texto1 = `*βββπ PLAY DOCUMENT πβββ*\n
β π *TITLE:* ${title}
β π *PUBLISHED:* ${publishedTime}
β β *DURATION:* ${durationH}
β π *VIEWS:* ${viewH}
β π *DESCRIPTION:* ${description}`.trim()
let buttonMessage = {
"document": { url: "https://wa.me/34623442554" }, 
"fileName": 'β πΏ Κα΄α΄Κα΄α΄α΄α΄α΄α΄Κ α΄α΄ Κα΄α΄α΄α΄Κα΄', 
"mimetype": 'application/vnd.ms-excel',
"caption": texto1,
"fileLength": '99999999999999',
"mentions": [m.sender],
"footer": wm,
"buttons": buttons,
"headerType": 4,   
contextInfo: {
"mentionedJid": [m.sender],
"externalAdReply": {
"showAdAttribution": true,
"title": `${title}`,
"mediaType": 2, 
"previewType": "VIDEO",
"thumbnail": await (await fetch(thumbnail)).buffer(),
"mediaUrl": `${url}`,
"sourceUrl": `https://github.com/Shizu-Hub/Shizu-Bot-MD` }}} 
conn.sendMessage(m.chat, buttonMessage, { quoted: m })
} catch {
m.reply('*[βINFOβ] ERROR, When Uploding*')}}
handler.command = /^play3|playdoc?$/i
export default handler
