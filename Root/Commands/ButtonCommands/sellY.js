module.exports = {
    name : 'sellY',
    run : async(client, button) => {
        const title = button.message.embeds[0].title
        const itemName = title.slice(32, title.length - 1)
        const item = await client.getItem(itemName)
    }
}