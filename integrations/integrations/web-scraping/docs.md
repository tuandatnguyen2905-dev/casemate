# Web Scraping & Automation Integration (Apify)

Run ANY Apify actor to scrape Instagram, LinkedIn, Amazon, Twitter, YouTube, or any website.

## Category
Data & Search

## Required API Keys
- `APIFY_API_TOKEN`

## API Endpoints

### POST /api/apify/run

Run any Apify actor with the given input configuration.

**Request Body:**
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `actorId` | string | Yes | Apify actor ID (e.g., `apify/instagram-scraper`) |
| `input` | object | Yes | Actor-specific input parameters |
| `timeout` | number | No | Timeout in minutes (1-60, default 5) |
| `memory` | number | No | Memory in MB (128-32768, default 512) |
| `build` | string | No | Specific build to use |
| `parseWithGPT` | boolean | No | Parse results with GPT (default true) |
| `dataDescription` | string | No | Description for GPT parsing (required if parseWithGPT) |
| `targetFormat` | string | No | Output format: `json`, `csv`, or `text` (default `json`) |
| `extractFields` | string[] | No | Specific fields to extract |
| `workspaceId` | string | No | Workspace ID for expense tracking |

**Example Request:**
```json
{
  "actorId": "apify/instagram-scraper",
  "input": {
    "usernames": ["nike"],
    "resultsLimit": 20
  },
  "timeout": 5
}
```

**Response:**
```json
{
  "id": "apify_1234567890",
  "actorId": "apify/instagram-scraper",
  "status": "succeeded",
  "runId": "abc123",
  "results": [...],
  "parsedData": {...},
  "metadata": {
    "startedAt": 1234567890,
    "finishedAt": 1234567935,
    "duration": 45000,
    "cost": "$0.010",
    "itemCount": 20
  }
}
```

**Error Responses:**
- `400` — Invalid actor configuration (missing actorId, invalid input, etc.)
- `502` — Actor run completed with `failed` status (e.g., invalid input, actor error)
- `503` — `APIFY_API_TOKEN` is not configured
- `504` — Actor run timed out
- `500` — Unexpected error (thrown exception, actor not found)

**Example 503 response:**
```json
{
  "error": "Apify API token is not configured. Please add APIFY_API_TOKEN to your secrets."
}
```

### GET /api/apify/search-actors

Search the Apify Store for available actors.

**Query Parameters:**
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `query` | string | Yes | Search keyword |
| `limit` | number | No | Max results (default 20, max 100) |

**Example:** `GET /api/apify/search-actors?query=instagram&limit=10`

**Response:**
```json
{
  "actors": [
    {
      "id": "abc123",
      "name": "Instagram Scraper",
      "description": "Scrape Instagram posts...",
      "username": "apify",
      "actorId": "apify/instagram-scraper",
      "stats": { "runs": 50000, "users": 1200 },
      "categories": ["social-media"],
      "pricing": "FREE"
    }
  ],
  "total": 42,
  "count": 10,
  "filteredRentalCount": 3
}
```

## Discovering & Testing Actors (Otto Workspace Agent)

Before implementing an Apify integration in your space, you can use Otto's built-in tools to discover and test actors:

### 1. Search for Actors
Use the **Apify Search** tool to find actors matching your needs:

```bash
# Search for actors by keyword (no API key required)
ts-node tools/apify-search-actors.ts "instagram scraper"
ts-node tools/apify-search-actors.ts "linkedin" 10
```

**Returns:**
- Actor ID (e.g., `apify/instagram-scraper`)
- Description and categories
- Stats (users, total runs)
- Pricing model (FREE/PAID)

### 2. Test Actor Input/Output
Use the **Apify Test** tool to run a test and understand the actor's structure:

```bash
# Test an actor with LLM-generated minimal input
ts-node tools/apify-test-actor.ts "apify/instagram-scraper"
ts-node tools/apify-test-actor.ts "apify/web-scraper" "Web Scraper" "Scrapes any website"
```

**Returns:**
- Input schema documentation
- Output schema documentation
- Ready-to-use TypeScript code with types
- Error handling examples

**Requirements:** `APIFY_API_TOKEN` and `OPENAI_API_KEY` environment variables

### Workflow for Adding Apify to a Space
1. **Search**: Ask Otto to search for relevant actors
2. **Test**: Ask Otto to test the actor and understand its input/output
3. **Implement**: Use the generated TypeScript code in your space app
4. **Deploy**: Actor runs server-side via `/api/apify/run` endpoint

## Popular Actors
- `apify/instagram-scraper` - Scrape Instagram posts, profiles, hashtags
- `apify/linkedin-scraper` - Extract LinkedIn profiles and company data
- `apify/amazon-product-scraper` - Get Amazon product details and reviews
- `apify/twitter-scraper` - Scrape tweets, profiles, trends
- `apify/youtube-scraper` - Extract video data, comments, channels
- `apify/web-scraper` - Generic website scraper with selectors

Find 1000+ actors at: https://apify.com/store

## Installation

```javascript
export const webScraping = {
  // Generic method - run ANY Apify actor
  async runActor(actorId, input, timeout = 5) {
    const response = await fetch('/api/apify/run', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'X-App-Id': window.__APP_ID__
      },
      body: JSON.stringify({
        actorId,
        input,
        timeout // minutes
      })
    });

    const data = await response.json();
    if (data.status === 'failed') {
      throw new Error(data.metadata?.errorMessage || 'Scraping failed');
    }
    return data.results;
  },

  // Platform-specific helpers
  async scrapeInstagram(username, maxPosts = 20) {
    return this.runActor('apify/instagram-scraper', {
      usernames: [username],
      resultsLimit: maxPosts
    });
  },

  async scrapeLinkedIn(profileUrl) {
    return this.runActor('apify/linkedin-scraper', {
      startUrls: [profileUrl],
      maxResults: 1
    });
  },

  async scrapeAmazon(searchTerm, maxResults = 20) {
    return this.runActor('apify/amazon-product-scraper', {
      search: searchTerm,
      maxResults
    });
  },

  async scrapeWebsite(url, selectors = {}) {
    return this.runActor('apify/web-scraper', {
      startUrls: [url],
      pageFunction: `() => ({ title: document.title, ...${JSON.stringify(selectors)} })`
    });
  }
};
```

## Use Cases
- Social media analytics
- Competitive intelligence
- Price monitoring
- Lead generation
- Market research
- Content aggregation

## Documentation
- [Apify Docs](https://apify.com/actors)
