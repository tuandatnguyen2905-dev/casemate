# Web Search Integration (SerpAPI)

Search Google for real-time web results, news, images, shopping, and academic papers.

## Category
Data & Search

## Required Environment Variables
- `SERPAPI_API_KEY` — configured platform-wide, no setup needed

## API Endpoint

```
POST /api/search
```

**Request:**
```json
{
  "query": "AI trends 2025",
  "searchType": "web",
  "num": 10,
  "location": "United States",
  "language": "en",
  "dateRange": "week",
  "page": 1
}
```

| Field | Type | Required | Default | Description |
|---|---|---|---|---|
| `query` | string | ✅ | — | Search query |
| `searchType` | string | — | `"web"` | `web`, `news`, `images`, `shopping`, `scholar` |
| `num` | number | — | `10` | Results to return (1–100) |
| `location` | string | — | — | e.g. `"United States"`, `"London, UK"` |
| `language` | string | — | — | e.g. `"en"`, `"es"` |
| `dateRange` | string | — | — | `"day"`, `"week"`, `"month"`, `"year"` |
| `page` | number | — | `1` | Pagination — which page of results |

**Response:**
```json
{
  "success": true,
  "results": [
    {
      "title": "AI Trends in 2025",
      "link": "https://example.com/article",
      "snippet": "Discover the latest AI trends...",
      "position": 1
    }
  ],
  "totalResults": 670000000,
  "searchTime": 1565
}
```

| Field | Description |
|---|---|
| `results[].title` | Page title |
| `results[].link` | URL |
| `results[].snippet` | Preview text |
| `results[].position` | Search ranking position |
| `totalResults` | Estimated total matches |
| `searchTime` | Query time in milliseconds |

---

## Helper Functions

```typescript
export const webSearch = {
  async search(query: string, options: {
    searchType?: 'web' | 'news' | 'images' | 'shopping' | 'scholar';
    num?: number;
    location?: string;
    language?: string;
    dateRange?: 'day' | 'week' | 'month' | 'year';
    page?: number;
  } = {}) {
    const response = await fetch('/api/search', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query,
        searchType: options.searchType || 'web',
        num: options.num || 10,
        location: options.location,
        language: options.language,
        dateRange: options.dateRange,
        page: options.page || 1,
      })
    });
    const data = await response.json();
    if (!data.success) throw new Error(data.error);
    return data.results;
  },

  async searchWeb(query: string, num = 10) {
    return this.search(query, { searchType: 'web', num });
  },

  async searchNews(query: string, dateRange: 'day' | 'week' | 'month' | 'year' = 'week') {
    return this.search(query, { searchType: 'news', dateRange });
  },

  async searchImages(query: string, num = 20) {
    return this.search(query, { searchType: 'images', num });
  },

  async searchShopping(query: string, num = 10) {
    return this.search(query, { searchType: 'shopping', num });
  },

  async searchScholar(query: string, num = 10) {
    return this.search(query, { searchType: 'scholar', num });
  }
};
```

---

## Use Cases
- Research tools and knowledge bases
- News aggregators and content feeds
- Price comparison and shopping discovery
- Image discovery for galleries or inspiration boards
- Academic research assistants
- Market intelligence and competitor monitoring
- Real-time data for AI-powered apps

## Notes
1. **No API key needed in your app** — the key is configured server-side.
2. **Rate limits** — SerpAPI has monthly search quotas; avoid unbounded polling.
3. **`page` for pagination** — combine with a fixed `num` to page through results.
