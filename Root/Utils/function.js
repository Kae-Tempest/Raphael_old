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
    client.getUser = async (member, guild) => {
        const guilds = guild ? await client.getGuild(guild.guild.id) : await client.getGuild(member.guild.id)
        const guildID = guilds.GUILD_ID
        const user = await raphael.query(`
            select user.USER_ID, user.GUILD_ID, user.CLASSES, user.RACE, user.INTELLIGENCE, user.ESPRIT, user.AGILITY, user.VITALITY, user.CONSTITUTION, user.ATTAQUE, user.PO, user.EXP, user.LEVEL, equipement.HELMET, equipement.PLASTRON, equipement.PANTALON, equipement.BOTTES
            from raphael.user
            inner join raphael.equipement on user.USER_ID = equipement.USER_ID  
            where user.GUILD_ID = ${guildID}
            and user.USER_ID = ${member.id}
            group by user.USER_ID
            `).then((rows, res, err) => {
                if (err) throw err;
                return rows
            })
        if(user) return user[0];
    }
    client.updateUserInfo = async (member, po, exp, lvl, guild) => {
        if (!po) po = 0;
        if (!exp) exp = 0;
        if (!lvl) lvl = 0;
        const user = guild ? await client.getUser(guild, member) : await client.getUser(member);
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
    client.getInventory = async (member, guild) => {
        const user = guild ? await client.getUser(member, guild) : await client.getUser(member)
        const inventory = await raphael.query(`select * from raphael.inventaire where inventaire.USER_ID = ${user.USER_ID}`)
        .then((rows, res, err) => {
            if(err) throw err;
            return rows;
        });
        if(inventory) return inventory
    }
    client.addInventory = async (item, member, guild) => {
        const user = guild ? await client.getUser(member, guild) : await client.getUser(member)
        const addItem = await raphael.query(`ìnsert into raphael.inventaire (USER_ID,ITEM_NAME) values (${user.USER_ID}, ${item})`)
            .then((rows, res, err) => {
                if(err) throw err
                return rows
            })
        const inventory = client.getInventory(member, guild);
        if(inventory) return inventory
    }
    /*  TODO : function createMissingInfoOnUser()
        TODO : function creatUserInfo()
        TODO : function removeInventaire()
        TODO : function addEquipement()
        TODO : function removeEquipement()
    */
}