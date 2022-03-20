const {capitalize} = require("../../../function/other/string");
const {MessageActionRow, MessageSelectMenu} = require("discord.js");
const Builders = require("@discordjs/builders")
function createOptionSelectMenu(label, value) {
    let MenuOption = new Builders.SelectMenuOption();

    MenuOption.setLabel(label);
    MenuOption.setValue(label);
    MenuOption.setDescription(`Quantité: ${value}`)

    return MenuOption;
}
module.exports = {
    name: 'sell',
    usage: 'sell <item_name>',
    exemple: 'sell épée en bois',
    description: 'Permet de ventre un item',
    run: async (client, message) => {
        const player = await client.getUser(message.member);
        if(!player) return message.reply('/!\ Player Not Found /!\\');
        const Inventory = await client.getInventory(message.member);
        const itemList = [];
        const itemList2 = [];
        for(let i = 0; Inventory.length > i; i++){
            if(i >= 24 ) itemList2.push(createOptionSelectMenu(capitalize(Inventory[i]['ITEM_NAME']), Inventory[i]['QUANTITY']))
            else itemList.push(createOptionSelectMenu(capitalize(Inventory[i]['ITEM_NAME']), Inventory[i]['QUANTITY']))
        }
        const rows = new MessageActionRow().addComponents(
            new MessageSelectMenu()
                .setCustomId('sell')
                .setPlaceholder('Choose one Item')
                .addOptions(itemList)
        )
        if(itemList2.length !== 0) {
            const rows2 = new MessageActionRow().addComponents(
                new MessageSelectMenu()
                    .setCustomId('sell2')
                    .setPlaceholder('Choose one Item')
                    .addOptions(itemList2)
            )
            message.reply({
                content: 'Sell Select Menu',
                components: [rows, rows2],
                allowedMentions: {
                    repliedUser: false
                }
            })
        } else {
        message.reply({
            content: 'Sell Select Menu',
            components: [rows],
            allowedMentions: {
                repliedUser: false
            }
        })}
    }
}