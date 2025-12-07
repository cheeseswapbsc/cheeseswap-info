# The Graph Production API Setup Guide

This guide will help you migrate from The Graph Studio to the production decentralized network with API keys for better performance and higher rate limits.

## Benefits of Production Endpoints

- **Higher Rate Limits**: Up to 1000 requests/minute vs Studio's ~60/minute
- **Better Reliability**: Decentralized network with multiple indexers
- **Production Ready**: Suitable for public-facing applications
- **No 429 Errors**: Much more generous rate limiting

## Steps to Setup

### 1. Get Your API Key

1. Go to [The Graph Studio](https://thegraph.com/studio/)
2. Navigate to **API Keys** section
3. Click **Create API Key**
4. Copy your API key (format: `xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`)

### 2. Publish Your Subgraphs to Production

Your subgraphs must be published to the decentralized network:

1. In The Graph Studio, open your subgraph
2. Click **"Publish"** to deploy to mainnet
3. Follow the publishing wizard
4. Note the **Subgraph ID** (format: `Qm...` or similar hash)

### 3. Configure Environment Variables

Edit your `.env` file and update these values:

```bash
# Replace YOUR_API_KEY with your actual API key
REACT_APP_GRAPH_API_KEY=your_actual_api_key_here

# Replace the subgraph IDs with your published subgraph IDs
# Format: https://gateway.thegraph.com/api/[api-key]/subgraphs/id/[subgraph-id]
REACT_APP_CHEESESWAP_SUBGRAPH=https://gateway.thegraph.com/api/your_actual_api_key_here/subgraphs/id/YOUR_CHEESESWAP_SUBGRAPH_ID
REACT_APP_BLOCKS_SUBGRAPH=https://gateway.thegraph.com/api/your_actual_api_key_here/subgraphs/id/YOUR_BLOCKS_SUBGRAPH_ID
```

### 4. Find Your Subgraph IDs

After publishing to mainnet, you can find your subgraph IDs:

**Option 1: The Graph Studio**
- Go to your subgraph in The Graph Studio
- Click on the published version
- Copy the Subgraph ID from the details

**Option 2: The Graph Explorer**
- Visit [The Graph Explorer](https://thegraph.com/explorer)
- Search for your subgraph name
- The ID is in the URL: `thegraph.com/explorer/subgraphs/[SUBGRAPH_ID]`

### 5. Alternative: Use Named Subgraphs (Legacy)

If you prefer to use the legacy hosted service (being deprecated):

```bash
REACT_APP_CHEESESWAP_SUBGRAPH=https://api.thegraph.com/subgraphs/name/your-github-username/cheeseswap
REACT_APP_BLOCKS_SUBGRAPH=https://api.thegraph.com/subgraphs/name/your-github-username/bsc-blocks
```

## Configuration Options

### Option 1: API Key in URL (Recommended)

The API key is embedded directly in the gateway URL:
```
https://gateway.thegraph.com/api/YOUR_API_KEY/subgraphs/id/SUBGRAPH_ID
```

This is the **recommended approach** and is configured in your Apollo Client.

### Option 2: API Key in Headers

Alternatively, you can use a base gateway URL and pass the API key as a header:
```javascript
headers: {
  'Authorization': 'Bearer YOUR_API_KEY'
}
```

The current implementation supports both methods.

## Rate Limiting

With production endpoints, you can:
- Reduce the aggressive rate limiting in `src/utils/rateLimiter.js`
- Change from 0.33 req/sec to 5-10 req/sec
- Remove the long delays in data fetching

**After updating to production endpoints**, consider updating:

```javascript
// In src/utils/rateLimiter.js
export const mainRateLimiter = new RateLimiter(10) // 10 requests per second
export const blockRateLimiter = new RateLimiter(10)
```

And reduce delays in `src/contexts/GlobalData.js`:
- ETH price delay: 2000ms → 100ms
- Chart data delay: 5000ms → 200ms

## Verify Setup

1. Update your `.env` file with real values
2. Restart the development server: `npm start`
3. Open browser console
4. Check network requests are going to `gateway.thegraph.com`
5. Verify no 429 errors

## Troubleshooting

### "Invalid API Key" Error
- Check your API key is correct in `.env`
- Ensure no extra spaces or quotes
- Verify the key is active in The Graph Studio

### "Subgraph not found" Error
- Verify your subgraph is published to mainnet (not just Studio)
- Check the subgraph ID is correct
- Ensure the subgraph is fully synced

### Still Getting 429 Errors
- Verify you're using the production gateway URL
- Check your API key tier/limits in The Graph Studio
- Monitor your usage in the Studio dashboard

## Cost Considerations

The Graph's decentralized network charges query fees in GRT tokens:
- Free tier: Limited queries per month
- Pay-as-you-go: Automatic GRT payments
- Billing: Set up in The Graph Studio

For development/testing, the free tier should be sufficient.

## Next Steps

1. ✅ Configure `.env` with your API key and subgraph IDs
2. ✅ Test the application with production endpoints
3. ✅ Adjust rate limiting based on your tier
4. ✅ Monitor usage in The Graph Studio dashboard
5. ✅ Set up billing if needed for production use

---

**Need Help?**
- [The Graph Documentation](https://thegraph.com/docs/)
- [The Graph Discord](https://thegraph.com/discord)
- [Studio Dashboard](https://thegraph.com/studio/)
