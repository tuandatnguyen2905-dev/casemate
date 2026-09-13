import { useState, useCallback } from 'react';

interface ApolloPerson {
  id: string;
  name: string;
  first_name: string | null;
  last_name: string | null;
  title: string | null;
  headline: string | null;
  email: string | null;
  email_status: string | null;
  linkedin_url: string | null;
  photo_url: string | null;
  city: string | null;
  state: string | null;
  country: string | null;
  organization_name: string | null;
  organization: {
    name: string;
    website_url: string | null;
    industry: string | null;
    estimated_num_employees: number | null;
  } | null;
  seniority: string | null;
}

interface SearchCriteria {
  query?: string;
  personTitles?: string[];
  personLocations?: string[];
  organizationIndustries?: string[];
  personSeniorities?: string[];
  employeeRanges?: string[];
  limit?: number;
  page?: number;
}

interface Lead {
  id: string;
  apolloPersonId: string;
  name: string;
  title: string;
  company: string;
  email?: string;
  emailStatus?: string;
  linkedinUrl?: string;
  photoUrl?: string;
  location?: string;
  status: 'new' | 'contacted' | 'responded' | 'qualified' | 'unqualified';
  notes?: string;
  addedAt: string;
}

const apolloLeads = {
  async search(criteria: SearchCriteria): Promise<{ people: ApolloPerson[]; total: number }> {
    const response = await fetch('/api/leads/search', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(criteria)
    });
    
    if (!response.ok) {
      throw new Error('Search failed');
    }
    
    const data = await response.json();
    return {
      people: data.people || [],
      total: data.pagination?.total_entries || 0
    };
  },

  async enrich(apolloPersonId: string): Promise<{
    photoUrl?: string;
    linkedinUrl?: string;
    email?: string;
    emailStatus?: string;
  }> {
    const response = await fetch('/api/leads/enrich', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ apolloPersonId })
    });
    
    if (!response.ok) {
      throw new Error('Enrichment failed');
    }
    
    return response.json();
  },

  async getLeads(): Promise<Lead[]> {
    try {
      const response = await fetch('/api/space-data/leads.json');
      if (response.ok) {
        return response.json();
      }
    } catch (e) {
      console.warn('No leads found');
    }
    return [];
  },

  async saveLeads(leads: Lead[]): Promise<void> {
    await fetch('/api/space-data/leads.json', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(leads)
    });
  },

  personToLead(person: ApolloPerson): Lead {
    const location = [person.city, person.state, person.country]
      .filter(Boolean)
      .join(', ');

    return {
      id: crypto.randomUUID(),
      apolloPersonId: person.id,
      name: person.name,
      title: person.title || '',
      company: person.organization_name || person.organization?.name || '',
      email: person.email || undefined,
      emailStatus: person.email_status || undefined,
      linkedinUrl: person.linkedin_url || undefined,
      photoUrl: person.photo_url || undefined,
      location: location || undefined,
      status: 'new',
      addedAt: new Date().toISOString()
    };
  }
};

