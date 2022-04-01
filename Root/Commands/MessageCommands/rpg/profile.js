const {createCanvas, loadImage, registerFont} = require('canvas');
const {MessageAttachment} = require("discord.js");
const {capitalize} = require("../../../function/other/string");

module.exports = {
    name: 'profile',
    usage: 'profile',
    exemple: 'profile',
    description: 'Envoie la fiche profile de son personnage du RPG',
    run: async (client, message) => {
        const player = await client.getUser(message.member);
        if(!player) message.reply(`Tu n'as pas de fiche profil car tu n'as pas fais la commande \`setup\``);
        const inventory = await client.getInventory(message.member)
        const canvas = createCanvas(1204,1504);
        const ctx = canvas.getContext('2d');
        let UserIcon = await loadImage(message.author.displayAvatarURL({format: 'png'}))
        registerFont("./Root/assets/font/CreatedFilled-Italic.ttf", {family: 'CreatedFilled'})

        let Stat = {
            Attaque: player['ATTAQUE'],
            Constitution: player['CONSTITUTION'],
            Vitality: player['VITALITY'],
            Intelligence: player['INTELLIGENCE'],
            Esprit: player['ESPRIT'],
            Agiliy: player['AGILITY']
        }

        let Equipement = {
            MH: player['MH'],
            OH: player['OH'],
            Helmet: player['HELMET'],
            Plastron: player['PLASTRON'],
            Pantalon: player['PANTALON'],
            Bottes: player['BOTTES'],
            Rings: player['RINGS'],
            Earring: player['EARRINGS'],
            Broach: player['BROACH'],
            belt: player['BELT']
        }

        ctx.beginPath();
        ctx.lineWidth = 2;
        ctx.strokeStyle = "#FFF";
        ctx.globalAlpha = 0.8;
        ctx.fillStyle = '#222';
        ctx.fillRect(2,2,1200,1500);
        ctx.globalAlpha = 1;
        ctx.strokeRect(2,2,1200,1500);

        ctx.fillStyle = "#EEE"
        ctx.font = '150px "CreatedFilled"'
        ctx.fillText(`PROFILE`, 160,200)

        ctx.fillStyle = "#FFF";
        ctx.font = "50px Arial";
        ctx.textAlign = "center"
        ctx.fillText(`${message.author.username} | ${player['CLASSES']} ${player['RACE']}, de niveau ${player['LEVEL']}`, 600,335);
        ctx.drawImage(UserIcon,940,10,256,256)

        ctx.textAlign = "start"
        ctx.font = "40px Arial";
        ctx.fillText("Expérience :", 30,430);
        ctx.lineWidth = 2;
        ctx.strokeStyle = "#FFF"
        ctx.globalAlpha = 0.8;
        ctx.fillStyle = "#222";
        ctx.fillRect(30,450,1140,35);
        ctx.globalAlpha = 1;
        ctx.strokeRect(30,450,1140,35);

        ctx.fillStyle = "#FF0000";
        ctx.globalAlpha = 0.8;
        ctx.fillRect(31,451, ((player['EXP'] / 300) / player['LEVEL']) * 1138, 33);

        ctx.globalAlpha = 1;
        ctx.textAlign = "center"
        ctx.fillStyle = "#FFF";
        ctx.fillText(`${player['EXP'] === 0 ? 0 : ((player['EXP'] / 300) / player['LEVEL'] * 100).toFixed(2)}%`, 630,482)

        ctx.textAlign = "start"
        ctx.fillStyle = "#FFF";
        ctx.globalAlpha = 1;
        ctx.fillText("Statistique: ",30,550);
        ctx.font = "30px Arial";
        ctx.lineWidth = 1;
        ctx.fillText(`${Object.entries(Stat).map(([key, value]) => `${capitalize(key)} : ${value}`).join('\n')}`,50,600)

        ctx.fillStyle = "#FFF";
        ctx.font = "40px Arial";
        ctx.fillText("Equipement :", 30,850);
        ctx.font = "30px Arial";
        ctx.fillText(`${Object.entries(Equipement).map(([key, value]) => `${capitalize(key)}: ${value}`).join('\n')}`, 50,900);

        ctx.fillStyle = "#FFF";
        ctx.font = "30px Arial";
        ctx.fillText("Inventaire:", 550,550);
        ctx.fillText(`${player['PO']}PO`);
        ctx.font = "24px arial"
        ctx.fillText(`${inventory.map(i => i['ITEM_NAME']).length === 0 ? "L'inventaire est vide" : inventory.map(i => `${i['ITEM_NAME']}  x${i['QUANTITY']}`).join("\n")}`, 580, 600)

        const profileImage = new MessageAttachment(canvas.toBuffer(), 'profile.png',0);

        await message.author.send({
            files: [profileImage]
        });
    }
}