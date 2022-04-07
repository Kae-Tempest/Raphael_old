const {MessageActionRow, MessageSelectMenu} = require("discord.js");
const Builders = require("@discordjs/builders");
const {capitalize} = require("../../../function/other/string");
function createOptionSelectMenuBuyHdv(label, quantity, price) {
    let MenuOption = new Builders.SelectMenuOption();
    MenuOption.setLabel(label);
    MenuOption.setValue(label);
    MenuOption.setDescription(`Quantity: ${quantity} | Price: ${price}`)
    return MenuOption;
}
function createOptionSelectMenuShowHdv(label) {
    let MenuOption = new Builders.SelectMenuOption();
    MenuOption.setLabel(label);
    MenuOption.setValue(label);
    return MenuOption;
}
module.exports = {
    name: 'hdv',
    usage: '',
    exemple: '',
    description: '',
    run: async (client, message, args) => {
        if(args[0] === 'buy') {
            let itemList = [];
            let hdvItem = await client.getHdv(message.member);
            for(let i = 0; hdvItem.length > i ; i++) {
                let item = await client.getItem(hdvItem[i]['ITEM_NAME']);
                itemList.push(createOptionSelectMenuBuyHdv(capitalize(item['ITEM_NAME'])))
            }
            if(itemList == false) return message.reply({content: 'HDV vide'})
            let rows = new MessageActionRow().addComponents(
                new MessageSelectMenu()
                    .setCustomId('bhdv')
                    .setPlaceholder('Select item to buy')
                    .setOptions(itemList)
            )
            await message.send({
                components: [rows]
            })
        } else {
            let itemList = []
            let hdvItem = await client.getHdv(message.member);
            for(let i = 0; hdvItem.length > i; i++){
                let item = await client.getItem(hdvItem[i]['ITEM_NAME']);
                itemList.push(createOptionSelectMenuShowHdv(capitalize(item['ITEM_NAME'])))
            }
            if(itemList == false) {
                return message.reply({content: 'HDV vide'})
            }
            let rows = new MessageActionRow().addComponents(
                new MessageSelectMenu()
                    .setCustomId('shdv')
                    .setPlaceholder('Select Item for show data')
                    .setOptions(itemList)
            )
            await message.send({
                components: [rows]
            })
        }
    }
}
