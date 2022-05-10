const {MessageEmbed, MessageActionRow, MessageButton} = require("discord.js");
const {capitalize} = require("../../function/other/string");
module.exports = {
    name: "bhdv",
    run: async(client, interaction) => {
        let itemName = interaction.values[0]
        let item = await client.getItem(itemName);
        let str = interaction.description;
        str = str.split(" | ");
        let quantity = str[0].replace("Quantity: ","");
        let price = str[1].replace("Price: ","");
        let owner = str[2].replace("Owner: ", "");
        let embed = new MessageEmbed()
            .setTitle(capitalize(itemName))
            .addField('Stats', `
                Attaque : ${item['ATTAQUE']} | Constitution : ${item['CONSTITUTION']}
                Agility : ${item['AGILITY']} | Esprit : ${item['ESPRIT']}
                Intelligence : ${item['INTELLIGENCE']} | Vitality : ${item['VITALITY']}
                `)
            .addField('Owner:', `${client.users.resolve(owner).username}`)
            .addField('Price:', price)
            .addField('Quantity:', quantity)
            .setTimestamp()
            .setFooter({text: interaction.member.user.username, iconURL: interaction.member.user.displayAvatarURL()})
        let bouton = new MessageActionRow().addComponents(
            new MessageButton()
                .setCustomId('bhdv')
                .setStyle('SUCCESS')
                .setLabel('Acheter'),
            new MessageButton()
                .setCustomId('nhdv')
                .setStyle('DANGER')
                .setLabel('Change Item')
        )
        interaction.update({
            content: `Voulez vous acheter ${item['QUANTITY']} \`${capitalize(itemName)}\` pour \`${item['PRICE']}\``,
            components: [bouton],
            embeds : [embed]
        })
    }
}
