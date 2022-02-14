const {raphael} = require("../../../Structures/database/connect");
const {MessageEmbed} = require("discord.js");
module.exports = {
    name: 'shop',
    usage: '!shop show <item> || !shop buy <item>',
    description: 'Permet de voir ou achetez un item',
    exemple: '!shop show épée en bois || !shop buy épée en bois',
    run: async (client, message, args) => {
        const Player = await client.getUser(message.member)
        if(Player === undefined) return message.reply('Player Doesn\'t exist');
        const item = args.slice(1).join(' ');
        const ItemInfo = await client.getItem(item);
        if(ItemInfo) {
            if(args[0] === 'show') {
                const showEmbed = new MessageEmbed()
                    .setTitle(`${ItemInfo['ITEM_NAME']}`)
                    .setColor('RANDOM')
                    .setDescription(`Price: ${ItemInfo['PRICE']}`)
                    .addField("stats:",
                        `Attaque: \`${Player['ATTAQUE']}\` Constitution: \`${Player['CONSTITUTION']}\`
                        Esprit: \`${Player['ESPRIT']}\` Intelligence: \`${Player['INTELLIGENCE']}\`
                        Agility: \`${Player['AGILITY']}\` Vitality: \`${Player['VITALITY']}\`
                    `)
                return message.channel.send({embeds: [showEmbed]});
            }
            if(args[0] === 'buy') {
                try {
                    message.channel.send(`Confirmez-vous l'achat de \`${ItemInfo['ITEM_NAME'].toLowerCase()}\` pour \`${ItemInfo['PRICE']}\` ?! (oui)`);
                    const filter = m => (message.author.id === m.author.id);
                    const userEntry = await message.channel.awaitMessages({filter, max: 1, time: 10000, errors: ['time']});
                    if(Player['PO'] < ItemInfo['PRICE']) return message.reply(`Tu n'as pas assez de Po !`);
                    if(userEntry.first().content.toLowerCase() === 'oui') {
                        await raphael.query(`update raphael.user set PO = ${Player['PO'] - ItemInfo['PRICE']} where USER_ID = ${Player['USER_ID']}`);
                        await client.addInventory(item, message.member);
                        return message.reply(`Tu as bien acheter ${ItemInfo['ITEM_NAME']} pour ${ItemInfo['PRICE']}`)
                    }
                } catch (e) {
                    return message.channel.send(`Achat annulé. Merci de confirmé votre achat \`oui\` la prochaine fois!`)
                }
            }
        }
    }
}