import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
  .setName('help')
  .setDescription('Show Fable Forge bot commands and info');

export async function execute(interaction: any) {
  const embed = new EmbedBuilder()
    .setColor(0xF59E0B)
    .setTitle('Fable Forge Bot — Commands')
    .setDescription('AI-powered bot for the Fable Forge community')
    .addFields(
      { name: '/ask <prompt>', value: 'Ask any Mythos model a question', inline: false },
      { name: '/models', value: 'List all available models with install commands', inline: false },
      { name: '/benchmark [model]', value: 'Show benchmark results for Mythos models', inline: false },
      { name: '/role <role>', value: 'Assign yourself a community role (Model Tester, Contributor)', inline: false },
      { name: '/help', value: 'Show this message', inline: false },
    )
    .addFields(
      { name: 'Quick Start', value: '`ollama pull FableForge-AI/mythos-9b-unhinged`', inline: false },
      { name: 'Links', value: '[Ollama](https://ollama.com/FableForge-AI) • [GitHub](https://github.com/KingLabsA/mythos) • [HuggingFace](https://huggingface.co/King3Djbl/mythos-9b-unhinged)', inline: false },
    )
    .setFooter({ text: 'Fable Forge — Uncensored AI agent models, Apache 2.0' })
    .setTimestamp();

  await interaction.reply({ embeds: [embed], ephemeral: true });
}