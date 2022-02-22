const {raphael} = require("../../Structures/database/connect");
const {capitalize} = require("../../function/other/string");
module.exports = {
    name : 'sellY',
    run : async(client, button) => {
        const title = button.message.embeds[0].title
        const itemName = title.slice(32, title.length - 1)
        await client.removeInventory(itemName, button.member)
        button.update({
            content: `Vous avez bien vendu \`${capitalize(itemName)}\``,
            embeds: [],
            components: []
        })
    }
}