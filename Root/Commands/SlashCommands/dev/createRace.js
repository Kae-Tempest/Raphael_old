const {MessageEmbed} = require('discord.js')
const {capitalize} = require("../../../function/other/string");
module.exports = {
    name: "createrace",
    options: [{
        name: 'name',
        type: 'STRING',
        description: "name of race",
        required: true
    },{
        name:'attaque',
        type: 'INTEGER',
        description: 'strength of race',
        required: true
    },{
        name: 'constitution',
        type: 'INTEGER',
        description: 'constitution of race',
        required: true
    },{
        name:'agility',
        type: 'INTEGER',
        description: 'agility of race',
        required: true
    },{
        name: 'esprit',
        type: 'INTEGER',
        description: 'spirit of race',
        required: true
    },{
        name:'intelligence',
        type: 'INTEGER',
        description: 'intelligence of race',
        required: true
    },{
        name: 'vitality',
        type: 'INTEGER',
        description: 'vitality of race  ',
        required: true
    }],
    description: 'Create Race for rpg',
    run: async(client ,interaction) => {
        const name = interaction.options.getString('name');
        const strength = interaction.options.getInteger('attaque');
        const constitution = interaction.options.getInteger('constitution');
        const agility = interaction.options.getInteger('agility');
        const esprit = interaction.options.getInteger('esprit');
        const intelligence = interaction.options.getInteger('intelligence');
        const vitality = interaction.options.getInteger('vitality');
        await client.createRace(name,strength,constitution,intelligence,esprit,agility,vitality, interaction)
        interaction.reply(`${capitalize(name)} has been created`)
    }
}