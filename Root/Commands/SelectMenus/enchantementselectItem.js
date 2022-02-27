const {raphael} = require("../../Structures/database/connect");
const {MessageActionRow, MessageEmbed, MessageSelectMenu} = require("discord.js");
const {capitalize} = require("../../function/other/string");
module.exports = {
    name: "sell",
    run: async(client, interaction) => {
        const SelectEnchantForItem = new MessageActionRow().addComponents(
            new MessageSelectMenu()
                .setCustomId('SelectedEnchantForItem')
                .setPlaceholder('Choose an Enchantment')
                .addOptions(/* Voir comment envoyer l'enchant */)
        )
        const item = await client.getItem(interaction.values[0])
        const itemEmbed = new MessageEmbed()
            .setTitle(`Voulez-vous vraiment vendre => \`${capitalize(interaction.values[0])}\``)
            .addField('Stats', `
                Attaque : ${item['ATTAQUE']} | Constitution : ${item['CONSTITUTION']}
                Agility : ${item['AGILITY']} | Esprit : ${item['ESPRIT']}
                Intelligence : ${item['INTELLIGENCE']} | Vitality : ${item['VITALITY']}
                `)
            .setFooter({text: `${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL({dynamic: true})})
        await interaction.update({
            embeds : [itemEmbed],
            components: []
        });
    }
}
