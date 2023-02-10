import { createHash } from 'crypto'
let Reg = /\|?(.*)([.|] *?)([0-9]*)$/i
let handler = async function (m, { text, usedPrefix, command }) {
	function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)]
}
	let namae = conn.getName(m.sender)
	const sections = [
	{
	title: "Select Your Age Here!",
	rows: [
	    {title: "Random age", rowId: '.reg ' + namae + '.' + pickRandom(['30','29','28','27','26','25','24','23','22','21','20','19','18','17','16','15','14','13','12','11','10','9'])}
	]
    },
    {
	title: "ADULT",
	rows: [
	    {title: "30 Years", rowId: '.reg ' + namae + '.30 '},
	    {title: "29 Years", rowId: '.reg ' + namae + '.29 '},
	    {title: "28 Years", rowId: '.reg ' + namae + '.28 '},
	{title: "27 Years", rowId: '.reg ' + namae + '.27 '},
	{title: "26 Years", rowId: '.reg ' + namae + '.26 '},
	{title: "25 Years", rowId: '.reg ' + namae + '.25 '},
	{title: "24 Years", rowId: '.reg ' + namae + '.24 '},
	{title: "23 Years", rowId: '.reg ' + namae + '.23 '},
	{title: "22 Years", rowId: '.reg ' + namae + '.22 '},
	{title: "21 Years", rowId: '.reg ' + namae + '.21 '}
	]
    },
    {
	title: "YOUNG",
	rows: [
	    {title: "20 Years", rowId: '.reg ' + namae + '.20 '},
	    {title: "19 Years", rowId: '.reg ' + namae + '.19 '},
	    {title: "18 Years", rowId: '.reg ' + namae + '.18 '},
	{title: "17 Years", rowId: '.reg ' + namae + '.17 '},
	{title: "16 Years", rowId: '.reg ' + namae + '.16 '},
	{title: "15 Years", rowId: '.reg ' + namae + '.15 '},
	{title: "14 Years", rowId: '.reg ' + namae + '.14 '},
	{title: "13 Years", rowId: '.reg ' + namae + '.13 '},
	{title: "12 Years", rowId: '.reg ' + namae + '.12 '},
	{title: "11 Years", rowId: '.reg ' + namae + '.11 '},
	{title: "10 Years", rowId: '.reg ' + namae + '.10 '},
	{title: "9 Years", rowId: '.reg ' + namae + '.9 '}
	]
    },
]

const listMessage = {
  text: `Por favor selecciona tu edad pulsando el boton...\n*Tu nombre:* ${conn.getName(m.sender)}\nQuieres poner otro mombre? Escribe *${usedPrefix + command} TuNombre.TusAños*`,
  footer: global.wm,
  title: "━━━━「 Register 」━━━━",
  buttonText: "Press here!",
  sections
}

  let user = global.db.data.users[m.sender]
  if (user.registered === true) throw `[💬] You are already registered\nDo you want to register again? *${usedPrefix}unreg <NUMERO SN>*`
  if (!Reg.test(text)) return conn.sendMessage(m.chat, listMessage, m)
  let [_, name, splitter, age] = text.match(Reg)
  if (!name) throw 'El nombre no puede estar vacío (Letras)'
  if (!age) throw 'La edad no puede estar vacía (Numeros)'
  age = parseInt(age)
  if (age > 30) throw 'Que viejo (。-`ω´-)'
  if (age < 5) throw 'Los bebes no saben escribir ._.'
  user.name = name.trim()
  user.age = age
  user.regTime = + new Date
  user.registered = true
  let sn = createHash('md5').update(m.sender).digest('hex')
  let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : m.fromMe ? conn.user.jid : m.sender
  m.reply(`
━━━━ 「 *Register Complete* 」━━━━
╭─• 〘 INFO 〙
│✧ *Name:* ${name}
│✧ *Age:* ${age} Años
│✧ *SN:* ${sn}
▣──────···
`.trim())
}
handler.help = ['daftar', 'register'].map(v => v + ' <nama>.<umur>')
handler.tags = ['xp']

handler.command = /^(verify|verificar|registrar|reg(ister)?)$/i

export default handler
