const {MessageEmbed} = require('discord.js')
module.exports = {
    name: 'purge',
    clientPermissions: ['MANAGE_MESSAGES'],
    run : async (client, message,args, logChannel) => {
        const number = args[0]
        const member = message.member
        if(isNaN(number) || number < 1 || number > 100) return message.reply(`Il faut spécifier un ***nombre*** entre 1 et 100. ( Vous avez mit => ${number})`)
        const messages = await message.channel.messages.fetch({
            limit: Math.min(number, 100),
            before: message.id
        });
        await message.channel.bulkDelete(messages)
        message.delete()
        const embed = new MessageEmbed()
            .setAuthor({
                name: `${member.user.username} a fait le ménage 🧹`,
                iconURL: `${member.user.displayAvatarURL({dynamic: true})}`
            })
            .setDescription(`**Action**: Purge\n**Nbr de messages**: ${number} message${number <= 1 ? '' : 's'}\n**Salon**: ${message.channel}`)
            .setTimestamp()
        await logChannel.send({embeds: [embed]})
            .catch((err) => console.log(err))
    }
}