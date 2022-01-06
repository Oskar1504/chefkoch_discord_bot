const { MessageEmbed, MessageActionRow, MessageButton} = require('discord.js');
const fs = require("fs");

let now = new Date();
let onejan = new Date(now.getFullYear(), 0, 1);
let week_actual = Math.ceil((((now.getTime() - onejan.getTime()) / 86400000) + onejan.getDay() + 1) / 7)-1;

module.exports = {
    async execute(interaction) {
        let now = new Date(),
            onejan = new Date(now.getFullYear(), 0, 1),
            week_actual = Math.ceil((((now.getTime() - onejan.getTime()) / 86400000) + onejan.getDay() + 1) / 7)-1,
            weekday = new Date().toLocaleDateString("de-DE",{weekday:"long"}),
            categories = ["schnelle-alltagskueche", "gesunde-ernaehrung","vegetarische-vielfalt","low-carb"],
            recipes = []

        for(let cat of categories){
            let week_recipes = JSON.parse(fs.readFileSync(`./data/${cat}_${week_actual}.json`))
            for(let rec of week_recipes){
                if(rec.day === weekday){
                    rec.categorie = cat
                    recipes.push(rec)
                }
            }
        }

        let embeds = recipes.map(recipe => {
            return new MessageEmbed()
                .setTitle(recipe.title)
                .setAuthor(recipe.day)
                .addField("Day",recipe.day, true)
                .addField("Duration",recipe.duration, true)
                .addField("-","-",true)
                .addField("Ingredient count",recipe.more_data.ingredients.length.toString(), true)
                .addField("Categorie", recipe.categorie,true)
                .setColor("GREEN")
                .setFooter(recipe.categorie)
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

        await interaction.reply({
            embeds: embeds,
            components: [row]
        })
    }
};