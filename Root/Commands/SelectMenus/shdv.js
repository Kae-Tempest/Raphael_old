const {MessageEmbed} = require("discord.js");
const {capitalize} = require("../../function/other/string");
module.exports = {
    name: "shdv",
    run: async(client, interaction) => {
        let itemName = interaction.values[0]
        let item = await client.getItem(itemName);
        let embed = new MessageEmbed()
            .setTitle(capitalize(itemName))
            .addField('Stats', `
                Attaque : ${item['ATTAQUE']} | Constitution : ${item['CONSTITUTION']}
                Agility : ${item['AGILITY']} | Esprit : ${item['ESPRIT']}
                Intelligence : ${item['INTELLIGENCE']} | Vitality : ${item['VITALITY']}
                `)
            .setTimestamp()
            .setFooter({text: interaction.member.user.username, iconURL: interaction.member.user.displayAvatarURL()})
        interaction.update({
            components: [embed]
        })
    }
}
