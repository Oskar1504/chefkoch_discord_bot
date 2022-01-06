
module.exports = {
    async execute(interaction) {
        interaction.message.embeds.push(interaction.message.embeds.shift())
        await interaction.message.edit({embeds:interaction.message.embeds})
        await interaction.deferUpdate(true)
    }
};