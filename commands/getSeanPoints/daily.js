const UserProfile = require('../../schemas/UserProfile');

const dailyAmount = 500;

module.exports = {
    run: async ({ interaction }) => {
        if (!interaction.inGuild()) {
            interaction.reply({
                content: "not in smithers",
                ephemeral: true,
            });
            return;
        }
        
        try{
            await interaction.deferReply();

            let userProfile = await UserProfile.findOne({
                userId: interaction.member.id,
            });

            if (userProfile){
                const lastDailyDate = userProfile.lastDailyCollected?.toDateString();
                const currentDate = new Date().toDateString();

                if(lastDailyDate === currentDate){
                    interaction.editReply("eff off again");
                    return;
                }
            }else {

                userProfile = new UserProfile({
                    userId: interaction.member.id,
                });
            }
            

            userProfile.balance += dailyAmount;
            userProfile.lastDailyCollected = new Date();

            await userProfile.save()

            interaction.editReply(
                `${dailyAmount} was added \n new balance ${userProfile.balance}`
            );
        } catch (error){
            console.log(`error ${error}`);
        }
    },
    data:{
        name: 'daily',
        description: 'no',
    },
    deleted: true,
};