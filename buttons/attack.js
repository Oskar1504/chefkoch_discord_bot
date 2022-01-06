
module.exports = {
    async execute(interaction) {
        let embed = interaction.message.embeds[0].toJSON(),
            pop = false
        for (const field of embed.fields) {
            if(field.name == "health"){
                if(parseInt(field.value) > 1){
                    field.value = (parseInt(field.value)-1).toString()
                }else{
                    pop = true
                    break
                }
            }
        }

        if(pop){
           interaction.message.embeds.shift()
        }else{
            interaction.message.embeds[0] = embed
        }
        await interaction.message.edit({embeds:interaction.message.embeds,files:[]})
        await interaction.deferUpdate(true)
    }
};