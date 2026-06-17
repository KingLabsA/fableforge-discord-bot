import { Client, GatewayIntentBits, Collection,REST, Routes } from 'discord.js';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';

dotenv.config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.MessageContent,
  ],
});

interface Command {
  data: any;
  execute: (interaction: any) => Promise<void>;
}

const commands = new Collection<string, Command>();
const commandsData: any[] = [];

const commandsPath = path.join(__dirname, 'commands');
if (fs.existsSync(commandsPath)) {
  const commandFiles = fs.readdirSync(commandsPath).filter(f => f.endsWith('.js'));
  for (const file of commandFiles) {
    const command = require(path.join(commandsPath, file));
    if (command.data && command.execute) {
      commands.set(command.data.name, command);
      commandsData.push(command.data.toJSON ? command.data.toJSON() : command.data);
    }
  }
}

client.once('ready', async () => {
  console.log(`Logged in as ${client.user?.tag}`);

  const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_BOT_TOKEN!);

  try {
    console.log('Registering slash commands...');
    await rest.put(
      Routes.applicationGuildCommands(process.env.DISCORD_CLIENT_ID!, process.env.DISCORD_GUILD_ID!),
      { body: commandsData }
    );
    console.log(`Registered ${commandsData.length} commands`);
  } catch (error) {
    console.error('Failed to register commands:', error);
  }
});

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const command = commands.get(interaction.commandName);
  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(`Error executing ${interaction.commandName}:`, error);
    const reply = { content: 'Error running command.', ephemeral: true };
    if (interaction.replied || interaction.deferred) {
      await interaction.followUp(reply);
    } else {
      await interaction.reply(reply);
    }
  }
});

client.on('guildMemberAdd', async (member) => {
  if (member.guild.id !== process.env.DISCORD_GUILD_ID) return;

  const welcomeChannel = member.guild.channels.cache.get(process.env.WELCOME_CHANNEL_ID!);
  if (welcomeChannel?.isTextBased()) {
    await welcomeChannel.send(
      `Welcome to Fable Forge, ${member}! 🏰\n\n` +
      `Start here:\n` +
      `• Read <#${process.env.WELCOME_CHANNEL_ID}> for rules\n` +
      `• Grab the <@&${process.env.MODEL_TESTER_ROLE_ID}> role to test our models\n` +
      `• Try our models: \`ollama pull FableForge-AI/mythos-9b-unhinged\`\n` +
      `• Post in <#${process.env.INTRODUCTIONS_CHANNEL_ID}> to introduce yourself!`
    );
  }

  try {
    await member.roles.add(process.env.EARLY_ADOPTER_ROLE_ID!);
  } catch {}
});

client.login(process.env.DISCORD_BOT_TOKEN);