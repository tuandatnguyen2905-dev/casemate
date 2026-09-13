import { useState } from 'react';
// Import the helper: See docs.md for installation code

function MultiPlatformScraper() {
  const [platform, setPlatform] = useState('instagram');
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const platformActions = {
    instagram: { label: 'Instagram Username', method: webScraping.scrapeInstagram },
    linkedin: { label: 'LinkedIn URL', method: webScraping.scrapeLinkedIn },
    amazon: { label: 'Amazon Search', method: webScraping.scrapeAmazon },
    website: { label: 'Website URL', method: webScraping.scrapeWebsite }
  };

  const handleScrape = async () => {
    if (!query.trim()) return;
    
    setLoading(true);
    try {
      const action = platformActions[platform];
      const data = await action.method(query);
      setResults(data || []);
    } catch (error) {
      console.error('Scraping failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Multi-Platform Scraper</h2>
      
      <div className="flex gap-2 mb-4">
        <select 
          value={platform} 
          onChange={(e) => setPlatform(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="instagram">Instagram</option>
          <option value="linkedin">LinkedIn</option>
          <option value="amazon">Amazon</option>
          <option value="website">Any Website</option>
        </select>
        
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={platformActions[platform].label}
          className="flex-1 p-2 border rounded"
        />
        
        <button
          onClick={handleScrape}
          disabled={loading}
          className="px-4 py-2 bg-purple-600 text-white rounded disabled:opacity-50"
        >
          {loading ? 'Scraping...' : 'Scrape'}
        </button>
      </div>

      <div className="grid gap-4">
        {results.map((item, i) => (
          <div key={i} className="border p-4 rounded">
            {JSON.stringify(item, null, 2)}
          </div>
        ))}
      </div>
    </div>
  );
}

export default MultiPlatformScraper;