function useApolloLeads() {
  const [people, setPeople] = useState<ApolloPerson[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState(0);

  const search = useCallback(async (criteria: SearchCriteria) => {
    setLoading(true);
    setError(null);
    try {
      const result = await apolloLeads.search(criteria);
      setPeople(result.people);
      setTotal(result.total);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const enrich = useCallback(async (apolloPersonId: string) => {
    try {
      return await apolloLeads.enrich(apolloPersonId);
    } catch (e: any) {
      setError(e.message);
      return null;
    }
  }, []);

  const loadLeads = useCallback(async () => {
    const savedLeads = await apolloLeads.getLeads();
    setLeads(savedLeads);
  }, []);

  const saveLead = useCallback(async (person: ApolloPerson) => {
    const newLead = apolloLeads.personToLead(person);
    const updatedLeads = [...leads, newLead];
    await apolloLeads.saveLeads(updatedLeads);
    setLeads(updatedLeads);
    return newLead;
  }, [leads]);

  const updateLead = useCallback(async (id: string, updates: Partial<Lead>) => {
    const updatedLeads = leads.map(lead =>
      lead.id === id ? { ...lead, ...updates } : lead
    );
    await apolloLeads.saveLeads(updatedLeads);
    setLeads(updatedLeads);
  }, [leads]);

  const removeLead = useCallback(async (id: string) => {
    const updatedLeads = leads.filter(lead => lead.id !== id);
    await apolloLeads.saveLeads(updatedLeads);
    setLeads(updatedLeads);
  }, [leads]);

  return {
    people,
    leads,
    loading,
    error,
    total,
    search,
    enrich,
    loadLeads,
    saveLead,
    updateLead,
    removeLead
  };
}

function LeadSearchForm({ onSearch }: { onSearch: (criteria: SearchCriteria) => void }) {
  const [query, setQuery] = useState('');
  const [titles, setTitles] = useState('');
  const [location, setLocation] = useState('');
  const [seniority, setSeniority] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({
      query: query || undefined,
      personTitles: titles ? titles.split(',').map(t => t.trim()) : undefined,
      personLocations: location ? [location] : undefined,
      personSeniorities: seniority ? [seniority] : undefined,
      limit: 25
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-gray-50 rounded-lg">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Keywords
        </label>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="e.g., AI startups, real estate"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Job Titles (comma-separated)
        </label>
        <input
          type="text"
          value={titles}
          onChange={(e) => setTitles(e.target.value)}
          placeholder="e.g., CEO, VP Marketing, Director"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Location
          </label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="e.g., San Francisco, CA"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Seniority
          </label>
          <select
            value={seniority}
            onChange={(e) => setSeniority(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Any</option>
            <option value="entry">Entry Level</option>
            <option value="senior">Senior</option>
            <option value="manager">Manager</option>
            <option value="director">Director</option>
            <option value="vp">VP</option>
            <option value="c_suite">C-Suite</option>
            <option value="owner">Owner/Founder</option>
          </select>
        </div>
      </div>

      <button
        type="submit"
        className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium"
      >
        Search Leads
      </button>
    </form>
  );
}

function PersonCard({ 
  person, 
  onSave, 
  isSaved 
}: { 
  person: ApolloPerson; 
  onSave: () => void; 
  isSaved: boolean;
}) {
  const location = [person.city, person.state].filter(Boolean).join(', ');

  return (
    <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
      <div className="flex items-start gap-3">
        {person.photo_url ? (
          <img
            src={person.photo_url}
            alt={person.name}
            className="w-12 h-12 rounded-full object-cover"
          />
        ) : (
          <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-medium">
            {person.name?.charAt(0) || '?'}
          </div>
        )}

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-gray-900 truncate">{person.name}</h3>
            {person.linkedin_url && (
              <a
                href={person.linkedin_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
            )}
          </div>
          
          <p className="text-sm text-gray-600 truncate">{person.title}</p>
          <p className="text-sm text-gray-500 truncate">{person.organization_name}</p>
          
          <div className="flex items-center gap-2 mt-2 text-xs text-gray-400">
            {location && <span>{location}</span>}
            {person.email && (
              <span className={`px-2 py-0.5 rounded ${
                person.email_status === 'verified' 
                  ? 'bg-green-100 text-green-700' 
                  : 'bg-yellow-100 text-yellow-700'
              }`}>
                {person.email_status === 'verified' ? 'Verified' : 'Email Available'}
              </span>
            )}
          </div>
        </div>

        <button
          onClick={onSave}
          disabled={isSaved}
          className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
            isSaved
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-green-600 text-white hover:bg-green-700'
          }`}
        >
          {isSaved ? 'Saved' : 'Save'}
        </button>
      </div>
    </div>
  );
}

function LeadCard({ 
  lead, 
  onEnrich,
  onUpdateStatus 
}: { 
  lead: Lead;
  onEnrich: () => void;
  onUpdateStatus: (status: Lead['status']) => void;
}) {
  return (
    <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
      <div className="flex items-start gap-3">
        {lead.photoUrl ? (
          <img
            src={lead.photoUrl}
            alt={lead.name}
            className="w-12 h-12 rounded-full object-cover"
          />
        ) : (
          <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-medium">
            {lead.name?.charAt(0) || '?'}
          </div>
        )}

        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900">{lead.name}</h3>
          <p className="text-sm text-gray-600">{lead.title}</p>
          <p className="text-sm text-gray-500">{lead.company}</p>
          
          {lead.email && (
            <a 
              href={`mailto:${lead.email}`}
              className="text-sm text-blue-600 hover:underline block mt-1"
            >
              {lead.email}
            </a>
          )}

          <div className="flex items-center gap-2 mt-3">
            <select
              value={lead.status}
              onChange={(e) => onUpdateStatus(e.target.value as Lead['status'])}
              className="text-xs px-2 py-1 border border-gray-200 rounded"
            >
              <option value="new">New</option>
              <option value="contacted">Contacted</option>
              <option value="responded">Responded</option>
              <option value="qualified">Qualified</option>
              <option value="unqualified">Not Qualified</option>
            </select>

            {!lead.photoUrl && (
              <button
                onClick={onEnrich}
                className="text-xs px-2 py-1 bg-purple-100 text-purple-700 rounded hover:bg-purple-200"
              >
                Enrich
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function LeadFinderApp() {
  const {
    people,
    leads,
    loading,
    error,
    total,
    search,
    enrich,
    loadLeads,
    saveLead,
    updateLead
  } = useApolloLeads();

  const [activeTab, setActiveTab] = useState<'search' | 'leads'>('search');
  const savedIds = new Set(leads.map(l => l.apolloPersonId));

  const handleEnrichLead = async (lead: Lead) => {
    const enriched = await enrich(lead.apolloPersonId);
    if (enriched) {
      await updateLead(lead.id, {
        photoUrl: enriched.photoUrl,
        linkedinUrl: enriched.linkedinUrl,
        email: enriched.email,
        emailStatus: enriched.emailStatus
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Lead Finder</h1>

      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setActiveTab('search')}
          className={`px-4 py-2 rounded-md font-medium transition-colors ${
            activeTab === 'search'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Search
        </button>
        <button
          onClick={() => { setActiveTab('leads'); loadLeads(); }}
          className={`px-4 py-2 rounded-md font-medium transition-colors ${
            activeTab === 'leads'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          My Leads ({leads.length})
        </button>
      </div>

      {activeTab === 'search' && (
        <>
          <LeadSearchForm onSearch={search} />

          {loading && (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full" />
            </div>
          )}

          {error && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
              {error}
            </div>
          )}

          {!loading && people.length > 0 && (
            <div className="mt-6">
              <p className="text-sm text-gray-500 mb-4">
                Found {total.toLocaleString()} contacts. Showing {people.length}.
              </p>
              <div className="space-y-3">
                {people.map((person) => (
                  <PersonCard
                    key={person.id}
                    person={person}
                    onSave={() => saveLead(person)}
                    isSaved={savedIds.has(person.id)}
                  />
                ))}
              </div>
            </div>
          )}
        </>
      )}

      {activeTab === 'leads' && (
        <div className="space-y-3">
          {leads.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <p>No leads saved yet.</p>
              <p className="text-sm mt-1">Search and save leads to see them here.</p>
            </div>
          ) : (
            leads.map((lead) => (
              <LeadCard
                key={lead.id}
                lead={lead}
                onEnrich={() => handleEnrichLead(lead)}
                onUpdateStatus={(status) => updateLead(lead.id, { status })}
              />
            ))
          )}
        </div>
      )}
    </div>
  );
}

export { useApolloLeads, apolloLeads, LeadSearchForm, PersonCard, LeadCard, LeadFinderApp };
