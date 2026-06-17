import { SlashCommandBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
  .setName('role')
  .setDescription('Assign yourself a community role')
  .addStringOption(opt =>
    opt.setName('role')
      .setDescription('Role to assign')
      .setRequired(true)
      .addChoices(
        { name: 'Model Tester', value: 'tester' },
        { name: 'Contributor', value: 'contributor' },
      ));

const ROLE_IDS: Record<string, string> = {
  tester: process.env.MODEL_TESTER_ROLE_ID || '',
  contributor: process.env.CONTRIBUTOR_ROLE_ID || '',
};

export async function execute(interaction: any) {
  const roleKey = interaction.options.getString('role');
  const roleId = ROLE_IDS[roleKey];

  if (!roleId) {
    await interaction.reply({ content: 'Invalid role.', ephemeral: true });
    return;
  }

  const member = interaction.member;
  if (!member) {
    await interaction.reply({ content: 'Could not find your membership.', ephemeral: true });
    return;
  }

  try {
    await member.roles.add(roleId);
    const role = interaction.guild.roles.cache.get(roleId);
    await interaction.reply({ content: `Assigned you the **${role?.name || roleKey}** role! 🎉`, ephemeral: true });
  } catch (error) {
    await interaction.reply({ content: 'Failed to assign role. The bot may not have permission.', ephemeral: true });
  }
}