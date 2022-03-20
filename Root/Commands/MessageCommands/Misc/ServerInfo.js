const {MessageEmbed} = require('discord.js')
module.exports = {
    name: 'serverInfo',
    aliases: ['SI'],
    usage: 'serverInfo',
    description: 'Permet de voir les information du server',
    exemple: 'serverinfo || !SI',
    run: async (client, message) => {
        const guild = message.guild
        const owner = await guild.fetchOwner()
        const embed = new MessageEmbed()
            .setAuthor({
                name: `${guild.name} (${guild.id})`,
                iconURL: guild.iconURL({dynamic: true})
            })
            .setDescription(`Owner: ${owner.displayName} (${owner.id})
                Crée le: ${guild.createdAt.toLocaleString('fr-FR')},
                Utilisateur: ${guild.memberCount},                
                Salons: ${guild.channels.cache.size}`)
        return message.channel.send({embeds: [embed]})
    }
}