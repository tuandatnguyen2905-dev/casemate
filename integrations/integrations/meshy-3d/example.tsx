import { useEffect, useState } from 'react';

// Load the <model-viewer> web component once (renders .glb in the browser).
// See docs.md for the full endpoint reference.
function useModelViewer() {
  useEffect(() => {
    if (document.querySelector('script[data-model-viewer]')) return;
    const s = document.createElement('script');
    s.type = 'module';
    s.src = 'https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js';
    s.setAttribute('data-model-viewer', 'true');
    document.head.appendChild(s);
  }, []);
}

type ArtStyle = 'realistic' | 'cartoon' | 'low-poly' | 'sculpture' | 'pbr';

function ModelGenerator() {
  useModelViewer();
  const [prompt, setPrompt] = useState('');
  const [artStyle, setArtStyle] = useState<ArtStyle>('realistic');
  const [generating, setGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [glbUrl, setGlbUrl] = useState('');
  const [error, setError] = useState('');

  const generate = async () => {
    setGenerating(true);
    setProgress(0);
    setGlbUrl('');
    setError('');

    try {
      // 1. Kick off a text-to-3D job
      const res = await fetch('/api/generate/3d/text', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, artStyle }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.message || body.error || `Request failed (${res.status})`);
      }

      const { taskId } = await res.json();

      // 2. Poll until completed or failed
      const poll = async () => {
        const statusRes = await fetch(`/api/generate/3d/status/${taskId}`);
        const status = await statusRes.json();
        setProgress(status.progress || 0);

        if (status.status === 'completed') {
          setGlbUrl(status.modelUrls?.glb || '');
          setGenerating(false);
        } else if (status.status === 'failed') {
          setError(status.errorMessage || '3D generation failed');
          setGenerating(false);
        } else {
          setTimeout(poll, 5000);
        }
      };

      poll();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Generation failed');
      setGenerating(false);
    }
  };

  return (
    <div className="p-4 max-w-lg">
      <input
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Describe your 3D model..."
        className="w-full p-2 border rounded mb-2"
      />

      <select
        value={artStyle}
        onChange={(e) => setArtStyle(e.target.value as ArtStyle)}
        className="w-full p-2 border rounded mb-2"
      >
        <option value="realistic">Realistic</option>
        <option value="cartoon">Cartoon</option>
        <option value="low-poly">Low-poly</option>
        <option value="sculpture">Sculpture</option>
        <option value="pbr">PBR</option>
      </select>

      <button
        onClick={generate}
        disabled={generating || !prompt}
        className="px-4 py-2 bg-indigo-600 text-white rounded disabled:opacity-50"
      >
        {generating ? `Generating... ${progress}%` : 'Generate 3D Model'}
      </button>

      {error && <p className="mt-3 text-red-600 text-sm">{error}</p>}

      {glbUrl && (
        // @ts-expect-error — <model-viewer> is a web component, not a JSX intrinsic
        <model-viewer
          src={glbUrl}
          camera-controls
          auto-rotate
          style={{ width: '100%', height: '400px', marginTop: '1rem' }}
        />
      )}
    </div>
  );
}

export default ModelGenerator;
