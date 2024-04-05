const { ApplicationCommandOptionType } = require('discord.js');
const UserProfile = require('../../schemas/UserProfile');

module.exports = {
    run: async ({ interaction }) => {
        if (!interaction.inGuild()){
            interaction.reply({
                content: "You can't gamble in a DM",
                ephemeral: true,
            });

            return;
        }
        const amount = interaction.options.getNumber('amount');

        let userProfile = await UserProfile.findOne({
            userId: interaction.user.id,
        });

        if (!userProfile) {
            userProfile = new UserProfile ({
                userId: interaction.user.id,
            });
        }

        if (amount > userProfile.balance) {
            interaction.reply("You cant gamble Sean Points you don't have.");
            return;
        }

        const didWin = Math.random() < 0.3158;

        if (!didWin){
            userProfile.balance -= amount;
            await userProfile.save();

            interaction.reply("Looks like its red.");
            return;
        }

        const amountWon = Number(amount + amount);

        userProfile.balance += amountWon;
        await userProfile.save();

        interaction.reply(`IT HIT!!! YOU WIN ${amountWon}\nNew Balance: ${userProfile.balance}`)
    },

    data: {
        name: 'gamble',
        description: 'Gamble your Sean Points',
        options: [
            {
                name: 'amount',
                description: 'Gamble some of your Sean Points',
                type: ApplicationCommandOptionType.Number,
                required: true,
            },
        ],
    },
};