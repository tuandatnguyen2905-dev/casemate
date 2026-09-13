import { useState } from 'react';
// Import the helper: See docs.md for installation code

function WebSearchApp() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchType, setSearchType] = useState('web');

  const handleSearch = async () => {
    if (!query.trim()) return;

    setLoading(true);
    try {
      const searchResults = await webSearch.search(query, { 
        searchType,
        num: 10 
      });
      setResults(searchResults);
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <div className="flex gap-2 mb-4">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          placeholder="Search the web..."
          className="flex-1 p-2 border rounded"
        />
        <select 
          value={searchType}
          onChange={(e) => setSearchType(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="web">Web</option>
          <option value="news">News</option>
          <option value="images">Images</option>
          <option value="shopping">Shopping</option>
        </select>
        <button
          onClick={handleSearch}
          disabled={loading}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
      </div>

      <div className="space-y-4">
        {results.map((result, i) => (
          <div key={i} className="border-b pb-3">
            <a 
              href={result.link} 
              target="_blank"
              className="text-blue-600 hover:underline font-medium"
            >
              {result.title}
            </a>
            <p className="text-sm text-gray-600">{result.snippet}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WebSearchApp;
