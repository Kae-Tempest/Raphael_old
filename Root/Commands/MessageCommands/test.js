module.exports = {
    name: 'test',
    run: async (client, message, args) => {
        await client.removeStreamer(args[0], message.guildId)
    }
}