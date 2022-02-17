module.exports = {
    name: 'test',
    run: async (client, message) => {
        await client.addInventory('wood', message.member);
        await client.addInventory('iron', message.member);
        await client.addInventory('BPépée', message.member);
    }
}