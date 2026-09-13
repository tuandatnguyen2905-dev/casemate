import { useState, useCallback } from 'react';

interface Supplier {
  id: string;
  name: string;
  location: string | null;
  verified: boolean;
  priceRange: string | null;
  moq: number | null;
  leadTimeDays: number | null;
  productUrl: string | null;
  thumbnailUrl: string | null;
  productTitle: string | null;
  rating: number | null;
  yearsActive: number | null;
}

interface SearchFilters {
  verifiedOnly?: boolean;
  minMoq?: number;
  maxMoq?: number;
  country?: string;
}

const alibabaSuppliers = {
  async search(
    query: string,
    options: { pageSize?: number; page?: number; filters?: SearchFilters; workspaceId?: string } = {},
  ): Promise<{ suppliers: Supplier[]; pagination: any }> {
    const response = await fetch('/api/suppliers/search', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, ...options }),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || data.error || 'Supplier search failed');
    }
    return data;
  },
};

function useSupplierSearch(workspaceId?: string) {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState<number | null>(null);

  const search = useCallback(
    async (query: string, filters?: SearchFilters) => {
      if (!query.trim()) return;
      setLoading(true);
      setError(null);
      try {
        const { suppliers, pagination } = await alibabaSuppliers.search(query, {
          pageSize: 20,
          filters,
          workspaceId,
        });
        setSuppliers(suppliers);
        setTotal(pagination?.totalResults ?? null);
      } catch (e: any) {
        setError(e.message);
        setSuppliers([]);
      } finally {
        setLoading(false);
      }
    },
    [workspaceId],
  );

  return { suppliers, loading, error, total, search };
}

function SupplierCard({ supplier }: { supplier: Supplier }) {
  return (
    <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm flex gap-4">
      {supplier.thumbnailUrl ? (
        <img
          src={supplier.thumbnailUrl}
          alt={supplier.productTitle || supplier.name}
          className="w-20 h-20 rounded object-cover flex-shrink-0"
        />
      ) : (
        <div className="w-20 h-20 rounded bg-gray-100 flex items-center justify-center text-gray-400 text-xs flex-shrink-0">
          No image
        </div>
      )}

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold text-gray-900 truncate">{supplier.name}</h3>
          {supplier.verified && (
            <span className="px-2 py-0.5 text-xs rounded bg-green-100 text-green-700 whitespace-nowrap">
              ✓ Verified
            </span>
          )}
        </div>

        {supplier.productTitle && (
          <p className="text-sm text-gray-600 truncate">{supplier.productTitle}</p>
        )}

        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2 text-sm text-gray-500">
          {supplier.location && <span>📍 {supplier.location}</span>}
          {supplier.priceRange && <span className="font-medium text-gray-900">{supplier.priceRange}</span>}
          {supplier.moq != null && <span>MOQ: {supplier.moq.toLocaleString()}</span>}
          {supplier.leadTimeDays != null && <span>Lead: {supplier.leadTimeDays}d</span>}
          {supplier.rating != null && <span>★ {supplier.rating}</span>}
        </div>

        {supplier.productUrl && (
          <a
            href={supplier.productUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-2 text-sm text-blue-600 hover:underline"
          >
            View on Alibaba →
          </a>
        )}
      </div>
    </div>
  );
}

export default function SupplierFinder({ workspaceId }: { workspaceId?: string }) {
  const { suppliers, loading, error, total, search } = useSupplierSearch(workspaceId);
  const [query, setQuery] = useState('');
  const [verifiedOnly, setVerifiedOnly] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    search(query, verifiedOnly ? { verifiedOnly: true } : undefined);
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-1">Find Suppliers</h1>
      <p className="text-sm text-gray-500 mb-6">
        Search Alibaba for manufacturers. Use simple manufacturing terms (e.g. "stainless steel water bottle").
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 mb-4">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="What product do you want to source?"
          className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        <button
          type="submit"
          disabled={loading}
          className="px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 font-medium"
        >
          {loading ? 'Searching…' : 'Search'}
        </button>
      </form>

      <label className="flex items-center gap-2 text-sm text-gray-600 mb-6">
        <input
          type="checkbox"
          checked={verifiedOnly}
          onChange={(e) => setVerifiedOnly(e.target.checked)}
        />
        Verified suppliers only
      </label>

      {error && (
        <div className="p-3 mb-4 bg-red-50 border border-red-200 rounded text-sm text-red-700">
          {error}
        </div>
      )}

      {total != null && !loading && (
        <p className="text-sm text-gray-500 mb-3">
          Showing {suppliers.length} of ~{total.toLocaleString()} results
        </p>
      )}

      <div className="space-y-3">
        {suppliers.map((s) => (
          <SupplierCard key={s.id} supplier={s} />
        ))}
      </div>

      {!loading && !error && suppliers.length === 0 && (
        <div className="text-center py-12 text-gray-400">
          Search for a product to find suppliers.
        </div>
      )}
    </div>
  );
}
