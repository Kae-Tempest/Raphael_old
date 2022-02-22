const {raphael} = require("../../Structures/database/connect");
const {capitalize} = require("../../function/other/string");
module.exports = {
    name : 'shopY',
    run : async(client, button) => {
        const itemName = button.message.embeds[0].title
        const Price = button.message.embeds[0].description
        const itemPrice = Price.slice(8)
        await client.addInventory(itemName, button.member);
        await client.updateUserInfo(button.member.id, -itemPrice,0,0,button)
        button.update({
            content: `Vous avez bien acheter \`${capitalize(itemName)}\``,
            embeds: [],
            components: []
        })
    }
}