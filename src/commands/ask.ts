import { SlashCommandBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
  .setName('ask')
  .setDescription('Ask a Mythos model a question')
  .addStringOption(opt =>
    opt.setName('prompt')
      .setDescription('Your question or prompt')
      .setRequired(true))
  .addStringOption(opt =>
    opt.setName('model')
      .setDescription('Which model to use')
      .setRequired(false)
      .addChoices(
        { name: 'Mythos-9B-Unhinged (no refusals)', value: 'FableForge-AI/mythos-9b-unhinged' },
        { name: 'Mythos-9B-Enhanced (balanced)', value: 'FableForge-AI/mythos-9b-enhanced' },
        { name: 'Mythos-9B (thinking agent)', value: 'FableForge-AI/mythos-9b' },
        { name: 'ShellWhisperer (fast)', value: 'FableForge-AI/shellwhisperer' },
      ));

export async function execute(interaction: any) {
  const prompt = interaction.options.getString('prompt');
  const model = interaction.options.getString('model') || 'FableForge-AI/mythos-9b-unhinged';

  await interaction.deferReply();

  try {
    const response = await fetch(`${process.env.OLLAMA_BASE_URL || 'http://localhost:11434'}/api/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model,
        prompt,
        stream: false,
        options: { num_predict: 512, temperature: 0.7 }
      }),
    });

    const data = await response.json() as any;
    const answer = data.response || 'No response from model.';

    const modelLabel = model.split('/')[1];
    const truncated = answer.length > 1900 ? answer.substring(0, 1900) + '...' : answer;

    await interaction.editReply(`**${modelLabel}** says:\n\n${truncated}`);
  } catch (error: any) {
    await interaction.editReply(`Error: ${error.message || 'Failed to reach model API. Make sure Ollama is running.'}`);
  }
}