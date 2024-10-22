require('dotenv').config();
const { REST, Routes, ApplicationCommandOptionType } = require('discord.js');


const commands = [
    {
        name: 'decide',
        description: 'decides your fate',
        options: [
            {
                name: 'question',
                description: 'ask your question',
                type: ApplicationCommandOptionType.String
            }
        ]
    },
    {
        name: 'roll',
        description: 'decides your fate',
        options: [
            {
                name: 'rollstring',
                description: 'Dice Notation -- Ex: roll d20 d4 2d6 adv',
                type: ApplicationCommandOptionType.String,
                required: true,
            }
        ]
    }
];

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

(async () => {
    try {
        console.log('Registering slash commands...')
        await rest.put(
            Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.KASPER_ID),
            { body: commands }
        );
        console.log('Slash commands registered successfully...')
    } catch (err) {
        console.log(`There was an error: ${err}`);
    }
})();