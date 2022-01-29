const { raphael } = require('../Structures/database/connect');
module.exports = {
    name: "guildCreate",
    run: async(client, message) => {
        console.log('New Server');
        await raphael.query(`insert into guild GUILD_ID values ${message.guildId}`)
            .then((rows, err) => {
                if(err) throw err
                return rows
            });
    }
}