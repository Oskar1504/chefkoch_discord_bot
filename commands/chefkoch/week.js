const { MessageActionRow, MessageEmbed, MessageSelectMenu  } = require('discord.js');

module.exports = {
    async execute(interaction) {
        let categories = [
                {
                    name:"schnelle Alltagskueche",
                    description:"schnelle Alltagskueche",
                    id:"schnelle-alltagskueche"
                },
                {
                    name:"gesunde Ernaehrung",
                    description:"gesunde Ernaehrung",
                    id:"gesunde-ernaehrung"
                },
                {
                    name:"vegetarische Vielfalt",
                    description:"vegetarische Vielfalt",
                    id:"vegetarische-vielfalt"
                },
                {
                    name:"low carb",
                    description:"low carb",
                    id:"low-carb"
                }
            ],
            selectOptions = categories.map( elm => {
                return {
                    label:elm.name,
                    description:elm.description,
                    value:elm.id
                }
        })

        const row = new MessageActionRow()
            .addComponents(
                new MessageSelectMenu()
                    .setCustomId('categorie')
                    .setPlaceholder('Select categorie for the week')
                    .addOptions(selectOptions)
                    .setMaxValues(1),
            );

        await interaction.reply({
            embeds: [
                new MessageEmbed()
                    .setTitle("Recipe Categories")
                    .setColor("ORANGE")
                    .setDescription("Select categorie to show the recipes chefkoch.de\nwants u to cook this week.")
                    .setAuthor("chefkoch.de recipe bot")
                    .setTimestamp(new Date())
            ],
            components:[row]
        })
    }
};