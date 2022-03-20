const {MessageEmbed} = require('discord.js')
module.exports = {
    name: 'kick',
    exemple: 'kick @Kae-Tempest@0001 c\'est le dev',
    description: 'Permet d\'expulser un utilisateur du server',
    usage: 'kick [@user] <reason>',
    clientPermissions: ['KICK_MEMBERS'],
    userPermissions: ['KICK_MEMBERS'],
    run : async (client, message, args, logChannel) => {
        const member = message.mentions.users.first()
        let reason = args.splice(1).join(" ")
        if(!member) return message.channel.send("L'utilisateur n'existe pas ! ❌")
        if(!reason) reason = 'Raison non spécifiée'
        await message.member.kick(reason)
        const embed = new MessageEmbed()
            .setAuthor({
                name: `${member.username} (${member.id})`,
                iconURL: member.displayAvatarURL({dynamic: true})
            })
            .setColor('RANDOM')
            .setDescription(`**${member.username}** a été KICK ! (${member.id})\nRaison : ${reason}`)
            .setTimestamp()
            .setFooter({
                text: `${message.author.username} (${message.author.id})`,
                iconURL: message.author.displayAvatarURL({dynamic: true})
            })
        await logChannel.send({embeds: [embed]})
            .catch((err) => console.log(err))
    }
}