let linkRegex = /chat.whatsapp.com\/([0-9A-Za-z]{20,24})/i
export async function before(m, { isAdmin, isBotAdmin }) {
if (m.isBaileys && m.fromMe)
return !0
if (!m.isGroup) return !1
let chat = global.db.data.chats[m.chat]
let bot = global.db.data.settings[this.user.jid] || {}
const isGroupLink = linkRegex.exec(m.text)
const grupo = `https://chat.whatsapp.com`
if (isAdmin && chat.antiLink && m.text.includes(grupo)) return m.reply('*π·π΄π!! THE ANTILINK IS ACTIVE, BUT YOU ARE ADMIN π, SAVED/A!*')
if (chat.antiLink && isGroupLink && !isAdmin) {
if (isBotAdmin) {
const linkThisGroup = `https://chat.whatsapp.com/${await this.groupInviteCode(m.chat)}`
if (m.text.includes(linkThisGroup)) return !0
}    
await conn.sendButton(m.chat, `*γ ππππ πππππ γ*\n*see you baby π, ${await this.getName(m.sender)} YOU BROKE THE RULES OF THE GROUP, YOU WILL BE EXTERMNATED...!!*${isBotAdmin ? '' : '\n\n*[βππππβ] π΄π» π±πΎπ π½πΎ π΄π π°π³πΌπΈπ½, π½πΎ πΏππ΄π³π΄ π΄πππ΄ππΌπΈπ½π°π π° π»π°π πΏπ΄πππΎπ½π°π*'}`, author, ['π³π΄ππ°π²ππΈππ°π π°π½ππΈπ»πΈπ½πΊπ', '/disable antilink'], m)    
if (isBotAdmin && bot.restrict) {
await conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove')
} else if (!bot.restrict) return m.reply('*[βππππβ] THE BOT IS NOT ADMIN IT CANNOT EXTERMINATE PEOPLE, GIVE THE BOT ADMINSHIP TO EXTERMINATE PEOPLE*')
}
return !0
}
