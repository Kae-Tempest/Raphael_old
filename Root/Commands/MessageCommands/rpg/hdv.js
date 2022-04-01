const {MessageActionRow, MessageSelectMenu} = require("discord.js");
const Builders = require("@discordjs/builders");
const {capitalize} = require("../../../function/other/string");
function createOptionSelectMenu(label, value) {
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
            console.log('buy')
        } else {
            let itemList = []
            let hdvItem = await client.getHdv();
            for(let i = 0; hdvItem.length > i; i++){
                let item = await client.getItem(hdvItem[i]['ITEM_NAME']);
                itemList.push(createOptionSelectMenu(capitalize(item['ITEM_NAME'])))
            }
            if(itemList == false) return message.reply({content: 'HDV vide'})
            let row = new MessageActionRow().addComponents(
                new MessageSelectMenu()
                    .setCustomId('hdv')
                    .setPlaceholder('Select Item for show data')
                    .setOptions(itemList)
            )
            await message.send({
                components: [row]
            })
        }
    }
}
