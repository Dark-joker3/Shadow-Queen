import { youtubeSearch } from '@bochilteam/scraper'
let handler = async (m, { conn, args, usedPrefix, command, text }) => {
if (!text) throw `*Please enter a song name*\n\n*ââ Example:*\n*${usedPrefix + command} Begin you*`
try {
const { video } = await youtubeSearch(text)
const listSections = []
let teks = [...video ].map(v => {
switch (v.type) {
case 'video': {
listSections.push([`${v.title}`, [
['Video ð¥', `${usedPrefix}ytmp4 ${v.url}`, `descargar: ${v.title} (${v.url})`],
['Videodoc ð¥', `${usedPrefix}ytmp4doc ${v.url}`, `descargar: ${v.title} (${v.url})`],    
['Audio ð§', `${usedPrefix}ytmp3 ${v.url}`, `descargar: ${v.title} (${v.url})`],
['Audiodoc ð§', `${usedPrefix}ytmp3doc ${v.url}`, `descargar: ${v.title} (${v.url})`]
]])
}}}).filter(v => v).join('\n\n========================\n\n')
conn.sendList(m.chat, ' ã ð ð¨ð¦ððð ð¥ðððððð¢ð¡ððð ã', `ðð®ð¬ð¢ðð ð«ðð¥ððð¢ð¨ð§ððð ðð¨ð§: ${args.join(" ")}`, 'ðð¥ð¢ð£ð ð®ð§ð ð¨ð©ðð¢ð¨ð§ ð² ð©ð«ððð¢ð¨ð§ð ðð§ð¯ð¢ðð«', '[â¦ ðððððððððð â¦]', listSections, m)
} catch {
await m.reply('*[âINFOâ] ERROR, When Uploading*')
}}
handler.command = /^playlist|playlist2$/i
export default handler
