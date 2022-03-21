const { raphael } = require('../Structures/database/connect');
module.exports = {
    name: "guildCreate",
    run: async client => {
        let guild = await raphael.query(`select * from guild where GUILD_ID = ${client.id}`)
            .then((rows, err) => {
                if (err) throw err;
                return rows[0]
            });
        if(!guild){
            console.log('New Server');
            await raphael.query(`insert into raphael.guild (GUILD_ID)
                                 values ('${client.id}')`)
                .then((rows, err) => {
                    if (err) throw err
                    return rows
                });
        }
    }
}