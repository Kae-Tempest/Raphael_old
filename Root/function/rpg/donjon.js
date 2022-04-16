const { raphael } = require("../../Structures/database/connect");
const { leveling } = require('./leveling');
const {MessageActionRow, MessageButton, MessageSelectMenu} = require("discord.js");
const donjon = async (client, message, player, difficulty) => {
    const playerStats = await client.getStats(message.member);
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

    if(player['VITALITY'] <= 0 ) {
        return message.update({
            content: 'Tu ne peux pas combattre sans HP',
            components: []
        });
    }
    const thread = await message.message.startThread({
        name: `donjon-${message.member.user.username}`,
        autoArchiveDuration: 60,
        reason: `Donjon of ${message.member.user.username}`
    })
    message.update({
        content: 'Go to your Thread',
        components: []
    })
    async function donjon (atk) {
        for (let i = 0; PlayerHp > 0 ; i++) {
            const Floor = Math.floor(Math.random() * (MonsterList.length - 1));
            const monster = setMonster(Floor);
            await thread.send(`Vous etes étages ${i} et vous tombez sur ***${monster['MONSTER_NAME']}***`);
            let MVita = monster['VITALITY'];
            let MAgi = monster['AGILITY'];
            let MIntel = monster['INTELLIGENCE'];
            let MPo = monster['PO'];
            let MExp = monster['EXP'];
            let MAtk = monster['ATTAQUE'] - Consti;
            let PlayerAtk = atk - monster['CONSTITUTION']
            let UserEntry;
            if(MAtk <= 0) MAtk = 0;
            if(PlayerAtk <= 0) PlayerAtk = 0;

            if(PlayerAtk === 0 && MAtk === 0) {
                await raphael.query(`update user set VITALITY = 0 where USER_ID = ${player['USER_ID']}`)
                    .then((rows, err) => {
                        if (err) throw err
                        return rows
                    });

                setTimeout(() => {
                    thread.delete()
                    message.message.delete()
                }, 10000)
                return await thread.send(`Vous et ${monster['MONSTER_NAME']} perrisez à l'étage ${i}`);
            }

            const DonjonButton = new MessageActionRow().addComponents(
                new MessageButton()
                    .setStyle('SECONDARY')
                    .setCustomId('left')
                    .setEmoji('⬅️'),
                new MessageButton()
                    .setStyle('SECONDARY')
                    .setCustomId('front')
                    .setEmoji('⬆️'),
                new MessageButton()
                    .setStyle('SECONDARY')
                    .setCustomId('right')
                    .setEmoji('➡️')
            )
            if(i >= 1) {
                await thread.send({
                    content: 'Choisis la direction que tu veux prendre',
                    components: [DonjonButton]
                })
                const filter = (message) => message.customId === 'front' || message.customId === 'right' || message.customId === 'left'
                await thread.awaitMessageComponent({filter})
                    .then((interaction) => {
                        UserEntry = interaction.customId
                        thread.bulkDelete(1)
                    })
            } else {
                await fight()
            }
            async function DonjonWay() {
                switch(Math.floor(Math.random() * 3) + 1) {
                    case 1:
                        await fight()
                        break;
                    case 2:
                        await recolte()
                        break;
                    case 3:
                        switch (Math.floor(Math.random() * 3 ) + 1){
                            case 1:
                                let open = new MessageActionRow().addComponents(
                                    new MessageButton()
                                        .setStyle('SECONDARY')
                                        .setCustomId('OpenChest')
                                        .setLabel('✔️'),
                                    new MessageButton()
                                        .setStyle('SECONDARY')
                                        .setCustomId('NoChest')
                                        .setLabel('❌')
                                )
                                await thread.send({
                                    content: `Veux tu ouvrir le coffre ?`,
                                    components: [open]
                                })
                                let filter = (message) => message.customId === 'OpenChest' || message.customId === 'NoChest'
                                await thread.awaitMessageComponent({filter})
                                    .then(async (interaction) => {
                                        if (interaction.customId === 'OpenChest') {
                                            let loot = await client.getAllItem()
                                            let item = loot(Math.random() * loot.length - 1)
                                            await client.addInventory(item, 1 ,message.member);
                                            await interaction.update({
                                                content: `Vous avez bien recupéré \`${item}\` dans le coffre devant vous.`,
                                                components: []
                                            })
                                        } else {
                                            await interaction.update({
                                                content: `Vous laissez trainé le coffre dans la salle et passer votre chemin`
                                            })
                                        }
                                    })
                                break;
                            case 2:
                                let hordMonster = await client.getHordeMonster()
                                let hordSize = Math.floor(Math.random() * 7 ) + 3
                                let MonsterHP = hordMonster['VITALITY']
                                let MonsterAtk = hordMonster['ATTAQUE'] - Consti
                                let MonsterPlayerAtk = hordMonster['CONSTITUTION'] - atk
                                let MonsterAgi = hordMonster['AGILITY']
                                let MonsterIntel = hordMonster['INTELLIGENCE']
                                await thread.send({
                                    content: `Vous tombez sur une horde de ${hordMonster['MONSTER_NAME']} (${hordSize})`
                                })
                                let FightChoice = new MessageActionRow().addComponents(
                                    new MessageButton()
                                        .setStyle('SECONDARY')
                                        .setLabel('One by One')
                                        .setCustomId('ObO'),
                                    new MessageButton()
                                        .setStyle('SECONDARY')
                                        .setLabel('Group')
                                        .setCustomId('group'),
                                )
                                await thread.send({
                                    content: `Comment voulez vous combattre la horde`,
                                    components: [FightChoice]
                                })
                                let filter2 = (message) => message.customId === 'ObO' || message.customId === 'Group'
                                await thread.awaitMessageComponent({filter2})
                                    .then(async (interaction) => {
                                        if(interaction.customId == 'ObO') {
                                            for(let i = 0; hordSize > i;) {
                                                let Matk = MonsterAtk
                                                let MPAtk = MonsterPlayerAtk
                                                let MHp = MonsterHP
                                                if(PlayerHp <= 0) {
                                                    await raphael.query(`update user set VITALITY = 0 where USER_ID = ${player['USER_ID']}`)
                                                        .then((rows, err) => {
                                                            if(err) throw err
                                                            return rows
                                                        })
                                                    setTimeout(() => {
                                                        thread.delete()
                                                        message.message.delete()
                                                    }, 10000)
                                                    return await thread.send('Tu es mort');
                                                }
                                                if(MHp <= 0) {
                                                    hordSize -= 1
                                                    MHp = MonsterHP
                                                    const UPlayer = await client.updateUserInfo(player['USER_ID'],MPo, MExp,0, thread);
                                                    poGain += MPo
                                                    expGain += MExp
                                                    let UVita = PlayerHp - player['VITALITY'];
                                                    if(UVita <= 0) UVita = 0;
                                                    await raphael.query(`update raphael.user set VITALITY = ${UVita} where USER_ID = ${player['USER_ID']}`);
                                                    let Mloot = JSON.parse(hordMonster['LOOT']);
                                                    if(Mloot){
                                                        const loot = Mloot[Math.floor(Math.random() * Mloot.length)];
                                                        if(await client.getItem(loot) === undefined) return thread.send('Looting Error');
                                                        else {
                                                            await client.addInventory(loot, 1 ,message.member);
                                                            await thread.send(`Tu viens de looter sur \`${hordMonster['MONSTER_NAME']}\` => **${loot}**`);
                                                        }
                                                    } else {
                                                        await thread.send(`Tu n'as rien looter sur \`${hordMonster['MONSTER_NAME']}\`.`);
                                                    }
                                                    if(Intel > MIntel) {
                                                        await leveling(client, message, UPlayer);
                                                        await thread.send(`Félicitation, la bataille est terminée après ${i - 1} tours, ${await client.getUserName(client, player['GUILD_ID'], player['USER_ID'])}, il te reste ${PlayerHp}HP. Tu gagne ${MPo.toLocaleString({ minimumFractionDigits: 2 })}po et ${MExp.toLocaleString({ minimumFractionDigits: 2 })}exp !`);
                                                    } else {
                                                        await leveling(client, message, UPlayer);
                                                        await thread.send(`Félicitation, la bataille est terminée après ${i} tours, ${await client.getUserName(client, player['GUILD_ID'], player['USER_ID'])}, il te reste ${PlayerHp}HP. Tu gagne ${MPo.toLocaleString({ minimumFractionDigits: 2 })}po et ${MExp.toLocaleString({ minimumFractionDigits: 2 })}exp !`);
                                                    }
                                                }
                                                if (Agi > MonsterAgi) {
                                                    if (Intel > MonsterIntel && Intel % Math.floor(Math.random() * (Intel - (Intel / 2)) + 1) === 0) {
                                                        MHp -= MPAtk
                                                        await thread.send(`tour ${i}: Tu as esquivé le coup !`)
                                                    } else if (Intel > MonsterIntel) {
                                                        MHp -= MPAtk
                                                        PlayerHp -= Matk
                                                    }
                                                } else {
                                                    if (MonsterIntel > Intel && MonsterIntel % Math.floor(Math.random() * (MonsterIntel - (MonsterIntel / 2)) + 1) === 0) {
                                                        PlayerHp -= Matk
                                                        await thread.send(`tour ${i}: ${monster['MONSTER_NAME']}`)
                                                    } else if (MonsterIntel > Intel) {
                                                        PlayerHp -= Matk
                                                        MHp -= MPAtk
                                                    }
                                                }
                                            }
                                        } else if (interaction.customId == 'Group') {
                                            let HordeHP = MonsterHP * hordSize
                                            let HordeAtk = (hordMonster['ATTAQUE'] * hordSize) - Consti
                                            let HordePlayerAtk = (hordMonster['CONSTITUTION'] * hordSize) - atk
                                            let HordeAgi = MonsterAgi * hordSize
                                            let HordeIntel = MonsterIntel * hordSize
                                            for(let i = 0; HordeHP > 0; i++) {
                                                if(HordeHP !== MonsterHP * hordSize && HordeHP % hordSize == 0 && HordeHP != 0) {
                                                    await thread.send({
                                                        content: `Tu as tué un ${hordMonster['MONSTER_NAME']}`
                                                    })
                                                }
                                                if (PlayerHp <= 0) {
                                                    await raphael.query(`update raphael.user set VITALITY = 0 where USER_ID = ${player['USER_ID']}`)
                                                        .then((rows, err) => {
                                                            if (err) throw err;
                                                            return rows
                                                        });
                                                    setTimeout(() => {
                                                        thread.delete()
                                                    }, 10000)
                                                    return await thread.send('Tu es mort');
                                                }
                                                if (Agi > HordeAgi) {
                                                    if (Intel > HordeIntel && Intel % Math.floor(Math.random() * (Intel - (Intel / 2)) + 1) === 0) {
                                                        HordeHP -= HordePlayerAtk
                                                        await thread.send(`tour ${i}: Tu as esquivé le coup !`)
                                                    } else if (Intel > HordeIntel) {
                                                        HordeHP -= HordePlayerAtk
                                                        PlayerHp -= HordeAtk
                                                    }
                                                } else {
                                                    if (HordeIntel > Intel && HordeIntel % Math.floor(Math.random() * (HordeIntel - (HordeIntel / 2)) + 1) === 0) {
                                                        PlayerHp -= HordeAtk
                                                        await thread.send(`tour ${i}: ${hordMonster['MONSTER_NAME']}`)
                                                    } else if (HordeIntel > Intel) {
                                                        PlayerHp -= HordeAtk
                                                        HordeHP -= HordePlayerAtk
                                                    }
                                                }
                                            }
                                            if(HordeHP <= 0) {
                                                const UPlayer = await client.updateUserInfo(player['USER_ID'],MPo, MExp,0, thread);
                                                poGain += MPo
                                                expGain += MExp
                                                let UVita = PlayerHp - player['VITALITY'];
                                                if(UVita <= 0) UVita = 0;
                                                await raphael.query(`update raphael.user set VITALITY = ${UVita} where USER_ID = ${player['USER_ID']}`);
                                                let Mloot = JSON.parse(hordMonster['LOOT']);
                                                if(Mloot){
                                                    const loot = Mloot[Math.floor(Math.random() * Mloot.length)];
                                                    if(await client.getItem(loot) === undefined) return thread.send('Looting Error');
                                                    else {
                                                        await client.addInventory(loot, hordSize ,message.member);
                                                        await thread.send(`Tu viens de looter sur \`${hordMonster['MONSTER_NAME']}\` => **${loot}**`);
                                                    }
                                                } else {
                                                    await thread.send(`Tu n'as rien looter sur \`${hordMonster['MONSTER_NAME']}\`.`);
                                                }
                                                if(Agi > HordeAgi) {
                                                    await leveling(client, message, UPlayer);
                                                    await thread.send(`Félicitation, la bataille est terminée après ${i - 1} tours, ${await client.getUserName(client, player['GUILD_ID'], player['USER_ID'])}, il te reste ${PlayerHp}HP. Tu gagne ${MPo.toLocaleString({ minimumFractionDigits: 2 })}po et ${MExp.toLocaleString({ minimumFractionDigits: 2 })}exp !`);
                                                } else {
                                                    await leveling(client, message, UPlayer);
                                                    await thread.send(`Félicitation, la bataille est terminée après ${i} tours, ${await client.getUserName(client, player['GUILD_ID'], player['USER_ID'])}, il te reste ${PlayerHp}HP. Tu gagne ${MPo.toLocaleString({ minimumFractionDigits: 2 })}po et ${MExp.toLocaleString({ minimumFractionDigits: 2 })}exp !`);
                                                }
                                            }
                                        }
                                    })
                                break;
                            case 3:
                                let selection = new MessageActionRow().addComponents(
                                    new MessageSelectMenu()
                                        .setCustomId('SafeZone')
                                        .setPlaceholder('Choisis ton action')
                                        .addOptions([{
                                            label: 'Se Reposer',
                                            value: 'sleep',
                                            description: 'Permet de regenerer un peu de vie'
                                        },{
                                            label: 'Ne Rien Faire',
                                            value: 'nothing',
                                            description: 'Passez directement à l\'étage suivant'
                                        },{
                                            label: 'Sortir Du donjon',
                                            value: 'leave',
                                            description: 'permet de sortir du donjon'
                                        }])
                                )
                                await thread.send({
                                    content: `Que souhaite tu faire dans la Safe Zone ?`,
                                    components: [selection]
                                })
                                let filter3 = (message) => message.customId == 'SafeZone' && message.values[0] == 'sleep' || message.customId == 'SafeZone' && message.values[0] == 'nothing' || message.customId == 'SafeZone' && message.values[0] == 'leave'
                                await thread.awaitMessageComponent({filter3})
                                    .then(async (interaction) => {
                                        switch (interaction['values'][0]){
                                            case 'sleep':
                                                await interaction.update({
                                                    content: 'Vous vous reposez dans l\'auberge de la SafeZone',
                                                    components: []
                                                })
                                                PlayerHp = PlayerHp + (player['VITALITY'] / 4)
                                                await thread.send(`Vous avez récupérer un partie de votre vie`)
                                                break;
                                            case 'nothing':
                                                await interaction.update({
                                                    content: 'Vous passez a la suite du donjon',
                                                    components: []
                                                })
                                                break;
                                            case 'leave':
                                                const UPlayer= await client.getUser(message.member)
                                                return await interaction.update({
                                                    content: `Vous quittez le donjon à l'étage ${i}. Il vous reste ${UPlayer['VITALITY']}HP, tu as gagné ${poGain.toLocaleString({minimumFractionDigits: 2})}po et ${expGain.toLocaleString({minimumFractionDigits: 2})}exp\``
                                                })
                                        }
                                    })
                                break;
                        }
                        break;
                }
            }
            async function fight(){
                for(let i = 1; MVita > 0; i++) {
                    if (PlayerHp <= 0) {
                        await raphael.query(`update raphael.user set VITALITY = 0 where USER_ID = ${player['USER_ID']}`)
                            .then((rows, err) => {
                                if(err) throw err;
                                return rows
                            });
                        setTimeout(() => {
                            thread.delete()
                            message.message.delete()
                        }, 10000)
                        return await thread.send('Tu es mort');
                    }
                    if(Agi > MAgi) {
                        if(Intel > MIntel && Intel % Math.floor(Math.random() * (Intel - (Intel / 2)) +1) === 0) {
                            MVita -= PlayerAtk
                            await thread.send(`tour ${i}: Tu as esquivé le coup !`)
                        } else if (Intel > MIntel) {
                            MVita -= PlayerAtk
                            PlayerHp -= MAtk
                        }
                    } else {
                        if(MIntel > Intel && MIntel % Math.floor(Math.random() * (MIntel - (MIntel / 2 )) +1) === 0) {
                            PlayerHp -= MAtk
                            await thread.send(`tour ${i}: ${monster['MONSTER_NAME']} a esquivé le coup`)
                        } else if (MIntel > Intel) {
                            PlayerHp -= MAtk
                            MVita -= PlayerAtk
                        }
                    }
                if(MVita <= 0) {
                    const UPlayer = await client.updateUserInfo(player['USER_ID'],MPo, MExp,0, thread);
                    poGain += MPo
                    expGain += MExp
                    let UVita = PlayerHp - player['VITALITY'];
                    if(UVita <= 0) UVita = 0;
                    await raphael.query(`update raphael.user set VITALITY = ${UVita} where USER_ID = ${player['USER_ID']}`);
                    let Mloot = JSON.parse(monster['LOOT']);
                    if(Mloot){
                        const loot = Mloot[Math.floor(Math.random() * Mloot.length)];
                        if(await client.getItem(loot) === undefined) return thread.send('Looting Error');
                        else {
                            await client.addInventory(loot, 1,message.member);
                            await thread.send(`Tu viens de looter sur \`${monster['MONSTER_NAME']}\` => **${loot}**`);
                        }
                    } else {
                        await thread.send(`Tu n'as rien looter sur \`${monster['MONSTER_NAME']}\`.`);
                    }
                    if(Agi > MAgi) {
                        await leveling(client, message, UPlayer);
                        await thread.send(`Félicitation, la bataille est terminée après ${i - 1} tours, ${await client.getUserName(client, player['GUILD_ID'], player['USER_ID'])}, il te reste ${PlayerHp}HP. Tu gagne ${MPo.toLocaleString({ minimumFractionDigits: 2 })}po et ${MExp.toLocaleString({ minimumFractionDigits: 2 })}exp !`);
                    } else {
                        await leveling(client, message, UPlayer);
                        await thread.send(`Félicitation, la bataille est terminée après ${i} tours, ${await client.getUserName(client, player['GUILD_ID'], player['USER_ID'])}, il te reste ${PlayerHp}HP. Tu gagne ${MPo.toLocaleString({ minimumFractionDigits: 2 })}po et ${MExp.toLocaleString({ minimumFractionDigits: 2 })}exp !`);
                    }
                }}
            }
            async function recolte() {
                let recoltable = await client.getRecolt()
                let recolt = new MessageActionRow().addComponents(
                    new MessageButton()
                        .setCustomId('Recolt')
                        .setLabel('OUI')
                        .setStyle('SUCCESS'),
                    new MessageButton()
                        .setCustomId('NoRecolt')
                        .setLabel('NON')
                        .setStyle('DANGER')
                )
                await thread.send({
                    content: `Vous etes tomber sur ${recoltable}, voulez vous le récupérer ?`,
                    components: [recolt]
                })
                const filter = (message) => message.customId === 'Recolt' || message.customId === 'NoRecolt'
                await thread.awaitMessageComponent({filter, time: 10000})
                    .then(async (interaction) => {
                        if (interaction.customId === 'Recolt') {
                            await client.addInventory(recoltable, Math.floor(Math.random() * 5) + 1, message.member)
                            await interaction.update({
                                content: `Vous avez bien recolter ${recoltable}`,
                                components: []
                            })
                        } else {
                            await interaction.update({
                                content: `Vous laissez trainé la ressource a terre et passer votre chemin`
                            })
                        }
                    })
            }
            if(UserEntry === 'left' || UserEntry === 'right' || UserEntry === 'front') {
                await DonjonWay()
            }
                if(i === difficulty * 100){
                    const UPlayer = await client.getUser(message.member);
                    await thread.send(`vous avez finis les 100 étages du donjon ! Il vous reste ${UPlayer}HP, tu as gagné ${poGain.toLocaleString({ minimumFractionDigits: 2 })}po et ${expGain.toLocaleString({ minimumFractionDigits: 2 })}exp`);
                    setTimeout(() => {
                         thread.delete()
                        message.message.delete()
                    }, 10000)
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