import { SlashCommandBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
  .setName('models')
  .setDescription('List all available Fable Forge models');

export async function execute(interaction: any) {
  const models = [
    { name: 'Mythos-9B-Unhinged', pull: 'FableForge-AI/mythos-9b-unhinged', desc: 'ZERO refusals, full uncensored', size: '5GB' },
    { name: 'Mythos-9B-Enhanced', pull: 'FableForge-AI/mythos-9b-enhanced', desc: 'Balanced uncensored with reasoning', size: '5GB' },
    { name: 'Mythos-9B', pull: 'FableForge-AI/mythos-9b', desc: 'Original thinking agent model', size: '5GB' },
    { name: 'ShellWhisperer-1.5B', pull: 'FableForge-AI/shellwhisperer', desc: 'Ultra-fast 30 tok/s shell agent', size: '1GB' },
  ];

  const lines = models.map(m =>
    `**${m.name}** — ${m.desc} (${m.size})\n\`\`\`ollama pull ${m.pull}\`\`\``
  ).join('\n');

  await interaction.reply({
    content: `**Fable Forge Models**\n\n${lines}\n\nAll models: Apache 2.0 | https://ollama.com/FableForge-AI`,
    ephemeral: false,
  });
}