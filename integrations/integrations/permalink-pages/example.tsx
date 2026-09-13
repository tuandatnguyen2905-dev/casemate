import { useState, useEffect } from 'react';

const workspaceId = 'workspace-123';

function PermalinkPagesApp() {
  const [pages, setPages] = useState([]);
  const [slug, setSlug] = useState('');
  const [title, setTitle] = useState('');
  const [htmlContent, setHtmlContent] = useState('<h1>Hello World</h1><p>This is a permalink page.</p>');
  const [isPublic, setIsPublic] = useState(true);

  useEffect(() => {
    loadPages();
  }, []);

  const loadPages = async () => {
    const response = await fetch(`/api/workspaces/${workspaceId}/permalink-pages`);
    const data = await response.json();
    setPages(data);
  };

  const createPage = async () => {
    await fetch(`/api/workspaces/${workspaceId}/permalink-pages`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ slug, title, htmlContent, isPublic }),
    });
    setSlug('');
    setTitle('');
    loadPages();
  };

  const deletePage = async (pageId: string) => {
    await fetch(`/api/workspaces/${workspaceId}/permalink-pages/${pageId}`, {
      method: 'DELETE',
    });
    loadPages();
  };

  return (
    <div className="p-4 space-y-6">
      <div>
        <h2 className="text-lg font-bold mb-2">Create Permalink Page</h2>
        <div className="space-y-2">
          <input
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            placeholder="URL slug (e.g., invoice-001)"
            className="w-full p-2 border rounded"
          />
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Page title"
            className="w-full p-2 border rounded"
          />
          <textarea
            value={htmlContent}
            onChange={(e) => setHtmlContent(e.target.value)}
            placeholder="HTML content..."
            className="w-full p-2 border rounded font-mono text-sm"
            rows={6}
          />
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={isPublic}
              onChange={(e) => setIsPublic(e.target.checked)}
            />
            Public (no token required)
          </label>
          <button onClick={createPage} className="px-4 py-2 bg-blue-600 text-white rounded">
            Create Page
          </button>
        </div>
      </div>

      <div>
        <h2 className="text-lg font-bold mb-2">Pages</h2>
        {pages.map((page: any) => (
          <div key={page.id} className="border p-3 rounded mb-2">
            <div className="flex items-center justify-between">
              <div>
                <span className="font-bold">{page.title}</span>
                <span className="ml-2 text-sm text-gray-500">/{page.slug}</span>
              </div>
              <div className="flex gap-2">
                <a
                  href={`/p/${workspaceId}/${page.slug}`}
                  target="_blank"
                  className="px-3 py-1 bg-green-600 text-white rounded text-sm"
                >
                  View
                </a>
                <button
                  onClick={() => deletePage(page.id)}
                  className="px-3 py-1 bg-red-600 text-white rounded text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PermalinkPagesApp;
