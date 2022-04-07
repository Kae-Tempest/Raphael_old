const { raphael } = require("../../Structures/database/connect");
const { leveling } = require('./leveling');
const {MessageActionRow, MessageButton} = require("discord.js");

const donjon = async (client, message, player, difficulty) => {
    const thread = await message.message.startThread({
            name: `donjon-${message.member.user.username}`,
            autoArchiveDuration: 60,
            reason: `Donjon of ${message.member.user.username}`
        })
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
            await thread.send(`Vous etes étages ${i} et vous tombez sur ***${monster['MONSTER_NAME']}***`);
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

            // * const filter = (interaction) => interaction.customId === 'DtradeY' && interaction.user.id === interaction.user.id;
            // * await interaction.channel.awaitMessageComponent({filter, time: 15000})
            // *    .then(interaction => console.log(`${interaction.customId} was clicked!`))
            // *    .catch(console.error)
            // todo : ajouter des boutons de choix de direction / creer un nouvel algorithme pour le deroulement du dj

            const DonjonButton = new MessageActionRow().addComponents(
                new MessageButton()
                    .setStyle('PRIMARY')
                    .setCustomId('gauche')
                    .setEmoji('⬅️')
            )
            message.reply({
                components: [DonjonButton]
            })
            if(PlayerAtk === 0 && MAtk === 0) {
                await raphael.query(`update user set VITALITY = 0 where USER_ID = ${player['USER_ID']}`)
                    .then((rows, err) => {
                        if (err) throw err
                        return rows
                    });
                await thread.send(`Vous et ${monster['MONSTER_NAME']} perrisez à l'étage ${i}`);
                setTimeout(() => {
                    message.delete()
                    return thread.delete('end fight')
                }, 10000)
            }
                if(Agi > MAgi) {
                    if(MVita !== 0) {
                        if (Agi % Math.floor(Math.random() * (Agi - (Agi / 2)) +1 ) === 0) {
                            MVita = 0
                            await thread.send(`tour ${i}: Tu as esquivé le coup !`);
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
                    await thread.send('Tu es mort');
                    setTimeout(() => {
                        message.delete()
                        return thread.delete('end fight')
                    }, 10000)
                }
                if(MVita <= 0) {
                    const UPlayer = await client.updateUserInfo(player['USER_ID'],MPo, MExp,0, thread);
                    poGain += MPo
                    expGain += MExp
                    let UVita = PlayerHp - player['VITALITY'];
                    if(UVita <= 0) UVita = 0;
                    await raphael.query(`update raphael.user set VITALITY = ${UVita} where USER_ID = ${player['USER_ID']}`);
                    let Mloot = JSON.parse(monster['LOOT']);
                    const loot = Mloot[Math.floor(Math.random() * Mloot.length)];
                    if(await client.getItem(loot) === undefined) return thread.send('Looting Error');
                    else {
                        await client.addInventory(loot, message.member);
                        await thread.send(`Tu viens de looter sur \`${monster['MONSTER_NAME']}\` => **${loot}**`);
                    }
                    if(Intel > MIntel) {
                        await leveling(client, message, UPlayer);
                        await thread.send(`Félicitation, la bataille est terminée après ${i - 1} tours, ${await client.getUserName(client, player['GUILD_ID'], player['USER_ID'])}, il te reste ${PlayerHp}HP. Tu gagne ${MPo.toLocaleString({ minimumFractionDigits: 2 })}po et ${MExp.toLocaleString({ minimumFractionDigits: 2 })}exp !`);
                        setTimeout(() => {
                            message.delete()
                            return thread.delete('end fight')
                        }, 10000)
                    } else {
                        await leveling(client, message, UPlayer);
                        await thread.send(`Félicitation, la bataille est terminée après ${i} tours, ${await client.getUserName(client, player['GUILD_ID'], player['USER_ID'])}, il te reste ${PlayerHp}HP. Tu gagne ${MPo.toLocaleString({ minimumFractionDigits: 2 })}po et ${MExp.toLocaleString({ minimumFractionDigits: 2 })}exp !`);
                        setTimeout(() => {
                            return thread.delete('end fight')
                        }, 10000)
                    }
                }
                if(i === difficulty * 100){
                    const UPlayer = await client.getUser(message.member);
                    return thread.send(`vous avez finis les 100 étages du donjon ! Il vous reste ${UPlayer}HP, tu as gagné ${poGain.toLocaleString({ minimumFractionDigits: 2 })}po et ${expGain.toLocaleString({ minimumFractionDigits: 2 })}exp`);
                }
                if (i % 10 === 0 ) {
                    try {
                        await thread.send(`Voulez vous quitter le donjon à l'étage ${i} ? (240s) `);
                        const filter = m => (message.author.id === m.author.id);
                        const userEntry = await thread.awaitMessages({filter,
                            max: 1, time: 240000, errors: ['time']
                        });
                        if(userEntry.first().content.toLowerCase() === "oui") {
                            const UPlayer= await client.getUser(message.member)
                            await thread.send(`Vous quittez le donjon à l'étage ${i}. Il vous reste ${UPlayer['VITALITY']}HP, tu as gagné ${poGain.toLocaleString({minimumFractionDigits: 2})}po et ${expGain.toLocaleString({minimumFractionDigits: 2})}exp`);
                        }
                    } catch (e) {
                        await thread.send('Vous continuez le combats !')
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