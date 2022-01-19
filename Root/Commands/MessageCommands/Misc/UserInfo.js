const {MessageEmbed} = require('discord.js')
module.exports = {
    name: 'UserInfo',
    aliases: ['UI'],
    run: (client, message, args) => {
        let member = message.mentions.users.first()
        if(!member) member = message.member
        const embed = new MessageEmbed()
            .setAuthor({
                name: `${member.displayName} (${member.id})`,
                iconURL: member.user.displayAvatarURL({dynamic: true})
            })
            .setDescription(`Son compte a été créé le ${member.user.createdAt.toLocaleString('fr-FR')}
                Il a rejoint le serveur le ${member.joinedAt.toLocaleString('fr-FR')}
                ---
                Bot: ${member.user.bot}
                Roles: ${member.roles.cache.map(r => r.name).join(' | ')}
                `)
        message.channel.send({embes: [embed]});
    }
}