const {MessageActionRow, MessageSelectMenu} = require('discord.js')
module.exports = {
    name: 'help',
    run: async(client, message) => {
        const rows = new MessageActionRow().addComponents(
            new MessageSelectMenu()
                .setCustomId('Help')
                .setPlaceholder('Choose command')
                .addOptions([
                    {
                        label: 'Peche',
                        description: 'Fishing help command',
                        value: 'peche'
                    },{
                        label: 'Roulette',
                        description: 'Roulette help command',
                        value: 'roulette'
                    },{
                        label: 'BotInfo',
                        description: 'BotInfo help command',
                        value: 'botinfo'
                    },{
                        label: 'ServerInfo',
                        description: 'ServerInfo help command',
                        value: 'serverinfo'
                    },{
                        label: 'UserInfo',
                        description: 'UserInfo help command',
                        value: 'userinfo'
                    },{
                        label: 'Ban',
                        description: 'Ban help command',
                        value: 'ban'
                    },{
                        label: 'Kick',
                        description: 'Kick help command',
                        value: 'kick'
                    },{
                        label: 'Mute',
                        description: 'Mute help command',
                        value: 'mute'
                    },{
                        label: 'Purge',
                        description: 'Purge help command',
                        value: 'purge'
                    },{
                        label: 'Ticket',
                        description: 'Ticket help command',
                        value: 'ticket'
                    },{
                        label: 'Unban',
                        description: 'Unban help command',
                        value: 'unban'
                    },
                ])
        )
        message.reply({
            content: 'Help Select Menu',
            components: [rows],
            allowedMentions: {
                repliedUser: false
            }
        })
    }
}