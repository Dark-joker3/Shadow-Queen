const Config = require('../config');
let wk = Config.WORKTYPE == 'public' ? false : true
const Lang = Language.getString('scrapers');
const {MessageType, GroupSettingChange, Mimetype, MessageOptions} = require('@adiwajshing/baileys');
const axios = require('axios')
const cheerio = require('cheerio')
const play = require('playstore-scraper')
const { webp2img } = require('../lib/ezgif');
var DOWN =''
   if (Config.LANG == 'EN') DOWN  = '*📥Downloading your APK...*'
var UP =''
   if (Config.LANG == 'EN') UP  = '*📤Uploading your APK...*'
var N_FOUND =''
   if (Config.LANG == 'EN') N_FOUND  = '*🧜‍♀️🧜‍♂️APK not found*'
var NEED =''
   if (Config.LANG == 'EN') NEED  = '*🧜‍♀️🧜‍♂️Please enter a valid google play store apk link.\nyou can get it using .findapk command*'
var DESC =''
   if (Config.LANG == 'EN') DESC  = 'download APK from google play store'
var SDESC =''
   if (Config.LANG == 'EN') SDESC = '*it searchs on google play store*'

Aqua.addCommand({ pattern: 'findapk ?(.*)', fromMe: wk, desc:SDESC, deleteCommand: false }, async (message, match) => {
   
   if (match[1] === '') return await message.client.sendMessage(message.jid,'*Need App Name!*',MessageType.text, {quoted: message.data})
   var load = await message.client.sendMessage(message.jid,Lang.SEARCHING,MessageType.text, {quoted: message.data}); 
   const try1 = await play.search(match[1])
    get_result = try1.results
    ini_txt = ""
    for (var x of get_result) {
   ini_txt += `📦 Name : ${x.title}\n`
	ini_txt += `👨‍💻 Developer : ${x.developer}\n`
	ini_txt += `📃 Description : ${x.description}\n`
	ini_txt += `⭐ Rating : ${x.rating}\n`
   ini_txt += `🔗 Link : ${x.link}\n`
	ini_txt += `─────────────────\n\n`
        }
        await message.client.sendMessage(message.jid, '╔═══════════════╗\n║ *Black-KD PlayStore Search*║\n╚═══════════════╝\n\n' + ' *─────────────────* \n\n' + ini_txt  ,MessageType.text, {quoted: message.data});
 return await message.client.deleteMessage(message.jid, {id: load.key.id, remoteJid: message.jid, fromMe: true})

})
  Aqua.addCommand({ pattern: 'downapk ?(.*)', fromMe: wk, desc:DESC, deleteCommand: false }, async (message, match) => { 
	
	  if (match[1] === '') return await message.client.sendMessage(message.jid,NEED,MessageType.text, {quoted: message.data})
	  if (!match[1].includes('https://play.google.com/store/apps/details?id')) return await message.client.sendMessage(message.jid,NEED,MessageType.text, {quoted: message.data})
	  var load = await message.client.sendMessage(message.jid,DOWN,MessageType.text, {quoted: message.data}); 
	  const id = match[1].replace('https://play.google.com/store/apps/details?id=' , '')
	   const try1 = await play.getExtendedInfoById(id)
	   const name = try1.title
	  const try2 = await axios.get('https://apk-dl2.herokuapp.com/api/apk-dl?url=https://play.google.com/store/apps/details?id=' + id , { responseType: 'arraybuffer'})
   
    
 if (try2.data.status) {
  return await message.client.sendMessage(message.jid, N_FOUND ,MessageType.text, {quoted: message.data})
    

 }else {
 if (Config.DETAILS == 'true') {
  const version = try1.version
  const icon = try1.icon
  const rating = try1.rating
  const developer = try1.additional_info.developer
  const msg ='┌───[Black-KD]\n\n  *APK DOWNLOADER*\n\n│🎁ɴᴀᴍᴇ :' + name + '\n\n│🕹️ᴠᴇʀsɪᴏɴ : ' + version + '\n\n│👨‍💻ᴅᴇᴠᴇʟᴏᴘᴇʀ : ' + developer + '\n\n│✨ʀᴀᴛɪɴɢ : ' + rating + '\n\n└───────────◉'
  const res =   await webp2img(icon)
   const res2 = await axios.get( res, { responseType: 'arraybuffer'})
  var up = await message.client.sendMessage(message.jid,UP,MessageType.text, {quoted: message.data});
  await message.client.deleteMessage(message.jid, {id: load.key.id, remoteJid: message.jid, fromMe: true}) 	 
  await message.sendMessage(Buffer.from(res2.data), MessageType.image, { caption: msg, quoted: message.data } )
  await message.client.deleteMessage(message.jid, {id: up.key.id, remoteJid: message.jid, fromMe: true}) 
  await message.sendMessage(Buffer.from(try2.data), MessageType.document, { filename: name + '.apk', mimetype: 'application/vnd.android.package-archive', quoted: message.data });	 
 	 
 }else{
  var up = await message.client.sendMessage(message.jid,UP,MessageType.text, {quoted: message.data});
  await message.client.deleteMessage(message.jid, {id: load.key.id, remoteJid: message.jid, fromMe: true}) 	 

  await message.client.deleteMessage(message.jid, {id: up.key.id, remoteJid: message.jid, fromMe: true}) 	 
  await message.sendMessage(Buffer.from(try2.data), MessageType.document, { filename: name + '.apk', mimetype: 'application/vnd.android.package-archive', quoted: message.data });	 
 
 }	 
 } })


 Aqua.addCommand({ pattern: 'apk ?(.*)', fromMe: wk, dontAddCommandList: true , deleteCommand: false }, async (message, match) => { 
	
	  if (match[1] === '') return await message.client.sendMessage(message.jid,NEED,MessageType.text, {quoted: message.data})
	  if (!match[1].includes('https://play.google.com/store/apps/details?id')) return await message.client.sendMessage(message.jid,NEED,MessageType.text, {quoted: message.data})
	  var load = await message.client.sendMessage(message.jid,DOWN,MessageType.text, {quoted: message.data}); 
	  const id = match[1].replace('https://play.google.com/store/apps/details?id=' , '')
	   const try1 = await play.getExtendedInfoById(id)
	   const name = try1.title
	  const try2 = await axios.get('https://apk-dl2.herokuapp.com/api/apk-dl?url=https://play.google.com/store/apps/details?id=' + id , { responseType: 'arraybuffer'})
   
    
 if (try2.data.status) {
  return await message.client.sendMessage(message.jid, N_FOUND ,MessageType.text, {quoted: message.data})
    

 }else {
 if (Config.DETAILS == 'true') {
  const version = try1.version
  const icon = try1.icon
  const rating = try1.rating
  const developer = try1.additional_info.developer
  const msg ='┌───[Black-KD]\n\n  *APK DOWNLOADER*\n\n│🎁ɴᴀᴍᴇ :' + name + '\n\n│🕹️ᴠᴇʀsɪᴏɴ : ' + version + '\n\n│👨‍💻ᴅᴇᴠᴇʟᴏᴘᴇʀ : ' + developer + '\n\n│✨ʀᴀᴛɪɴɢ : ' + rating + '\n\n└───────────◉'
  const res =   await webp2img(icon)
   const res2 = await axios.get( res, { responseType: 'arraybuffer'})
  var up = await message.client.sendMessage(message.jid,UP,MessageType.text, {quoted: message.data});
  await message.client.deleteMessage(message.jid, {id: load.key.id, remoteJid: message.jid, fromMe: true}) 	 
  await message.sendMessage(Buffer.from(res2.data), MessageType.image, { caption: msg, quoted: message.data } )
  await message.client.deleteMessage(message.jid, {id: up.key.id, remoteJid: message.jid, fromMe: true}) 
  await message.sendMessage(Buffer.from(try2.data), MessageType.document, { filename: name + '.apk', mimetype: 'application/vnd.android.package-archive', quoted: message.data });	 
 	 
 }else{
  var up = await message.client.sendMessage(message.jid,UP,MessageType.text, {quoted: message.data});
  await message.client.deleteMessage(message.jid, {id: load.key.id, remoteJid: message.jid, fromMe: true}) 	 

  await message.client.deleteMessage(message.jid, {id: up.key.id, remoteJid: message.jid, fromMe: true}) 	 
  await message.sendMessage(Buffer.from(try2.data), MessageType.document, { filename: name + '.apk', mimetype: 'application/vnd.android.package-archive', quoted: message.data });	 
 
 }	 
 } })
