const {MessageEmbed, Permissions} = require('discord.js');
module.exports = {
    name: 'mute',
    run: async (client, message, args, logChannel) => {
        return message.reply('Work in progress');
        const member = message.mentions.users.first()
        if (!member) return message.reply("L'utilisateur n'existe pas ! ❌");
        let muteRole = message.guild.roles.cache
        if(!muteRole.filter(r => r.name === 'mute')) {
            message.guild.roles.create({
                name: 'mute',
                color: 'GREY',
                hoist: true,
            })
            console.log('Role Create')
        }
        let reason = args.splice(1).join(' ')
        if (!reason) reason = "Raison non spécifiée"
        message.member.roles.add(muteRole, reason)
        const embed = new MessageEmbed()
            .setAuthor({
                name: `${member.username} (${member.id})`,
                iconURL: member.displayAvatarURL({dynamic: true})
            })
            .setDescription(`**${member.username}** a été mute ! (${member.id})\nRaison: ${reason}`)
            .setTimestamp()
            .setFooter({
                text: `${message.author.username}`,
                iconURL: message.author.displayAvatarURL({dynamic: true})
            })
        await logChannel.send({embeds: [embed]})
            .catch((err) => console.log(err))
    }
}