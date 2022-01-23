const { raphael } = require('../Structures/database/connect');
module.exports = client => {
    client.getGuild = async guild => {
        const data = await raphael.query(`select * from raphael.guild where GUILD_ID = ${guild}`)
            .then((rows, err) => {
                if (err) throw err;
                return rows
            });
        if (data) return data[0];
    }
    client.getUser = async (member, guild) => {
        const guilds = guild ? await client.getGuild(guild.guild.id) : await client.getGuild(member.guild.id)
        const guildID = guilds["GUILD_ID"]
        const user = await raphael.query(`
            select user.USER_ID, user.GUILD_ID, user.CLASSES, user.RACE, user.INTELLIGENCE, user.ESPRIT, user.AGILITY, user.VITALITY, user.CONSTITUTION, user.ATTAQUE, user.PO, user.EXP, user.LEVEL, equipement.HELMET, equipement.PLASTRON, equipement.PANTALON, equipement.BOTTES
            from raphael.user
            inner join raphael.equipement on user.USER_ID = equipement.USER_ID  
            where user.GUILD_ID = ${guildID}
            and user.USER_ID = ${member.id}
            group by user.USER_ID
            `).then((rows, err) => {
                if (err) throw err;
                return rows
            })
        if(user) return user[0];
    }
    client.updateUserInfo = async (member, po, exp, lvl, guild, message) => {
        if (!po) po = 0;
        if (!exp) exp = 0;
        if (!lvl) lvl = 0;
        const user = guild ? await client.getUser(guild, member) : await client.getUser(member);
        if (user === undefined) return message.reply('user not found');
        const PO = user["PO"] + po;
        const EXP = user["EXP"] + exp;
        const LVL = user["LEVEL"] + lvl;
        const updatedInfo = await raphael.query(`update raphael.user set PO = ${PO}, EXP = ${EXP}, LEVEL = ${LVL}`)
            .then((rows, err) => {
                if(err) throw err;
                return rows
            })
        if (!updatedInfo) console.log('Update User Error !')
        const updatedUserInfo = await client.getUser(member);
        if (updatedUserInfo) return updatedUserInfo
    }
    client.getInventory = async (member, guild) => {
        const user = guild ? await client.getUser(member, guild) : await client.getUser(member)
        const inventory = await raphael.query(`select * from raphael.inventaire where inventaire.USER_ID = ${user["USER_ID"]}`)
        .then((rows, err) => {
            if(err) throw err;
            return rows;
        });
        if(inventory) return inventory
    }
    client.addInventory = async (item, member, guild) => {
        const user = guild ? await client.getUser(member, guild) : await client.getUser(member);
        const addItem = await raphael.query(`insert into raphael.inventaire (USER_ID,ITEM_NAME) values (${user["USER_ID"]}, "${item}")`)
            .then((rows, err) => {
                if(err) throw err
                return rows
            })
        if(!addItem) return console.log('Add Item Error !')
        const inventory = client.getInventory(member, guild);
        if(inventory) return inventory
    }
    client.removeInventory = async (item, member, guild) => {
        const user =  guild ? await client.getUser(member, guild) : await client.getUser(member);
        const removeItem = await raphael.query(`delete from raphael.inventaire where USER_ID = ${user["USER_ID"]}and ITEM_NAME = "${item}" order by ID DESC limit 1`)
            .then((rows, err) => {
                if(err) throw err;
                return rows
            });
        if(!removeItem) return console.log('Remove Item Error !')
        const inventory = client.getInventory(member, guild);
        if(inventory) return inventory
    }
    client.getItem = async item => {
        const itemInfo = await raphael.query(`select * from raphael.items where ITEM_NAME = "${item}"`)
            .then((rows, err) => {
                if(err) throw err;
                return rows
            });
        if(itemInfo) return itemInfo
    }
    client.createItem = async (name, attaque, constitution, vitality, agility, intelligence, esprit, emplacement, message) => {
        if(name === undefined) return message.reply('Missing Data');
        if(attaque === undefined) return message.reply('Missing Data');
        if(constitution === undefined) return message.reply('Missing Data');
        if(vitality === undefined) return message.reply('Missing Data');
        if(agility === undefined) return message.reply('Missing Data');
        if(intelligence === undefined) return message.reply('Missing Data');
        if(esprit === undefined) return message.reply('Missing Data');
        if(emplacement === undefined) return message.reply('Missing Data');
        const itemInfo = await client.getItem(name);
        if (name === itemInfo["ITEM_NAME"]) return message.reply('Item already item');
        else {
           const newItem = await raphael.query(`insert into raphael.inventaire 
            (ITEM_NAME, ATTAQUE, CONSTITUTION, VITALITY, AGILITY, AGILITY, INTELLIGENCE, ESPRIT, EMPLACEMENT) 
            values ("${name}", ${attaque}, ${vitality},${agility}, ${intelligence}, ${esprit}, "${emplacement}")
            `).then((rows, err) => {
                    if(err) throw err;
                    return rows
            });
            if(newItem) return newItem
        }
        const itemInfos = await client.getItem(name);
        if(itemInfos) return itemInfos
    }
    client.addEquipement = async (item, member, guild) => {
        const user = guild ? await client.getUser(member, guild) : await client.getUser(member);
        const itemInfo = await client.getItem(item);
        const emplacement = itemInfo["EMPLACEMENT"]
        const EmplacementName = await client.getColumnName('equipement');
        if(EmplacementName["HELMET"] === emplacement) {
            if (user["HELMET"] !== 'vide') {
                await client.replaceEquipement(item, member, guild, emplacement);
            } else {
                await raphael.query(`update raphael.equipement set HELMET = '${item}'`)
                    .then((rows, err) => {
                        if(err) throw err
                        return rows
                    });
            }
        } else if (EmplacementName["PLASTRON"] === emplacement) {
            if(user["PLASTRON"] !== 'vide') {
                await client.replaceEquipement(item, member, guild, emplacement);
            } else {
                await raphael.query(`update raphael.equipement set PLASTRON = '${item}'`)
                    .then((rows, err) => {
                        if(err) throw err
                        return rows
                    });
            }
        } else if (EmplacementName["PANTALON"] === emplacement) {
            if(user["PANTALON"] !== 'vide') {
                await client.replaceEquipement(item, member, guild, emplacement);
            } else {
                await raphael.query(`update raphael.equipement set PANTALON = '${item}'`)
                    .then((rows, err) => {
                        if(err) throw err
                        return rows
                    });
            }
        } else if (EmplacementName["BOTTES"] === emplacement) {
            if(user["BOTTES"] !== 'vide') {
                await client.replaceEquipement(item, member, guild, emplacement);
            } else {
                await raphael.query(`update raphael.equipement set BOTTES = '${item}'`)
                    .then((rows, err) => {
                        if(err) throw err
                        return rows
                    });
            }
        } else if (EmplacementName["MH"] === emplacement) {
            if(user["MH"] !== 'vide') {
                await client.replaceEquipement(item, member, guild, emplacement);
            } else {
                await raphael.query(`update raphael.equipement set MH = '${item}'`)
                    .then((rows, err) => {
                        if(err) throw err
                        return rows
                    });
            }
        } else if (EmplacementName["OH"] === emplacement) {
            if(user["OH"] !== 'vide') {
                await client.replaceEquipement(item, member, guild, emplacement);
            } else {
                await raphael.query(`update raphael.equipement set OH = '${item}'`)
                    .then((rows, err) => {
                        if(err) throw err
                        return rows
                    })
            }
        } else if (EmplacementName["rings"] === emplacement) {
            if(user["rings"] !== 'vide') {
                await client.replaceEquipement(item, member, guild, emplacement);
            } else {
                await raphael.query(`update raphael.equipement set rings = '${item}'`)
                    .then((rows, err) => {
                        if(err) throw err
                        return rows
                    })
            }
        } else if (EmplacementName["broach"] === emplacement) {
            if(user["broach"] !== 'vide') {
                await client.replaceEquipement(item, member, guild, emplacement);
            } else {
                await raphael.query(`update raphael.equipement set broach = '${item}'`)
                    .then((rows, err) => {
                        if(err) throw err
                        return rows
                    })
            }
        } else if (EmplacementName["belt"] === emplacement) {
            if(user["belt"] !== 'vide') {
                await client.replaceEquipement(item, member, guild, emplacement);
            } else {
                await raphael.query(`update raphael.equipement set belt = '${item}'`)
                    .then((rows, err) => {
                        if(err) throw err
                        return rows
                    })
            }
        } else if (EmplacementName["earrings"] === emplacement) {
            if(user["earrings"] !== 'vide') {
                await client.replaceEquipement(item, member, guild, emplacement)
            } else {
                await raphael.query(`update raphael.equipement set earrings = '${item}'`)
                    .then((rows, err) => {
                        if(err) throw err
                        return rows
                    })
            }
        }
        const updateUserInfo = guild ? await client.getUser(member, guild) : await client.getUser(member)
        if(updateUserInfo) return updateUserInfo
    }
    client.getColumnName = async table => {
        await raphael.query(`select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where table_name = "${table}";`)
            .then((rows, err) => {
                if(err) throw err;
                return rows
            });
    }
    client.replaceEquipement = async (item, member, guild,emplacement) => {
        await client.removeEquipement(item, emplacement, member, guild);
        await client.addEquipement(item,member, guild);
    };
    client.removeEquipement = async (item, emplacement, member, guild) => {
        const user = guild ? await client.getUser(member, guild) : await client.getUser(member);
        const removeEquipement = await raphael.query(`update raphael.equipement set ${emplacement} = 'vide' where USER_ID = ${user["USER_ID"]}`)
        .then((rows, err) => {
          if(err) throw err;
          return rows
        });
        if(removeEquipement) return removeEquipement
    }
    client.removeItem = async item => {
        await raphael.query(`delete from raphael.items where ITEM_NAME = ${item}`)
    }
    client.getMonster = async monster => {
        const monsterInfo = await raphael.query(`select * from raphael.monster where MONSTER_NAME = '${monster}'`)
            .then((rows, err) => {
                if(err) throw err
                return rows
            });
        if(monsterInfo) return monsterInfo
    }
    client.createMonster = async (name, attaque, constitution, vitality, agility, message) => {
        if(name === undefined) return client.reply('Missing Data');
        if(attaque === undefined) return message.reply('Missing Data');
        if(constitution === undefined) return message.reply('Missing Data');
        if(vitality === undefined) return message.reply('Missing Data');
        if(agility === undefined) return message.reply('Missing Data');
        const monsterInfo = await client.getMonster(name);
        if(monsterInfo["MONSTER_NAME"] === name) return message.reply('Monster already exist');
        const newMonster = await raphael.query(`insert into raphael.monster (MONSTER_NAME, ATTAQUE, CONSTITUTION, VITALITY, AGILITY)
                values ('${name}', ${attaque}, ${constitution} , ${vitality}, ${agility})`)
            .then((rows, err) => {
                if(err) throw err
                return rows
            });
        if(newMonster) return newMonster
    }
    client.removeMonster = async monster => {
        await raphael.query(`delete from raphael.items where MONSTER_NAME = ${monster}`)
    }
    client.createUserInfo = async (member, classe, race, message) => {
        const userInfo = await client.getUser(member);
        const ClasseInfo = ''
        if(userInfo) return message.reply('You have already character on this server');
        const user = await raphael.query(`insert into raphael.user (USER_ID, GUILD_ID, CLASSES, RACE, INTELLIGENCE, ESPRIT, AGILITY, VITALITY, CONSTITUTION, ATTAQUE, PO, EXP, LEVEL)
            values (${member.id}, ${message.guildId}, '${classe}', '${race}',
                    ${ClasseInfo["intelligence"]}, ${ClasseInfo["esprit"]}, ${ClasseInfo["agility"]}, ${ClasseInfo["vitality"]}, ${ClasseInfo["constitution"]}, ${ClasseInfo["attaque"]},
                    50, 0, 1)`)
            .then((rows, err) => {
                if(err) throw err
                return rows
            })
        const equipement = await raphael.query(`insert into raphael.equipement values (${member.id}, 'vide', 'vide', 'vide', 'vide', 'vide', 'vide', 'vide', 'vide', 'vide', 'vide')`)
            .then((rows, err) => {
                if(err) throw err;
                return rows
            })
        if(user) return console.log('User Create !')
        if(equipement) return console.log('Equipement User Create !')
    }
    /*
        -- => a verifier

        TODO : -- function creatUserInfo()
        TODO : -- function addEquipement()
        TODO : -- function removeEquipement()
        TODO : -- function removeItem()
        TODO : -- function getMonster()
        TODO : -- function createMonster()
        TODO : -- function removeMonster()
        TODO : function addStats()
        TODO : function removeStats()
        TODO : function getStats() ??
        TODO : function createClasse()
        TODO : function removeClasse()
        TODO : function getClasse()
        TODO : function createRace()
        TODO : function removeRace()
        TODO : function getRace()

    */
}