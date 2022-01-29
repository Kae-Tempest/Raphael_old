const {MessageEmbed} = require("discord.js");
module.exports = {
    name: 'guildMemberRemove',
    run: async (client, message) => {
        const logChannel = client.channels.cache.get('778288246806806558');
        const member = message.member
        const embed = new MessageEmbed()
            .setAuthor(
                {name: `${member.user.username} a quitter le serveur.`,
                    iconURL: member.user.displayAvatarURL({dynamic: true})
                })
            .setFooter({text: `Membres: ${member.guild.memberCount.toLocaleString()}`})
            .setTimestamp()
        await logChannel.send({embeds: [embed]})
            .then(() => console.log(`guildMemberRemove -> Message envoyé pour ${member.user.tag}.`))
            .catch(() => console.log(`guildMemberRemove -> Le message n'a pas été envoyé pour ${member.user.tag}.`))
    }
}