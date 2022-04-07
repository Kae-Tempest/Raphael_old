const {capitalize} = require("../../../function/other/string");
module.exports = {
    name: "createitem",
    options: [{
        name: 'name',
        type: 'STRING',
        description: "name of item",
        required: true
    },{
        name:'attaque',
        type: 'INTEGER',
        description: 'strength of item',
        required: true
    },{
        name: 'constitution',
        type: 'INTEGER',
        description: 'constitution of item',
        required: true
    },{
        name:'agility',
        type: 'INTEGER',
        description: 'agility of item',
        required: true
    },{
        name: 'esprit',
        type: 'INTEGER',
        description: 'spirit of item',
        required: true
    },{
        name:'intelligence',
        type: 'INTEGER',
        description: 'intelligence of item',
        required: true
    },{
        name: 'vitality',
        type: 'INTEGER',
        description: 'vitality of item',
        required: true
    },{
        name: 'emplacement',
        type: 'STRING',
        description: 'Emplacement of item',
        required: true,
    },{
        name: 'price',
        type: 'INTEGER',
        description: 'Price of Item',
        required: false
    }],
    description: 'Create Item for rpg',
    run: async(client ,interaction) => {
        const name = interaction.options.getString('name');
        const strength = interaction.options.getInteger('attaque');
        const constitution = interaction.options.getInteger('constitution');
        const agility = interaction.options.getInteger('agility');
        const esprit = interaction.options.getInteger('esprit');
        const intelligence = interaction.options.getInteger('intelligence');
        const vitality = interaction.options.getInteger('vitality');
        const emplacement = interaction.options.getString('emplacement');
        const price = interaction.options.getInteger('price');
        await client.createItem(name,strength,constitution,vitality,agility,intelligence,esprit,emplacement,price,interaction)
        interaction.reply(`${capitalize(name)} has been created`)
    }
}