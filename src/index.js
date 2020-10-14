import { prefix, setPrefix } from './prefix'
import commands from './commands'
import Discord from 'discord.js'
import filter from './f-ilter'


const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {

  if (filter(msg)) return

  if (msg.mentions.has(client.user)) {
    msg.channel.send(`Listing for prefix \`${prefix()}\`\nUse \`${prefix()}help\` for help`)
  }

  let pre = prefix()

  if (msg.content.indexOf(pre) === 0) {

    const args = msg.content.slice(pre.length).split(' ').map(arg => arg.toLowerCase());
    const command = args.shift();
    console.log(`new command '${command}' with args`, args)
    switch (command) {
      case 'prefix':
        commands.setPrefix(msg, args)
        break
      case 'f':
        commands.f(msg, args, client)
        break
      case 'help':
        commands.help(msg, args)
        break
      default:
        commands.unknown(msg, command)
        break
      case '':
        break
    }
  }

});


client.login('its a secrete');