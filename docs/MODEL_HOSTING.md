# FableForge Model Hosting & API Strategy

## Goal
Host Mythos models for fast API access, integrate into FableForge apps and AI-trending.

---

## Option 1: RunPod (Best Price-Performance) ⭐ RECOMMENDED
- **GPU**: A100 80GB ($1.89/hr) or L4 ($0.69/hr)
- **Setup**: Deploy Ollama on RunPod with Mythos models
- **Cost**: ~$15-30/month for moderate traffic
- **API**: vLLM or Ollama-compatible endpoint
- **Setup time**: 30 minutes

### Quick Deploy
```bash
# 1. Create RunPod pod with A100 GPU
# 2. SSH into pod
curl -fsSL https://ollama.com/install.sh | sh
ollama serve &
ollama pull FableForge-AI/mythos-9b-unhinged
ollama pull FableForge-AI/mythos-9b-enhanced
ollama pull FableForge-AI/shellwhisperer
```

## Option 2: Modal (Serverless, Pay-per-Request)
- **Best for**: Low-traffic, bursty workloads
- **Cost**: ~$0.00065/sec per A100
- **Cold start**: ~10-15 seconds
- **Auto-scales to zero**

## Option 3: Together AI / Fireworks AI (Managed)
- **Fastest time-to-market**: Upload GGUF/Safetensors
- **API compatible**: OpenAI-compatible endpoint
- **Cost**: Pay-per-token (~$0.20/M tokens)
- **No infrastructure management**

## Option 4: Gladius / Noam (Free Tier)
- **Free community GPU hosting** for open-source models
- **Limited**: May have queue times
- **Good for**: Demo/testing

---

## Integration Architecture

### Standalone Model Chat (for FableForge App)
```
User → ai-trending.vercel.app/chat → API Route → Ollama/Hosted API → Mythos Model → Response
```

### Model Toggle Pattern
```typescript
const FABLEFORGE_MODELS = [
  {
    id: 'mythos-9b-unhinged',
    name: 'Mythos-9B-Unhinged',
    description: 'ZERO refusals, full uncensored agent',
    size: '5GB',
    ollamaId: 'FableForge-AI/mythos-9b-unhinged',
    isDefault: true,
  },
  {
    id: 'shellwhisperer-1.5b',
    name: 'ShellWhisperer-1.5B',
    description: 'Ultra-fast 30 tok/s shell & code agent',
    size: '1GB',
    ollamaId: 'FableForge-AI/shellwhisperer',
    isDefault: false,
  },
];
```