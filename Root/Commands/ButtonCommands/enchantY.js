const itemsEnchantList = require('../../assets/EnchantList.json')
const {MessageEmbed} = require("discord.js");
module.exports = {
    name: "enchantY",
    run: async(client, interaction) => {
        const title = interaction.message.embeds[0].title
        const itemName = title.slice(35, title.length - 1);
        const item = await client.getItem(itemName)
        const user = await client.getUser(interaction.member);
        const emplacement = item['EMPLACEMENT']
        const PO = user['PO']
        const levelItem = item['LEVEL']
        let ListMaterials = [];
        let ItemEnchantPO; let atk; let consti; let agi; let vita; let intel; let esprit;

        for (let levelItems in itemsEnchantList) {
            if(levelItem == levelItems){
                    ListMaterials.push(itemsEnchantList[levelItems]['materials'])
                    atk = itemsEnchantList[levelItems][emplacement]['ATTAQUE']
                    consti = itemsEnchantList[levelItems][emplacement]['CONSTITUTION']
                    agi = itemsEnchantList[levelItems][emplacement]['AGILITY']
                    vita = itemsEnchantList[levelItems][emplacement]['VITALITY']
                    intel = itemsEnchantList[levelItems][emplacement]['INTELLIGENCE']
                    esprit = itemsEnchantList[levelItems][emplacement]['ESPRIT']
                    ItemEnchantPO = itemsEnchantList[levelItems]['po']
            }
        }
        if(PO < ItemEnchantPO) return interaction.update({
            content: 'Tu n\'as pas assez de PO pour l\'enchantement',
            embeds: [],
            components: []
        });
        const inventory = await client.getInventory(interaction.member);
        ListMaterials = ListMaterials[0]
        for(let i = 0; ListMaterials.length > i ; i++) {
            let HaveItem = inventory.find(items => items['ITEM_NAME'] == ListMaterials[i]['name'])
            if (HaveItem) {
                if (HaveItem['QUANTITY'] >= ListMaterials[i]['quantity']){
                    await client.removeInventory(ListMaterials[i]['name'], ListMaterials[i]['quantity'], interaction.member);
                } else {
                    console.log('pas prout')
                    return interaction.update({
                        content: `Tu n'as pas assez de ${ListMaterials[i]['name']}`,
                        components: [],
                        embeds: []
                    })
                }
            }
        }
        await client.updateUserInfo(interaction.member.id, (-ItemEnchantPO), 0,0,interaction.member);
        const rarety = ['Commun','Epic','Hyper Rare','Legendary','God Tier']
        let multipliyer;
        for(let i =0; rarety.length > i ; i++) {
            const raretyItem = itemName.includes(rarety[i])
            if (raretyItem) {
                switch (rarety[i]) {
                    case 'Commun':
                        multipliyer = 1.5
                        break;
                    case 'Epic':
                        multipliyer = 2
                        break;
                    case 'Hyper Rare':
                        multipliyer = 3
                        break;
                    case 'Legenaary':
                        multipliyer = 5
                        break;
                    case 'God Tier':
                        multipliyer = 10
                        break;
                }
            }
        }
        const chance = Math.round(Math.random() * 100 ) + 1
        const addChance = item['CHANCE'];
        const EmplacementMultipliyerList = {
            'MH' : 2,
            'OH': 2,
            'HELMET': 1.5,
            'PLASTRON': 1.5,
            'PANTALON': 1.5,
            'BOTTES': 1.5,
            'RINGS': 1.2,
            'EARRINGS': 1.2,
            'BELT': 1.2,
            'BROACH': 1.2
        }
        let EmplacementMultipliyer
        for(let emplacements in EmplacementMultipliyerList) {
            if(emplacement == emplacements) {
                EmplacementMultipliyer = EmplacementMultipliyerList[emplacements]
            }
        }
        let succesEnchant = (multipliyer * addChance / EmplacementMultipliyer) /(chance * levelItem + 1)
        const succes = Math.round(Math.random() * 100 ) + 1;
        console.log(succes, succesEnchant)
        if ( succes > succesEnchant ) {
            await client.updateChanceEnchant(item, 1);
            return interaction.update({
                content: 'Enchantement échoué',
                embeds: [],
                components: []
            })
        }
        await client.updateCraftItem(item, atk, consti, intel, agi, esprit, vita, 1);
        const updatedItem = await client.getItem(itemName)
        const itemEmbed = new MessageEmbed()
            .setTitle(`L'enchantement de ${item['ITEM_NAME']} à reussion`)
            .addField('Resulats: ', `${item['ITEM_NAME']} deviens ${updatedItem['ITEM_NAME']}`)
            .addField('Stats', `
                Attaque : ${updatedItem['ATTAQUE']} | Constitution : ${updatedItem['CONSTITUTION']}
                Agility : ${updatedItem['AGILITY']} | Esprit : ${updatedItem['ESPRIT']}
                Intelligence : ${updatedItem['INTELLIGENCE']} | Vitality : ${updatedItem['VITALITY']}
                `)
            .setFooter({text: `${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL({dynamic: true})})
        interaction.update({
            embeds: [itemEmbed],
            components: []
        })
    }
}
