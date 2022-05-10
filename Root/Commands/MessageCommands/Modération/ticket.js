const {MessageEmbed} = require('discord.js')
module.exports = {
    name: 'ticket',
    description: 'Permet de crée un ticket',
    usage: 'ticket <Contenue du ticket>',
    exemple: 'ticket ticket j\'ai un probleme avec la commande ban',
    run : async (client, message, args) => {
        // todo : Voir avec Quentin pour faire un ticketing plus jolie
        // * Créér un channel avec le modo qui accepte le ticket et l'user
        // * envoie une demande de ticket dans un channel ou les modos peuvent le voir
        // * qu'un modo peut accepter
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
        await client.channels.resolve('778288246806806558').send({embeds: [embed]})
    }
}