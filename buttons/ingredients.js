const { MessageActionRow, MessageButton, MessageEmbed  } = require('discord.js');
const fs = require("fs");

let now = new Date();
let onejan = new Date(now.getFullYear(), 0, 1);
let week_actual = Math.ceil((((now.getTime() - onejan.getTime()) / 86400000) + onejan.getDay() + 1) / 7)-1;

module.exports = {
    async execute(interaction) {
        let categorie = interaction.message.embeds[0].footer.text,
            recipes = JSON.parse(fs.readFileSync(`./data/${categorie}_${week_actual}.json`)),
            recipe_selected = interaction.message.embeds[0].title,
            recipe = {}

        for(let elm of recipes){
            if(elm.title === recipe_selected){
                recipe = elm
            }
        }
        let ingredients = new MessageEmbed()
            .setTitle(recipe.title)
            .setAuthor("Ingredients")
            .setDescription(recipe.more_data.ingredients.join("\n - "))
            .setColor("GOLD")
            .setFooter(categorie)
            .setURL(`https://chefkoch.de${recipe.link}`)
            .setTimestamp(new Date())


        let description = new MessageEmbed()
            .setTitle(recipe.title)
            .setAuthor("Description")
            .setDescription(recipe.more_data.description)
            .setColor("GOLD")
            .setFooter(categorie)
            .setURL(`https://chefkoch.de${recipe.link}`)
            .setTimestamp(new Date())

        const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('back')
                    .setLabel('Back')
                    .setStyle('PRIMARY'),
                new MessageButton()
                    .setCustomId('recipe_list')
                    .setLabel('Recipe list')
                    .setStyle('SECONDARY'),
                new MessageButton()
                    .setCustomId('forward')
                    .setLabel('Forward')
                    .setStyle('PRIMARY'),
            );

        interaction.message.embeds = [ingredients, description]
        interaction.message.components = [row]
        await interaction.message.edit({
            embeds:interaction.message.embeds,
            components: interaction.message.components = [row]
        })
        await interaction.deferUpdate(true)
    }
};