const { raphael } = require("../../Structures/database/connect");
const { leveling } = require('./leveling');

const donjon = async (client, message, player, difficulty) => {
    const playerStats = await client.getStats(message.member);
    if(playerStats['VITALITY'] <= 0 ) return message.reply('Tu ne peux pas combattre sans HP');
    const MonsterList = await raphael.query(`select * from monster`);

    function setMonster (index) {
       let Monster = MonsterList[index];
        if(Monster) return Monster;
    }
    const Strength = playerStats['ATTAQUE'] + player['ATTAQUE'];
    const Spirit = playerStats['ESPRIT'] + player['ESPRIT'];
    const Consti = playerStats['CONSTITUTION'] + player['CONSTITUTION'];
    const Agi = playerStats['AGILITY'] + player['AGILITY'];
    const Intel = playerStats['INTELLIGENCE'] + player['INTELLIGENCE']
    let PlayerHp = playerStats['VITALITY'] + player['VITALITY'];
    let poGain = 0;
    let expGain = 0;

    async function donjon (atk) {
        for (let i = 1; PlayerHp > 0 ; i++) {
            const Floor = Math.floor(Math.random() * (MonsterList.length - 1));
            const monster = setMonster(Floor);
            message.reply(`Vous etes étages ${i} et vous tombez sur ***${monster['MONSTER_NAME']}***`);
            let MVita = monster['VITALITY'];
            let MStrength = monster['ATTAQUE'];
            let MConsti = monster['CONSTITUTION'];
            let MAgi = monster['AGILITY'];
            let MIntel = monster['INTELLIGENCE'];
            let MPo = monster['PO'];
            let MExp = monster['EXP'];
            let MAtk = MStrength - Consti;
            let PlayerAtk = atk - MConsti;
            if(MAtk <= 0) MAtk = 0;
            if(PlayerAtk <= 0) PlayerAtk = 0;
            if(PlayerAtk === 0 && MAtk === 0) {
                await raphael.query(`update user set VITALITY = 0 where USER_ID = ${player['USER_ID']}`)
                    .then((rows, err) => {
                        if (err) throw err
                        return rows
                    });
                return message.reply(`Vous et ${monster['MONSTER_NAME']} perrisez à l'étage ${i}`);
            }
                if(Agi > MAgi) {
                    if(MVita !== 0) {
                        if (Agi % Math.floor(Math.random() * (Agi - (Agi / 2)) +1 ) === 0) {
                            MVita = 0
                            client.channels.resolve('778288246806806558').send(`tour ${i}: Tu as esquivé le coup !`);
                        }}}
                if(Intel > MIntel) {
                    MVita -= PlayerHp
                    PlayerHp -= MVita
                } else {
                    PlayerHp -= MVita
                    MVita -= PlayerAtk
                }
                if (PlayerHp <= 0) {
                    await raphael.query(`update raphael.user set VITALITY = 0 where USER_ID = ${player['USER_ID']}`)
                        .then((rows, err) => {
                            if(err) throw err;
                            return rows
                        });
                    return message.reply('Tu es mort');
                }
                if(MVita <= 0) {
                    const UPlayer = await client.updateUserInfo(player['USER_ID'],MPo, MExp,0, message);
                    poGain += MPo
                    expGain += MExp
                    let UVita = PlayerHp - player['VITALITY'];
                    if(UVita <= 0) UVita = 0;
                    await raphael.query(`update raphael.user set VITALITY = ${UVita} where USER_ID = ${player['USER_ID']}`);
                    let Mloot = JSON.parse(monster['LOOT']);
                    const loot = Mloot[Math.floor(Math.random() * Mloot.length)];
                    if(await client.getItem(loot) === undefined) return message.reply('Looting Error');
                    else {
                        await client.addInventory(loot, message.member);
                        message.reply(`Tu viens de looter sur \`${monster['MONSTER_NAME']}\` => **${loot}**`);
                    }
                    if(Intel > MIntel) {
                        await leveling(client, message, UPlayer);
                        await client.channels.resolve('778288246806806558').send(`Félicitation, la bataille est terminée après ${i - 1} tours, ${await client.getUserName(client, player['GUILD_ID'], player['USER_ID'])}, il te reste ${PlayerHp}HP. Tu gagne ${MPo.toLocaleString({ minimumFractionDigits: 2 })}po et ${MExp.toLocaleString({ minimumFractionDigits: 2 })}exp !`);
                    } else {
                        await leveling(client, message, UPlayer);
                        await client.channels.resolve('778288246806806558').send(`Félicitation, la bataille est terminée après ${i} tours, ${await client.getUserName(client, player['GUILD_ID'], player['USER_ID'])}, il te reste ${PlayerHp}HP. Tu gagne ${MPo.toLocaleString({ minimumFractionDigits: 2 })}po et ${MExp.toLocaleString({ minimumFractionDigits: 2 })}exp !`);
                    }
                }
                if(i === difficulty * 100){
                    const UPlayer = await client.getUser(message.member);
                    return message.reply(`vous avez finis les 100 étages du donjon ! Il vous reste ${UPlayer}HP, tu as gagné ${poGain.toLocaleString({ minimumFractionDigits: 2 })}po et ${expGain.toLocaleString({ minimumFractionDigits: 2 })}exp`);
                }
                if (i % 10 === 0 ) {
                    try {
                        message.reply(`Voulez vous quitter le donjon à l'étage ${i} ? (240s) `);
                        const filter = m => (message.author.id === m.author.id);
                        const userEntry = await message.channel.awaitMessages({filter,
                            max: 1, time: 240000, errors: ['time']
                        });
                        if(userEntry.first().content.toLowerCase() === "oui") {
                            const UPlayer= await client.getUser(message.member)
                            return message.reply(`Vous quittez le donjon à l'étage ${i}. Il vous reste ${UPlayer['VITALITY']}HP, tu as gagné ${poGain.toLocaleString({minimumFractionDigits: 2})}po et ${expGain.toLocaleString({minimumFractionDigits: 2})}exp`);
                        }
                    } catch (e) {
                        message.reply('Vous continuez le combats !')
                    }
                }
            }
        }
        if(player['CLASSES'] === "Mage") {
            await donjon(Spirit)
        } else {
            await donjon(Strength)
        }
}

module.exports = {
    donjon
}