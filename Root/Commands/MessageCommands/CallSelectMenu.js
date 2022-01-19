const {MessageActionRow, MessageSelectMenu} = require('discord.js')
module.exports = {
    name: "call",
    run: async(client, message) => {
        const row = new MessageActionRow().addComponents(
            new MessageSelectMenu()
					.setCustomId('test')
					.setPlaceholder('Open me ;)')
					.addOptions([
                        {
                            label: 'Example',
							description: 'Test Command.',
							value: 'example',
                        }
                    ])
                    )
                    message.reply({
                        content: "E",
                        components: [row],
                        allowedMentions: {
                            repliedUser: false
                        }
                    })
                }
            }