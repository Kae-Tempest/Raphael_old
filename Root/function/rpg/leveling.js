const { raphael } = require('../../Structures/database/connect');
const leveling = async (client, message, player) => {
	let playerExp = player['EXP'];
	let playerLvl = player['LEVEL'];
	let playerPTC = player['PTC'];
	let BaseExp = 150;
	if (playerLvl >= 10) BaseExp = 200;
	if (playerLvl >= 20) BaseExp = 250;
	if (playerLvl >= 30) BaseExp = 300;
	if (playerLvl >= 40) BaseExp = 350;
	if (playerLvl >= 50) BaseExp = 400;
	if (playerLvl >= 60) BaseExp = 450;
	if (playerLvl >= 70) BaseExp = 500;
	if (playerLvl >= 80) BaseExp = 550;
	if (playerLvl >= 90) BaseExp = 600;
	if (playerLvl >= 99) BaseExp = 1000;
	let addPTC = Math.floor(Math.random() * 4) + 1;
	if (playerLvl === 100) return;
	if (playerExp >= BaseExp * playerLvl) {
		const updateUser = await client.updateUserInfo(player['USER_ID'], 0, 0, 1, null, message);
		await raphael.query(`update raphael.user set PTC = ${playerPTC + addPTC} where USER_ID = ${player['USER_ID']}`);
		let user = await client.getUser(message.member);
		playerPTC = user['PTC'];
		if (playerLvl + 1 < 50 && playerLvl % 10 === 0) {
			await raphael.query(`update raphael.user set PTC = ${playerPTC + 2} where USER_ID = ${player['USER_ID']}`);
		}
		if (playerLvl + 1 === 50) {
			await raphael.query(`update raphael.user set PTC = ${playerPTC + 7} where USER_ID = ${player['USER_ID']}`);
		}
		if (playerLvl + 1 > 50 && playerLvl % 10 === 0) {
			await raphael.query(`update raphael.user set PTC = ${playerPTC + 5} where USER_ID = ${player['USER_ID']}`);
		}
		if (playerLvl + 1 === 100) {
			await raphael.query(`update raphael.user set PTC = ${playerPTC + 20} where  USER_ID = ${player['USER_ID']}`);
		}
		await raphael.query(`update raphael.user set EXP = 0 where USER_ID = ${player['USER_ID']}`);
		message.reply(`${message.member.user.username} est monté au niveau ${updateUser['LEVEL']}`);
	}
};

module.exports = { leveling };
