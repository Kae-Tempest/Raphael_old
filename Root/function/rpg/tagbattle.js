const { raphael } = require('../../Structures/database/connect');
const { leveling } = require('./leveling');
const { capitalize } = require('../other/string');
const tagbattle = async (client, message, player, player2, monster) => {
	const P1Stats = await client.getStats(message.member);
	const P2Stats = await client.getStats(message.mentions.users.first(), message.member);

	if (player['VITALITY'] <= 0 || player2['VITALITY'] <= 0) return message.reply("Vous ne pouvais pas combatre si l'un des deux joueurs n'a pas de HP");

	const P1Strength = P1Stats['ATTAQUE'] + player['ATTAQUE'];
	const P1Spirit = P1Stats['ESPRIT'] + player['ESPRIT'];
	const P1Consti = P1Stats['CONSTITUTION'] + player['CONSTITUTION'];
	const P1Agility = P1Stats['AGILITY'] + player['AGILITY'];
	const P1Intelligence = P1Stats['INTELLIGENCE'] + player['INTELLIGENCE'];

	const P2Strength = P2Stats['ATTAQUE'] + player2['ATTAQUE'];
	const P2Spirit = P2Stats['ESPRIT'] + player2['ESPRIT'];
	const P2Consti = P2Stats['CONSTITUTION'] + player2['CONSTITUTION'];
	const P2Agility = P2Stats['AGILITY'] + player2['AGILITY'];
	const P2Intelligence = P2Stats['INTELLIGENCE'] + player2['INTELLIGENCE'];

	const MStrength = monster['ATTAQUE'];
	let MVita = monster['VITALITY'];
	const MConsti = monster['CONSTITUTION'];
	const MAgi = monster['AGILITY'];
	const MIntel = monster['INTELLIGENCE'];
	const MPo = monster['PO'];
	const MExp = monster['EXP'];

	async function tagFight(atkP1, atkP2, message) {
		let Player1Hp = P1Stats['VITALITY'] + player['VITALITY'];
		let Player2Hp = P2Stats['VITALITY'] + player2['VITALITY'];
		let Player1Atk = atkP1 - MConsti;
		let Player2Atk = atkP2 - MConsti;
		let MAtkP1 = MStrength - P1Consti;
		let MAtkP2 = MStrength - P2Consti;
		if (Player1Atk <= 0) Player1Atk = 0;
		if (Player2Atk <= 0) Player2Atk = 0;
		if (MAtkP1 <= 0) MAtkP1 = 0;
		if (MAtkP2 <= 0) MAtkP2 = 0;
		if (Player1Atk === 0 && Player2Atk === 0 && MAtkP1 === 0 && MAtkP2 === 0) return message.reply('Vous vous entretuez (ou pas) !');
		for (let i = 1; MVita > 0; i++) {
			if (P1Agility > MAgi) {
				if (MAtkP1 !== 0) {
					if (P1Agility % Math.floor(Math.random() * (P1Agility - P1Agility / 2) + 1) === 0) {
						MAtkP1 = 0;
						client.channels.resolve('778288246806806558').send(`tour ${i}: ${await client.getUserName(client, player['GUILD_ID'], player['USER_ID'])} as esquivé le coup`);
					}
				}
			}
			if (P2Agility > MAgi) {
				if (MAtkP2 !== 0) {
					if (P2Agility % Math.floor(Math.random() * (P2Agility - P2Agility / 2) + 1) === 0) {
						MAtkP2 = 0;
						client.channels.resolve('778288246806806558').send(`tour ${i}: ${await client.getUserName(client, player2['GUILD_ID'], player2['USER_ID'])} as esquivé le coup`);
					}
				}
			}
			if (MAgi > P1Agility) {
				if (Player1Atk !== 0) {
					if (MAgi % Math.floor(Math.random() * (MAgi - MAgi / 2) + 1) === 0) {
						Player1Atk = 0;
						client.channels
							.resolve('778288246806806558')
							.send(`tour ${i}: ${monster['MONSTER_NAME']} à esquiver le coup de ${await client.getUserName(client, player['GUILD_ID'], player['USER_ID'])} !`);
					}
				}
			}
			if (MAgi > P2Agility) {
				if (Player2Atk !== 0) {
					if (MAgi % Math.floor(Math.random() * (MAgi - MAgi / 2) + 1) === 0) {
						Player2Atk = 0;
						client.channels
							.resolve('778288246806806558')
							.send(`tour ${i}: ${monster['MONSTER_NAME']} à esquiver le coup de ${await client.getUserName(client, player2['GUILD_ID'], player2['USER_ID'])} !`);
					}
				}
			}
			if (P1Intelligence > P2Intelligence) {
				if (P1Intelligence > MIntel) {
					MVita -= Player1Atk;
					Player1Hp -= MAtkP1;
				} else {
					Player1Hp -= MAtkP1;
					MVita -= Player1Atk;
				}
				if (P2Intelligence > MIntel) {
					MVita -= Player2Atk;
					Player2Hp -= MAtkP2;
				} else {
					Player2Hp -= MAtkP2;
					MVita -= Player2Atk;
				}
			} else {
				if (P2Intelligence > MIntel) {
					MVita -= Player2Atk;
					Player2Hp -= MAtkP2;
				} else {
					Player2Hp -= MAtkP2;
					MVita -= Player2Atk;
				}
				if (P1Intelligence > MIntel) {
					MVita -= Player1Atk;
					Player1Hp -= MAtkP1;
				} else {
					Player1Hp -= MAtkP1;
					MVita -= Player1Atk;
				}
			}
			if (Player1Hp <= 0) {
				await raphael.query(`update raphael.user set VITALITY = 0 where USER_ID = ${player['USER_ID']}`).then((rows, err) => {
					if (err) throw err;
					return rows;
				});
				const name = await client.getUserName(client, player['GUILD_ID'], player['USER_ID']);
				client.channel.send(`${capitalize(name)} est mort`);
				if (Player2Hp !== 0) {
					try {
						message.reply(`${client.getUserName(client, player2['GUILD_ID'], player2['USER_ID'])}, voulez vous résuciter ${name} (5s)`);
						const filter = (m) => message.mentions.users.first().id === m.mentions.users.first().id;
						const userEntry = await message.channel.awaitMessages(filter, {
							max: 1,
							time: 5000,
							error: ['time'],
						});
						if (userEntry.first().content.toLowerCase() === 'oui') {
							const Inventory = await client.getInventory(message.mentions.users.first(), message.member);
							const HItem = Inventory.find((item) => item === '' /*Item Name*/);
							if (!HItem) return message.reply("Tu n'as pas l'item pour réssucité");
							return message.reply(`${name} name est réssucité`);
						}
					} catch (err) {
						message.reply('Vous laisser votre camarade sur le sol pour se tour');
					}
				}
			}
			if (Player2Hp <= 0) {
				await raphael.query(`update raphael.user set VITALITY = 0 where USER_ID = ${player2['USER_ID']}`).then((rows, err) => {
					if (err) throw err;
					return rows;
				});
				const name = await client.getUserName(client, player2['GUILD_ID'], player2['USER_ID']);
				client.channel.reply(`${capitalize(name)} est mort`);
				if (Player1Hp !== 0) {
					try {
						message.reply(`${client.getUserName(client, player['GUILD_ID'], player['USER_ID'])}, voulez vous résuciter ${name} (5s)`);
						const filter = (m) => message.author.id === m.author.id;
						const userEntry = await message.channel.awaitMessages(filter, {
							max: 1,
							time: 5000,
							error: ['time'],
						});
						if (userEntry.first().content.toLowerCase() === 'oui') {
							const Inventory = await client.getInventory(message.member);
							const HItem = Inventory.find((item) => item === '' /*Item Name*/);
							if (!HItem) return message.reply("Tu n'as pas l'item pour réssucité");
							return message.reply(`${name} name est réssucité`);
						}
					} catch (err) {
						message.reply('Vous laisser votre camarade sur le sol pour se tour');
					}
				}
			}
			if (Player1Hp === 0 && Player2Hp === 0) {
				await raphael.query(`update raphael.user set VITALITY = 0 where USER_ID = ${player['USER_ID']}`).then((rows, err) => {
					if (err) throw err;
					return rows;
				});
				await raphael.query(`update raphael.user set VITALITY = 0 where USER_ID = ${player2['USER_ID']}`).then((rows, err) => {
					if (err) throw err;
					return rows;
				});
				return message.reply('Vous etes morts !');
			}
			if (MVita <= 0) {
				await client.updateUserInfo(player['USER_ID'], MPo / 2, MExp, 0, message);
				let U1Vita = P1Stats['VITALITY'] - player['VITALITY'];
				await raphael.query(`update raphael.user set VITALITY = ${U1Vita} where USER_ID = ${player['USER_ID']}`);
				await client.updateUserInfo(player2['USER_ID'], MPo / 2, MExp, 0, message);
				let U2Vita = P2Stats['VITALITY'] - player2['VITALITY'];
				await raphael.query(`update raphael.user set VITALITY = ${U2Vita} where USER_ID = ${player2['USER_ID']}`);
				let MLoot = JSON.parse(monster['LOOT']);
				const loot1 = MLoot[Math.floor(Math.random() * MLoot.length)];
				if ((await client.getItem(loot1)) === undefined) return message.reply('Looting Error');
				else {
					await client.addInventory(loot1, message.member);
					client.channel.send(`${await client.getUserName(client, player['GUILD_ID'], player['USER_ID'])} viens de looter sur \`${monster['MONSTER_NAME']}\` => **${loot1}**`);
					const lootIndex = MLoot.indexOf(loot1);
					MLoot.slice(lootIndex);
					const loot2 = MLoot[Math.floor(Math.random() * MLoot.length)];
					await client.addInventory(loot2, message.mentions.users.first());
					client.channel.send(`${await client.getUserName(client, player2['GUILD_ID'], player2['USER_ID'])} viens de looter sur \`${monster['MONSTER_NAME']}\` => **${loot2}**`);
				}
				if (P1Intelligence > MIntel) {
					await leveling(client, message, player);
					client.channels
						.resolve('778288246806806558')
						.send(
							`Félicitations, la bataille est terminée après ${i - 1} tours, ${await client.getUserName(client, player['GUILd_ID'], player['USER_ID'])}, il te reste ${U1Vita}HP, Tu gagne ${
								MPo.toLocaleString({ minimumFractionDigits: 2 }) / 2
							}Gold et ${MExp.toLocaleString({ minimumFractionDigits: 2 })}exp !`
						);
				} else {
					await leveling(client, message, player);
					client.channels
						.resolve('778288246806806558')
						.send(
							`Félicitations, la bataille est terminée après ${i} tours, ${await client.getUserName(client, player['GUILD_ID'], player['USER_ID'])}, il te reste ${U1Vita}HP, Tu gagne ${
								MPo.toLocaleString({ minimumFractionDigits: 2 }) / 2
							}Gold et ${MExp.toLocaleString({ minimumFractionDigits: 2 })}exp !`
						);
				}
				if (P2Intelligence > MIntel) {
					await leveling(client, message, player2);
					return client.channels
						.resolve('778288246806806558')
						.send(
							`Félicitations, la bataille est terminée après ${i - 1} tours, ${await client.getUserName(client, player2['GUILd_ID'], player2['USER_ID'])}, il te reste ${U2Vita}HP, Tu gagne ${
								MPo.toLocaleString({ minimumFractionDigits: 2 }) / 2
							}Gold et ${MExp.toLocaleString({ minimumFractionDigits: 2 })}exp !`
						);
				} else {
					await leveling(client, message, player2);
					return client.channels
						.resolve('778288246806806558')
						.send(
							`Félicitations, la bataille est terminée après ${i} tours, ${await client.getUserName(client, player2['GUILD_ID'], player2['USER_ID'])}, il te reste ${U2Vita}HP, Tu gagne ${
								MPo.toLocaleString({ minimumFractionDigits: 2 }) / 2
							}Gold et ${MExp.toLocaleString({ minimumFractionDigits: 2 })}exp !`
						);
				}
			}
		}
	}

	if (player['CLASSES'] === 'Mage' && player2['CLASSES'] === 'Mage') {
		await tagFight(P1Spirit, P2Spirit, message);
	} else if (player['CLASSES'] === 'Mage' && player2['CLASSES'] !== 'Mage') {
		await tagFight(P1Spirit, P2Strength, message);
	} else if (player['CLASSEs'] !== 'Mage' && player2['CLASSE'] === 'Mage') {
		await tagFight(P1Strength, P2Spirit, message);
	} else {
		await tagFight(P1Strength, P2Strength, message);
	}
};

module.exports = { tagbattle };
