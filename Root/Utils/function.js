const { raphael } = require('../Structures/database/connect');
module.exports = client => {
    client.getGuild = async guild => {
        const data = await raphael.query(`select * from raphael.guild where GUILD_ID = ${guild}`)
            .then((rows, res, err) => {
                if (err) throw err;
                return rows
            });
        if (data) return data[0];
    }
    client.getUser = async member => {
        const guild = await client.getGuild(member.guild.id)
        const guildID = guild.GUILD_ID
        const user = await raphael.query(`select * from raphael.user where GUILD_ID = ${guildID} and USER_ID = ${member.id}`)
        .then((rows, res, err) => {
            if (err) throw err;
            return rows
        })
        if(user) return user[0];
    }
    client.getMentionUser = async (guild, member) => {
        const guilds = await client.getGuild(guild.guild.id)
        const guildID = guilds.GUILD_ID
        const user = await raphael.query(`select * from raphael.user where GUILD_ID = ${guildID} and USER_ID = ${member.id}`)
            .then((rows, res, err) => {
                if(err) throw err;
                return rows
            })
        if(user) return user[0]
    }
    client.updateUserInfo = async (member, po, exp, lvl, guild) => {
        if (!po) po = 0;
        if (!exp) exp = 0;
        if (!lvl) lvl = 0;
        const user = guild ? await client.getMentionUser(guild, member) : await client.getUser(member);
        if (user === undefined) return client.message.channel.send('user not found');
        const PO = user.PO + po;
        const EXP = user.EXP + exp;
        const LVL = user.LEVEL + lvl;
        const updatedInfo = await raphael.query(`update raphael.user set PO = ${PO}, EXP = ${EXP}, LEVEL = ${LVL}`)
            .then((rows, res, err) => {
                if(err) throw err;
            })
        const updatedUserInfo = await client.getUser(member);
        if (updatedUserInfo) return updatedUserInfo
    }
    client.getStats = async (member,guild) => {
        const user = guild ? await client.getMentionUser(guild, member) : await client.getUser(member)
        if (user === undefined) return client.message.channel.send('user not found');
        const id = user.USER_ID
        const user_stats = await raphael.query(`select ATTAQUE, CONSTITUTION, VITALITY, ESPRIT, AGILITY, INTELLIGENCE from raphael.user where USER_ID = ${id}`)
            .then((rows, res, err) => {
                if(err) throw err;
                return rows
            });
        if(user_stats) return user_stats[0]
    }
    client.getInventaire = async (member, guild) => {

    }
    /*  TODO : function createMissingInfoOnUser()
        TODO : function getInventaire()
        TODO : function getEquipement()
        TODO : function addInventaire()
        TODO : function removeInventaire()
        TODO : function addEquipement()
        TODO : function removeEquipement()
    */
}