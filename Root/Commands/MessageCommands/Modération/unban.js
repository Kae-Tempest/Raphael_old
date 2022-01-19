const {MessageEmbed} = require('discord.js')
module.exports = {
    name: 'unban',
    clientPermissions: ['BAN_MEMBERS'],
    userPermissions: ['BAN_MEMBERS'],
    run: async (client, message, args, logChannel) => {
        const admin = message.member.user
        const member = args[0]
        const reason = args.splice(1).join(' ')
        await message.guild.members.unban(member, reason)
        const embed = new MessageEmbed()
            .setAuthor({
                name: `${admin.username} (${admin.id})`,
                iconURL: admin.displayAvatarURL({dynamic: true})
            })
            .setDescription(`**${admin.username}** a UNBAN ! (${member})`)
            .setTimestamp()
        await logChannel.send({embeds: [embed]})
    }
}