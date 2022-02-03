const { raphael } = require('../../Structures/database/connect');
const leveling = async (client, message, player,) => {
    let playerExp = player['EXP'];
    let playerLvl = player['LEVEL'];
    let playerPTC = player['PTC'];
    let BaseExp = 150
    let addPTC = Math.floor(Math.random() * (4 - 1 + 1)) + 1;
    if(playerLvl === 100 ) return
    if(playerExp >= BaseExp * playerLvl) {
        const updateUser = await client.updateUserInfo(player['USER_ID'],0,0,1,null, message);
        await raphael.query(`update raphael.user set PTC = ${playerPTC + addPTC} where USER_ID = ${player['USER_ID']}`);
        if(playerLvl + 1 < 50 && playerLvl % 10 === 0) {
            await raphael.query(`update raphael.user set PTC = ${playerPTC + 2} where USER_ID = ${player['USER_ID']}`);
        }
        if(playerLvl + 1 === 50 && playerLvl % 10 === 0) {
            await raphael.query(`update raphael.user set PTC = ${playerPTC + 7} where USER_ID = ${player['USER_ID']}`);
        }
        if(playerLvl + 1 > 50 && playerLvl % 10 === 0) {
            await raphael.query(`update raphael.user set PTC = ${playerPTC + 5} where USER_ID = ${player['USER_ID']}`);
        }
        await raphael.query(`update raphael.user set EXP = 0 where USER_ID = ${player['USER_ID']}`)
        message.reply(`${message.member.user.username} est monté au niveau ${updateUser['LEVEL']}`)
    }
}

module.exports = { leveling }