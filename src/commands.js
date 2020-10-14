import { prefix, setPrefix } from './prefix'
import cache, { writeToCache } from './cache'


const parseChannelID = channelHash => channelHash.match(/[0-9]+/g)[0]

const ping = msg => {
  msg.reply('pong')
}

const _setPrefix = (msg, args) => {
  if (args.length !== 1) {
    msg.channel.send(`Incorrect usage, syntax: \`${prefix()}prefix {new prefix}\``)
    return;
  }

  setPrefix(args[0])
  msg.channel.send(`Set prefix to ${args[0]}`)
}

const f = (msg, args, client) => {
  if (args.length === 1) {
    const channelID = parseChannelID(args[0])
    client.channels.fetch(channelID)
      .then(channel => {
        let fList = cache().fList ?? []
        if (!fList.includes(channel.id)) {
          fList.push(channel.id)
          writeToCache({
            fList
          })
          msg.channel.send(`Added f-ilter to ${channel}`)
        } else {
          msg.channel.send(`${channel} already has a f-ilter`)
        }
      })
      .catch(err => {
        msg.channel.send(`Could not find channel '${args[0]}'.`)
        console.error(`couldn't find channel '${args[0]}', error: ${err}`)
      })
  } else if (args[0] === 'remove') {
    const channelID = parseChannelID(args[1])
    client.channels.fetch(channelID)
      .then(channel => {
        let fList = cache().fList ?? []
        if (fList.includes(channel)) {
          fList = fList.filter(f => f !== channel.id)
          writeToCache({
            fList
          })
          msg.channel.send(`removed f-ilter from ${channel}`)
        } else {
          msg.channel.send(`${channel} doesnt have a f-ilter. use \`${prefix()}f ${channel}\` to add one.`)
        }
      })
      .catch(err => {
        msg.channel.send(`Could not find channel '${args[0]}'.`)
        console.error(`couldn't find channel '${args[0]}', error: ${err}`)
      })
  } else {
    msg.channel.send(`Incorrect usage, syntax: \`\`\`${prefix()}f [remove] #{channel name} \nUse remove to remove f-ilter\`\`\``)
  }
}

const help = (msg, args) => {
  if (args && args.length === 0) {
    msg.channel.send(`\`\`\`A bot that will add f-ilters to channels.\n${prefix()}f #{channel} to add a f-ilter\n${prefix()}f remove #{channel} to remove it.\n\n${prefix()}prefix {new prefix} to change the prefix\`\`\``)
  } else {
    switch (args[0]) {
      case 'f':
        msg.channel.send(`\`\`\`${prefix()}f [remove] #{channel} \n\t Use remove flag to remove f-ilter from channel\`\`\``)
        break
      case 'prefix':
        msg.channel.send(`\`${prefix()}prefix {newprefix}\`, prefix will be set to \`{newprefix}\``)
        break
    }
  }
}

const unknown = (msg, command) => {
  msg.channel.send(`Uknown command \`${command}\`, use \`${prefix()}help\` for help`)
}


export default {
  ping,
  setPrefix: _setPrefix,
  f,
  help,
  unknown
}