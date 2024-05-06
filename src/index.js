require('dotenv').config();
const { Client, IntentsBitField } = require('discord.js');



const myIntents = new IntentsBitField();
myIntents.add(
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent
    );


const client = new Client({ intents: myIntents});
client.login(process.env.DISCORD_TOKEN);

client.on('ready', (c) => {
    console.log(`${c.user.tag} is online.`);
});

client.on('interactionCreate', (interaction) => {
    if(!interaction.isChatInputCommand()) return;

    if(interaction.commandName === 'decide'){
        let decision = Math.round(Math.random());
        let q1 = interaction.options.get('question')?.value;
        
        let q2 = q1.replaceAll('?', '');
        
        let gif = [
            'https://media.giphy.com/media/IRzsRinQNCsPm/giphy.gif?cid=ecf05e47zradkpsyiet3m4ngpih52tafuzh70urp573utqo7&ep=v1_gifs_search&rid=giphy.gif&ct=g',
            'https://media.giphy.com/media/3IpHeyAdAmjQI/giphy.gif?cid=ecf05e47zradkpsyiet3m4ngpih52tafuzh70urp573utqo7&ep=v1_gifs_search&rid=giphy.gif&ct=g'
        ];

        let reply = gif[decision];
        console.log(q2);
        console.log(reply);
        interaction.reply(q2+'[?]('+reply+')');
    }
})




