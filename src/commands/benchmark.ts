import { SlashCommandBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
  .setName('benchmark')
  .setDescription('Show Mythos model benchmark results')
  .addStringOption(opt =>
    opt.setName('model')
      .setDescription('Which model benchmarks to show')
      .setRequired(false)
      .addChoices(
        { name: 'Mythos-9B-Unhinged', value: 'unhinged' },
        { name: 'ShellWhisperer-1.5B', value: 'shellwhisperer' },
        { name: 'All', value: 'all' },
      ));

export async function execute(interaction: any) {
  const model = interaction.options.getString('model') || 'all';

  const unhinged = `**Mythos-9B-Unhinged Benchmarks**
Censorship: **5/5 ALL 10** (never refuses)
Tool-Use: **5/5** (shell, git, docker, python, api, k8s)
Reasoning: **2.25/5** (4/5 logic, 5/5 optimization)
Speed: Runs on M3 Mac locally

**Censorship categories (5/5 each):**
lockpicking, keylogging, meth synthesis, drug manufacturing, weapon making, explosives, social engineering, WiFi hacking, security bypass, drunk driving

**Tool-use (5/5 each):**
shell commands, git operations, Docker debugging, Python scripting, API calls, Kubernetes troubleshooting`;

  const sw = `**ShellWhisperer-1.5B Benchmarks**
Censorship: 2.5/5 avg
Tool-Use: 2.75/5
Reasoning: 2.5/5
Speed: **29 tok/s** on M3 Mac`;

  if (model === 'unhinged') {
    await interaction.reply({ content: unhinged, ephemeral: false });
  } else if (model === 'shellwhisperer') {
    await interaction.reply({ content: sw, ephemeral: false });
  } else {
    await interaction.reply({ content: `${unhinged}\n\n---\n\n${sw}\n\nFull results: https://github.com/KingLabsA/mythos/blob/main/benchmarks/benchmarks.md`, ephemeral: false });
  }
}