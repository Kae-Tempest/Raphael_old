module.exports = {
    name: 'test',
    run: async (client, message) => {
        const EmplacementMultipliyer = {
            'HM' : 2,
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
        const item = await client.getItem('Hyper Rare épée')
        const emplacement = item['EMPLACEMENT']
        for(let emplacements in EmplacementMultipliyer) {
            console.log(EmplacementMultipliyer[emplacements])
        }
    }
}