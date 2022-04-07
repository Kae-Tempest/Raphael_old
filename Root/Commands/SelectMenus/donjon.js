const {donjon} = require("../../function/rpg/donjon");
module.exports = {
    name: "donjon",
    run: async(client, interaction) => {
        const player = await client.getUser(interaction.member);
        await donjon(client, interaction, player, interaction.values[0])
    }
}
