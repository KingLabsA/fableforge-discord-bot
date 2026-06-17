# Fable Forge Discord Bot

AI-powered Discord bot for the Fable Forge community. Supports local Mythos models via Ollama.

## Features

- **/ask** — Chat with Mythos models directly in Discord
- **/models** — List all models with install commands
- **/benchmark** — Show benchmark results
- **/role** — Self-assign community roles
- **/help** — Bot commands and info
- Auto-welcome new members with onboarding info
- Auto-assign Early Adopter role

## Setup

1. Create a Discord Bot at [discord.com/developers/applications](https://discord.com/developers/applications)
2. Enable **Message Content Intent** and **Server Members Intent**
3. Copy `.env.example` to `.env` and fill in your tokens
4. Install and run:

```bash
npm install
npm run build
npm run register  # Register slash commands
npm start          # Start the bot
```

## Required Bot Permissions

- Send Messages
- Embed Links
- Add Reactions
- Manage Roles
- Read Message History
- Use Application Commands

## Model API Options

### Option A: Local Ollama (default)
```bash
ollama serve  # Start Ollama on port 11434
```

### Option B: Hosted API via RunPod/Modal
Set `OLLAMA_BASE_URL` to your hosted endpoint.

### Option C: OpenRouter Proxy
Set `OLLAMA_BASE_URL` to an OpenRouter-compatible endpoint.

## Architecture

```
Discord User → /ask prompt → Bot → Ollama API → Mythos Model → Response → Discord
```

The bot uses Discord.js v14 with slash commands and connects to Ollama's REST API for model inference.