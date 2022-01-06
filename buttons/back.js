
module.exports = {
    async execute(interaction) {
        interaction.message.embeds.unshift(interaction.message.embeds.pop())
        await interaction.message.edit({embeds:interaction.message.embeds})
        await interaction.deferUpdate(true)
    }
};