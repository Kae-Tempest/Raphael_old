const {capitalize, unCapitalize} = require("../../function/other/string");
module.exports = {
    name : 'sellY',
    run : async(client, button) => {
        const title = button.message.embeds[0].title
        const itemName = title.slice(32, title.length - 1)
        const item = await client.getItem(unCapitalize(itemName));
        await client.removeInventory(unCapitalize(itemName), button.member)
        await client.updateUserInfo(button.member.id, item['PRICE'],0,0,button.message)
        const user = await client.getUser(button.member)
        button.update({
            content: `Vous avez bien vendu \`${capitalize(itemName)}\` | Nouveau solde : ${user['PO']}PO`,
            embeds: [],
            components: []
        })
    }
}