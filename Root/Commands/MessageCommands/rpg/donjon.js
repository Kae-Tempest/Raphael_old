const { donjon } = require('../../../function/rpg/donjon');
module.exports = {
    name: 'donjon',
    usage: '!donjon <difficulty[1-10]>',
    exemple: '!donjon 1',
    description: 'Permet de faire un donjon de 100 étage à 1000 étages celon la difficulté',
    run: async (client, message, args) => {
        let difficulty = args[0]
        if(difficulty === '') return message.reply('Tu doit choissir ta difficulté');
        if(difficulty >= 10) {
            difficulty = 10;
            message.reply('La difficulté a été set a son maximum. (10)');
        }
        const player = await client.getUser(message.member);
        await donjon(client, message, player , difficulty)
    }
}