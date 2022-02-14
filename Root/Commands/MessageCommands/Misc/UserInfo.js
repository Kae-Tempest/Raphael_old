const {MessageEmbed} = require('discord.js')
module.exports = {
    name: 'userInfo',
    aliases: ['UI'],
    usage: '!userInfo',
    description: 'Permet de voir les information de l\'utilisateur',
    exemple: '!userinfo || !UI',
    run: (client, message, args) => {
         const member = args[0] !== '' ? message.mentions.users.first() : message.member
        const embed = new MessageEmbed()
            .setAuthor({
                name: `${member.username} (${member.id})`,
                iconURL: member.displayAvatarURL({dynamic: true})
            })
            .setDescription(`Son compte a été créé le ${member.user.createdAt.toLocaleString('fr-FR')}
                Il a rejoint le serveur le ${member.joinedAt.toLocaleString('fr-FR')}
                ---
                Bot: ${member.user.bot}
                Roles: ${member.roles.cache.map(r => r.name).join(' | ')}
                `)
            .setTimestamp()
        message.channel.send({embeds: [embed]});
    }
}