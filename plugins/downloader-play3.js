import { youtubeSearch } from '@bochilteam/scraper'
let handler = async (m, { conn, command, text, usedPrefix }) => {
if (!text) throw `*Please enter a song name*\n\n*ββ Example:*\n*${usedPrefix + command} Good Feeling - Flo Rida*`
let vid = (await youtubeSearch(text)).video[0]
if (!vid) throw '*[βππππβ] π»πΎ ππΈπ΄π½ππΎ, π½πΎ πΏππ³π΄ π΄π½π²πΎπ½πππ°π π΄π» π°ππ³πΈπΎ/ππΈπ³π΄πΎ, πΈπ½ππ΄π½ππ΄ π²πΎπ½ πΎπππΎ π½πΎπΌπ±ππ΄/ππΈπππ»πΎ*'
try {
let { title, description, thumbnail, videoId, durationH, viewH, publishedTime } = vid
const url = 'https://www.youtube.com/watch?v=' + videoId
conn.sendHydrated(m.chat, `
*ββ ππππ ππππππππ ββ*

π *TITLE:* ${title}
π *DESCRIPTION:* ${description}
π *PUBLISHED:* ${publishedTime}
β *DURATION:* ${durationH}
π *VIEWS:* ${viewH}
`.trim(), author, thumbnail, `${url}`, 'πππ»', null, null, [
['AUDIO', `${usedPrefix}yta.2 ${url}`],
['VIDEO', `${usedPrefix}ytv.2 ${url}`]
], m)
}catch(e){
m.reply('*[βINFOβ] ERROR, When Uploading*')
console.log(e)
}}
handler.command = /^play3|playdoc?$/i
export default handler
