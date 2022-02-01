const {MessageEmbed} = require('discord.js')
module.exports = {
    name: 'ticket',
    run : async (client, message, args, logChannel) => {
        const user = message.author
        if(user.bot) return
        const embed = new MessageEmbed()
            .setAuthor({name: `${user.username} (${user.id})`})
            .setColor("FF8C00")
            .setDescription(`**Action**: ouverture ticket\n**Raison**: ${args}\n**Utilisateur**: ${user}`)
            .setThumbnail(user.avatarURL())
            .setTimestamp()
            .setFooter({
                text: `${user.username}`,
                iconURL: user.avatarURL()
            })
        message.channel.send("Nous avons reçu votre ticket, on vous répondra dès que possible!")
        await logChannel.send({embeds: [embed]})
    }
}