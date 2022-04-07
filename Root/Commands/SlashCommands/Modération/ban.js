const {MessageEmbed} = require('discord.js')
module.exports = {
    name: "ban",
    options: [{
        name: 'user',
        type: 'USER',
        description: "Provide the user",
        required: true
    },
        {
            name:'reason',
            type: 'STRING',
            description: 'reason',
            required: false
        }],
    defaultPermission: 'BAN_MEMBERS',
    description: "Run this to ban a member",
    run: async(client ,interaction) => {
        if(!interaction.member.permissions.has("BAN_MEMBERS"))
            return interaction.followUp({content: "Tu n'as pas les permissions pour utiliser cette commande", ephemeral: true})
        const user = interaction.options.getUser('user')
        const member = interaction.guild.members.cache.get(user.id) || await interaction.guild.members.fetch(user.id).catch(err => {console.log(err)})

        if(!member) return interaction.followUp("😅 | Je ne peux pas avoir les details de se membre");
        const reason = interaction.options.getString('reason');

        if(!member.bannable || member.user.id === client.user.id)
            return interaction.followUp("😅 | Je ne peux pas ban ce membre");

        if(interaction.member.role.highest.position <= member.roles.highest.position)
            return interaction.followUp('Certains membres ont un rang supérieur ou égal au vôtre, je ne peux donc pas les bannir.')

        const ban = new MessageEmbed()
            .setDescription(`**${member.user.tag}** a été bannie de se serveur pour \`${reason}\``)
            .setColor('RANDOM')
            .setFooter({text: 'Ban Member'})
            .setTimestamp()
        await member.user.send(`Tu as étais bannie de **\`${interaction.guild.name}\`** for \`${reason}\``).catch(err => {console.log(err)})
        await member.ban({reason})
        return interaction.followUp({embeds: [ban]})
    }
}