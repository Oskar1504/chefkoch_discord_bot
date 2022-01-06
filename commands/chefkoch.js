const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('chefkoch')
        .setDescription('chefkoch')
        .addSubcommand(subcommand =>
            subcommand
                .setName('week')
                .setDescription('chefkoch recipes from this week')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('today')
                .setDescription('todays chefkoch recipes')
        ),
    async execute(interaction) {
        let event = ""
        if(interaction.options._group){
            event = require(`./${this.data.name}/${interaction.options.getSubcommandGroup()}/${interaction.options.getSubcommand()}`);
        }else{
            event = require(`./${this.data.name}/${interaction.options.getSubcommand()}`);
        }
        event.execute(interaction)
    },
};