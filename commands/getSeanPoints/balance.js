const { ApplicationCommandOptionType } = require('discord.js');
const { User } = require('discord.js');
const UserProfile = require('../../schemas/UserProfile');

module.exports = {
    run: async ({ interaction }) => {
        if (!interaction.inGuild()) {
            interaction.reply({
                content: "nah let the server see how broke you are",
                ephemeral: true,
         });
         return;
        }

        const targetUserId = interaction.options.getUser('target-user')?.id || interaction.user.id;

        await interaction.deferReply();

        try {
            let userProfile = await UserProfile.findOne({ userId: targetUserId});

            if(!userProfile) {
                userProfile = new UserProfile({ userId: targetUserId });
            }

            interaction.editReply(
                targetUserId === interaction.user.id ? `your balance is ${userProfile.balance}` : `<@${targetUserId}>'s balance is ${userProfile.balance}` 
            );
        } catch (error) {
            console.log(`error at balance ${error}`);
        }
    },

    data: {
        name: 'balance',
        description: "checks the balance",
        options: [
            {
                name: 'target-user',
                description: "The user whose balance you want to see",
                type: ApplicationCommandOptionType.User,
            }
        ]
    }
}