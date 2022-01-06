const { MessageActionRow, MessageButton, MessageEmbed  } = require('discord.js');
const fs = require("fs");

let now = new Date();
let onejan = new Date(now.getFullYear(), 0, 1);
let week_actual = Math.ceil((((now.getTime() - onejan.getTime()) / 86400000) + onejan.getDay() + 1) / 7)-1;

module.exports = {
    async execute(interaction) {
        let categorie = interaction.values[0],
            embeds = [],
            recipes = JSON.parse(fs.readFileSync(`./data/${categorie}_${week_actual}.json`))

        embeds = recipes.map(recipe => {
            return new MessageEmbed()
                .setTitle(recipe.title)
                .setAuthor(recipe.day)
                .addField("Day",recipe.day, true)
                .addField("Duration",recipe.duration, true)
                .addField("Ingredient count",recipe.more_data.ingredients.length.toString(), true)
                .addField("Categorie", categorie,true)
                .setColor("GREEN")
                .setFooter(categorie)
                .setURL('https://discord.js.org')
                .setTimestamp(new Date())
        })

        const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('back')
                    .setLabel('Back')
                    .setStyle('PRIMARY'),
                new MessageButton()
                    .setCustomId('ingredients')
                    .setLabel('Ingredients')
                    .setStyle('SUCCESS'),
                new MessageButton()
                    .setCustomId('categorie_list')
                    .setLabel('Categorie list')
                    .setStyle('SECONDARY'),
                new MessageButton()
                    .setCustomId('forward')
                    .setLabel('Forward')
                    .setStyle('PRIMARY'),
            );

        interaction.message.embeds = embeds
        interaction.message.components = [row]
        await interaction.message.edit({
            embeds:interaction.message.embeds,
            components: interaction.message.components = [row]
        })
        await interaction.deferUpdate(true)
    }
};