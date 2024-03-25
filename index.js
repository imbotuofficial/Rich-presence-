const Discord = require('discord.js-selfbot-v13');
const client = new Discord.Client({
  readyStatus: false,
  checkUpdate: false
});

const keepAlive = require('./server.js');
keepAlive();

function formatTime() { //Credits to himika#0001 and never#0001
  const date = new Date();
  const options = {
    timeZone: 'America/New_York', //https://www.zeitverschiebung.net/en/ and find your city and enter here
    hour12: true,
    hour: 'numeric',
    minute: 'numeric'
  };
  return new Intl.DateTimeFormat('en-US', options).format(date);
}

client.on('ready', async () => {
  console.clear();
  console.log(`${client.user.tag} - rich presence started!`);

  const r = new Discord.RichPresence()
    .setApplicationId('1182941320457748611')
    .setType('STREAMING')
    .setURL('https://twitch.tv/gemop') //Must be a youtube video link 
    .setState('Botu on Top')
    .setName('Gamer Botu')
    .setDetails(`THE NAME IT SHOWS YOUR STREAMING [${formatTime()}]`)
    .setStartTimestamp(Date.now())
 .setAssetsLargeImage('https://media.discordapp.net/attachments/1217743630492500069/1218824472459612230/a_a790663307c1da9aaa975325da319a97.gif?ex=660911be&is=65f69cbe&hm=6ea9bdb0063becaa959067099046ceb341fb57c9a6788e35925d402ff8653552&') //You can put links in tenor or discord and etc.
    .setAssetsLargeText('Botu') //Text when you hover the Large image
    .setAssetsSmallImage('https://media.discordapp.net/attachments/1217743630492500069/1218824405661122620/457d5404-3ffc-4714-a2ff-a00e5db93d26.jpg?ex=660911ae&is=65f69cae&hm=7d84f9f91804f01362bd6e648aea559fbe68c7752cd631cb873ae4865b6d7c53&') //You can put links in tenor or discord and etc.
    .setAssetsSmallText('OP') //Text when you hover the Small image
    .addButton('Gamer Botu ', 'https://youtube.com/@Imbotu?feature=shared')
    .addButton('Gamer Botu ', 'https://discord.com/invite/HZaurxBxFq');

  client.user.setActivity(r);
  client.user.setPresence({ status: "dnd" }); //dnd, online, idle, offline

  let prevTime = null;
  setInterval(() => {
    const newTime = formatTime();
    if (newTime !== prevTime) {
      const newDetails = `Botu on Top [${newTime}]`;
      r.setDetails(newDetails);
      client.user.setActivity(r);
      prevTime = newTime;
    }
  }, 1000); // Update every second
});

const mySecret = process.env['TOKEN'];
client.login(mySecret);
