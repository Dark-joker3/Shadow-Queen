import fetch from 'node-fetch'
let handler = async(m, { conn, text }) => {
if (!text) return conn.reply(m.chat, '*[βππππβ] πΈπ½ππ΄πππ΄ π΄π» π²πΎπΌπ°π½π³πΎ πΌπ°π π΄π» π½πΎπΌπ±ππ΄ π³π΄ ππππ°ππΈπΎ π³π΄ ππ½ ππππ°ππΈπΎ π³π΄ ππΈπΊππΎπΊ*', m)
try {
let res = await fetch(`https://api.lolhuman.xyz/api/stalktiktok/${text}?apikey=${lolkeysapi}`)
let res2 = `https://api.lolhuman.xyz/api/pptiktok/${text}?apikey=${lolkeysapi}`
let json = await res.json()
if (res.status !== 200) throw await res.text()
if (!json.status) throw json
let thumb = await (await fetch(json.result.user_picture)).buffer()
let Mystic = `
*USER:* ${json.result.username}
*NAME:* ${json.result.nickname}
*FOLLOWERS:* ${json.result.followers}
*FOLLOWED:* ${json.result.followings}
*LIKES:* ${json.result.likes}
*VIDEOS:* ${json.result.video}
*DESCRIPTION:* ${json.result.bio}
`.trim()
conn.sendFile(m.chat, res2, 'error.jpg', Mystic, m, false)
} catch (e) {
throw '*[βINFOβ] ERROR, THE USERNAME ENTERED WAS NOT RECEIVED*'
}}
handler.help = ['tiktokstalk'].map(v => v + ' <username>')
handler.tags = ['stalk']
handler.command = /^(tiktokstalk|ttstalk)$/i
export default handler
