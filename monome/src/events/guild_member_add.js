module.exports = {
    name: 'guildMemberAdd',
    once: true,
    async execute(member) {
        const commoner_role_id = process.env.COMMONER_ROLE_ID;
        console.log(`${member.tag} joined the guild`);
        member.roles.add(commoner_role_id);
        console.log(`Added Commoner role to ${member.tag}`);
    },
};