const {raphael} = require('../../Structures/database/connect')
const {leveling} = require("./leveling");
const battle = async (client, message, player, monster) => {
    const playerStats = await client.getStats(message.member);
    if(playerStats['VITALITY'] <= 0) return message.reply('Tu ne peux pas combattre sans HP');

    const strength = playerStats['ATTAQUE'] + player['ATTAQUE'];
    const spirit = playerStats['ESPRIT'] + player['ESPRIT'];
    const consti = playerStats['CONSTITUTION'] + player['CONSTITUTION'];
    const agility = playerStats['AGILITY'] + player['AGILITY']
    const intelligence = playerStats['INTELLIGENCE'] + player['INTELLIGENCE']

    const MStrength = monster['ATTAQUE'];
    let MVita = monster['VITALITY'];
    const MConsti = monster['CONSTITUTION'];
    const MAgi = monster['AGILITY'];
    const MIntel = monster['INTELLIGENCE'];
    const MPo = monster['PO'];
    const MExp = monster['EXP'];

    async function fight(atk, message) {
        let PlayerHP = playerStats['VITALITY'] + player['VITALITY']
        let PlayerAtk = atk - MConsti
        let MAtk = MStrength - consti
        if(MAtk <= 0) MAtk = 0
        if(PlayerAtk < 0) PlayerAtk = 0;
        if(PlayerAtk === 0 && MAtk === 0) return message.reply('Vous vous entretuez (ou pas) !');
        for (let i = 1; MVita > 0; i++) {
            if(agility > MAgi) {
                if(MAtk !== 0) {
                    if (agility % Math.floor(Math.random() * (agility - (agility / 2 )) + 1) === 0 ) {
                        MAtk = 0
                        client.channels.resolve('778288246806806558').send(`tour ${i}: tu as esquivé le coup ! `);
                }}}
            if(MAgi > agility) {
                if(PlayerAtk !== 0) {
                    if(MAgi % Math.floor(Math.random() * (MAgi - (MAgi / 2)) + 1) === 0) {
                        PlayerAtk = 0
                        client.channels.resolve('778288246806806558').send(`tour ${i}: ${monster['MONSTER_NAME']} a esquivé le coup !`);
                    }}}
            if(intelligence > MIntel) {
                MVita -= PlayerAtk
                PlayerHP -= MAtk
            } else {
                PlayerHP -= MAtk
                MVita -= PlayerAtk
            }
            if (PlayerHP <= 0) {
                await raphael.query(`update raphael.user set VITALITY = 0 where USER_ID = ${player['USER_ID']}`)
                    .then((rows, err) => {
                        if(err) throw err;
                        return rows
                    });
                return message.reply('Tu es mort');
            }
            if (MVita <= 0) {
                const UPlayer =  await client.updateUserInfo(player['USER_ID'],MPo,  MExp, 0, message);
                let UVita = PlayerHP - player['VITALITY']
                if(UVita <= 0) UVita = 1
                await raphael.query(`update raphael.user set VITALITY = ${UVita} where USER_ID = ${player['USER_ID']}`);
                let MLoot = JSON.parse(monster['LOOT'])
                const loot = MLoot[Math.floor(Math.random() * MLoot.length)];
                if(await client.getItem(loot) === undefined) return message.reply('Looting Error');
                else {
                    await client.addInventory(loot, message.member);
                    message.reply(`Tu viens de looter sur \`${monster['MONSTER_NAME']}\` => **${loot}**`);
                }
            if(intelligence > MIntel) {
                await leveling(client, message, UPlayer);
                return client.channels.resolve('778288246806806558').send(`Félicitations, la bataille est terminée après ${i - 1} tours, ${message.author.username}, il te reste ${UVita}HP, Tu gagne ${MPo.toLocaleString({ minimumFractionDigits: 2})}Gold et ${MExp.toLocaleString({ minimumFractionDigits: 2})}exp !`);
            } else {
                await leveling(client, message, UPlayer);
                return client.channels.resolve('778288246806806558').send(`Félicitations, la bataille est terminée après ${i} tours, ${message.author.username}, il te reste ${UVita}HP, Tu gagne ${MPo.toLocaleString({ minimumFractionDigits: 2})}Gold et ${MExp.toLocaleString({ minimumFractionDigits: 2})}exp !`);
            }}
        }
    }
    if (player['CLASSES'] === 'Mage') {
        await fight(spirit, message)
    } else {
        await fight(strength, message)
    }
}

module.exports = {battle}