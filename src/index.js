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
function getRandomInt(min,max){
    
    return Math.floor(Math.random() * (max - min +1) + min);
}

function rollDice(sides,luck){
    diceRolls = [];
    diceRolls.push(getRandomInt(1,sides));
    diceRolls.push(getRandomInt(1,sides));
    num = 0;
    results = [];


    if(luck > 0){
        num = Math.max(diceRolls[0], diceRolls[1]);
        results.push(num + ' ['+diceRolls[0]+', ' + diceRolls[1]+']');
    }
    else if(luck < 0){
        num = Math.min(diceRolls[0], diceRolls[1]);
        results.push(num + ' ['+diceRolls[0]+', ' + diceRolls[1]+']');
    }
    else
    {
        num = diceRolls[0];
    }

    return [num, results];
}



client.on('ready', (c) => {
    console.log(`${c.user.tag} is online.`);
});

client.on('messageCreate', (msg) =>{
        let m = msg.content.toLowerCase();
        if(msg.author.bot) return;


        if(m.includes('wat')){
            query = encodeURIComponent(msg.content);
            callAPI(query, 10).then(data => msg.reply(data + "hello there"));
        }
        else if(m.includes('hwat')){
            query = encodeURIComponent(msg.content);
            callAPI(query, 5).then(data => msg.reply(data));
        }else if(m.includes('what')){
            query = encodeURIComponent(msg.content);
            callAPI(query,0).then(data => msg.reply(data));
        }
        else if(m.includes('oh no') || m.includes('uh oh')){
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

    if(interaction.commandName === 'roll'){
        const diceNotation = interaction.options.get('rollstring').value;
        const rolls = diceNotation.split(" ");
        let luck = 0;
        let result = 0;
        let results = [];

        //Detects advantage/disadvantage
        if(diceNotation.toLowerCase().includes('adv')){
                luck = 1;
            }
        if(diceNotation.toLowerCase().includes('dis')){
                luck = -1;
            }
       

        for(const roll of rolls){
            if(roll.toLowerCase().includes('d')){
                var roller = roll.toLowerCase().split('d')

                num1 = parseInt(roller[0])
                num2 = parseInt(roller[1])

                if(roller[0] == '') num1 = 1

                if(num1 > 0 && num2 > 0){
                    for(i = 0; i< num1; i++){
                        dice = rollDice(num2,luck)
                        result += dice[0];
                        console.log(result);
                        results.push(dice[1]);
                        console.log(results);
                    }
                }
            }
        }

        console.log(interaction.reply(diceNotation+ '\nYou rolled: '+ result + '\n'+ results));
      
    }
});




