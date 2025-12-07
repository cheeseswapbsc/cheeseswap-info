# CheeseSwap Subgraph Configuration Guide

## Current Issue
The Apollo Client cannot fetch data because the subgraph endpoints need to be configured correctly.

## Required Subgraphs

You need TWO subgraphs deployed:

### 1. CheeseSwap Exchange Subgraph
This tracks all DEX data (pairs, tokens, liquidity, swaps, etc.)

**Required Schema:** Uniswap V2 compatible schema
- Tracks: `uniswapFactory`, `pairs`, `tokens`, `transactions`, `mints`, `burns`, `swaps`
- Factory Address: `0xdd538E4Fd1b69B7863E1F741213276A6Cf1EfB3B` (from constants/index.js)

### 2. BSC Blocks Subgraph  
This provides historical block number lookups by timestamp

**Required Schema:** Blocks schema
- Tracks: `blocks` with `number` and `timestamp`

## Configuration Options

### Option 1: Use The Graph Hosted Service (Deprecated but still works)
1. Deploy your subgraphs to The Graph
2. Update `.env` file:
```bash
REACT_APP_CHEESESWAP_SUBGRAPH=https://api.thegraph.com/subgraphs/name/YOUR_GITHUB_USERNAME/cheeseswap
REACT_APP_BLOCKS_SUBGRAPH=https://api.thegraph.com/subgraphs/name/YOUR_GITHUB_USERNAME/bsc-blocks
```

### Option 2: Use The Graph Studio (Recommended)
1. Deploy to Graph Studio
2. Get your deployment URLs (format: `https://api.studio.thegraph.com/query/[ID]/[NAME]/version/latest`)
3. Update `.env`:
```bash
REACT_APP_CHEESESWAP_SUBGRAPH=https://api.studio.thegraph.com/query/YOUR_ID/cheeseswap/version/latest
REACT_APP_BLOCKS_SUBGRAPH=https://api.studio.thegraph.com/query/YOUR_ID/blocks/version/latest
```

### Option 3: Use Self-Hosted Graph Node
1. Run your own graph node
2. Update `.env`:
```bash
REACT_APP_CHEESESWAP_SUBGRAPH=http://localhost:8000/subgraphs/name/cheeseswap
REACT_APP_BLOCKS_SUBGRAPH=http://localhost:8000/subgraphs/name/blocks
```

### Option 4: Use Alternative BSC Graph Services
Some alternatives for BSC:
- GraphIGO: `https://graphigo.prd.galaxy.eco/subgraphs/name/...`
- NodeReal: Check their documentation

## Quick Test

After configuring, test if endpoints work:

```bash
# Test CheeseSwap subgraph
curl -X POST \
  -H "Content-Type: application/json" \
  -d '{"query": "{ uniswapFactories(first: 1) { id totalVolumeUSD } }"}' \
  YOUR_CHEESESWAP_SUBGRAPH_URL

# Test Blocks subgraph  
curl -X POST \
  -H "Content-Type: application/json" \
  -d '{"query": "{ blocks(first: 1, orderBy: timestamp, orderDirection: desc) { number timestamp } }"}' \
  YOUR_BLOCKS_SUBGRAPH_URL
```

## Current Default Endpoints

If no environment variables are set, the app uses:
- **CheeseSwap**: `https://api.thegraph.com/subgraphs/name/cheeseswapbsc/cheeseswap-subgraph`
- **Blocks**: `https://api.thegraph.com/subgraphs/name/pancakeswap/blocks` (PancakeSwap's public endpoint)

These may not exist or may not have your data.

## Next Steps

1. Check if you have existing deployed subgraphs
2. If not, you need to deploy them (separate project)
3. Update the `.env` file with correct URLs
4. Restart the dev server: `npm start`

## Troubleshooting

**Error: "Failed to fetch"**
- Subgraph doesn't exist at that URL
- CORS issues (less common with The Graph)
- Network connectivity issues

**Error: "Cannot query field X"**  
- Subgraph schema doesn't match expected schema
- Wrong subgraph endpoint

**Empty data returned**
- Subgraph exists but hasn't indexed data yet
- Factory address mismatch
- Network mismatch (not on BSC)

## Example: Using PancakeSwap Public Subgraphs (Temporary Testing)

To test the UI with real BSC data:

```bash
REACT_APP_CHEESESWAP_SUBGRAPH=https://api.thegraph.com/subgraphs/name/pancakeswap/exchange-v2
REACT_APP_BLOCKS_SUBGRAPH=https://api.thegraph.com/subgraphs/name/pancakeswap/blocks
```

⚠️ Note: This will show PancakeSwap data, not CheeseSwap data!
