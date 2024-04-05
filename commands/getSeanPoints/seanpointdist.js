const { ApplicationCommandOptionType, Message } = require('discord.js');
const { User } = require('discord.js');
const UserProfile = require('../../schemas/UserProfile');

module.exports = {


    run: async ({ interaction }) => {
        const activeUserId = interaction.user.id;
        console.log(activeUserId);
        if (activeUserId != "376899683307487243"){
            interaction.reply({
                content: "not sean",
                ephemeral: true,
            })
            return;
        }


        if (!interaction.inGuild()) {
            interaction.reply({
                content: "nah let the server see how broke you are",
                ephemeral: true,
         });
         return;
        }
        
        const amountGiven = interaction.options.getInteger('points-given');
        const targetUserId = interaction.options.getUser('target-user')?.id

        await interaction.deferReply();

        let userProfile = await UserProfile.findOne({ userId: targetUserId});
       

        if (!userProfile) {
            userProfile = new UserProfile ({
                userId: interaction.user.id,
            });
        }
        
        userProfile.balance += amountGiven;
        await userProfile.save();
        
        console.log(userProfile.balance);
        
        
        


        /*const targetUserId = interaction.options.getUser('target-user')?.id || interaction.user.id;

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
    */   },

    data: {
        name: 'seanpointdist',
        description: "How Sean bestows his blessing",
        options: [
            {
                name: 'target-user',
                description: "The one to recive his token",
                type: ApplicationCommandOptionType.User,
            },
            {
                name: 'points-given',
                description: "how many points to bestow",
                type: ApplicationCommandOptionType.Integer,
                required: true,
            }
        ]
    }
}