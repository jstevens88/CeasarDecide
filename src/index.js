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

async function callAPI(q, w){
    const apiKEY = process.env.API_KEY;
    let data = '';
    let query = q;
    let weird = w;
    const apiURL = `https://api.giphy.com/v1/gifs/translate?api_key=${apiKEY}&s=${query}&weirdness=${weird}`;
    console.log(apiURL);


    const response = await fetch(apiURL);
    const json = await response.json();
    data = json.data.embed_url;
    return data;
    
}



client.on('ready', (c) => {
    console.log(`${c.user.tag} is online.`);
});

client.on('messageCreate', (msg) =>{
        if(msg.author.bot) return;


        if(msg.content.includes('wat')){
            query = encodeURIComponent(msg.content);
            callAPI(query, 10).then(data => msg.reply(data));
        }
        else if(msg.content.includes('hwat')){
            query = encodeURIComponent(msg.content);
            callAPI(query, 5).then(data => msg.reply(data));
        }else if(msg.content.includes('what')){
            query = encodeURIComponent(msg.content);
            callAPI(query,0).then(data => msg.reply(data));
        }
        else if(msg.content.includes('oh no') || msg.content.includes('uh oh')){
            query = encodeURIComponent(msg.content);
            callAPI(query,10).then(data => msg.reply(data));
        }
});
        




client.on('interactionCreate', (interaction) => {
    if(!interaction.isChatInputCommand()) return;

    if(interaction.commandName === 'decide'){
        let decision = Math.round(Math.random());
        let q1 = interaction.options.get('question')?.value
        let q2 = '';

        if(q1 != undefined){
            q2 = q1.replaceAll('?', '');
        }
        
        let gif = [
            'https://media.giphy.com/media/IRzsRinQNCsPm/giphy.gif?cid=ecf05e47zradkpsyiet3m4ngpih52tafuzh70urp573utqo7&ep=v1_gifs_search&rid=giphy.gif&ct=g',
            'https://media.giphy.com/media/3IpHeyAdAmjQI/giphy.gif?cid=ecf05e47zradkpsyiet3m4ngpih52tafuzh70urp573utqo7&ep=v1_gifs_search&rid=giphy.gif&ct=g'
        ];

        let reply = gif[decision];
        console.log(q2);
        console.log(reply);
        interaction.reply(q2+'[?]('+reply+')');
    }
});




