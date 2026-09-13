import React, { useState, useEffect, useRef } from 'react';

const WORKSPACE_ID = (window as any).__WORKSPACE_ID__ || 'demo';

interface Voice {
  id: string;
  name: string;
  category: string;
  labels: Record<string, string>;
  previewUrl?: string;
}

export default function ElevenLabsAudioDemo() {
  const [voices, setVoices] = useState<Voice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState('EXAVITQu4vr4xnSDxMaL');
  const [text, setText] = useState('Welcome to our app! Here is how to get started.');
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [musicUrl, setMusicUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [musicLoading, setMusicLoading] = useState(false);
  const [musicPreset, setMusicPreset] = useState('calm');
  const audioRef = useRef<HTMLAudioElement>(null);
  const musicRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    fetch('/voiceover/voices')
      .then(r => r.json())
      .then(data => { if (data.voices) setVoices(data.voices); })
      .catch(console.error);
  }, []);

  const generateSpeech = async () => {
    if (!text.trim()) return;
    setLoading(true);
    setAudioUrl(null);
    try {
      const response = await fetch(`/api/workspaces/${WORKSPACE_ID}/demo-video/voiceover`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ script: text, voiceId: selectedVoice }),
      });
      const data = await response.json();
      if (data.audioUrl) {
        setAudioUrl(data.audioUrl);
      }
    } catch (err) {
      console.error('TTS generation failed:', err);
    } finally {
      setLoading(false);
    }
  };

  const generateMusic = async () => {
    setMusicLoading(true);
    setMusicUrl(null);
    try {
      const response = await fetch(`/api/workspaces/${WORKSPACE_ID}/demo-video/music/preset`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ preset: musicPreset, lengthMs: 30000 }),
      });
      const data = await response.json();
      if (data.audioUrl) {
        setMusicUrl(data.audioUrl);
      }
    } catch (err) {
      console.error('Music generation failed:', err);
    } finally {
      setMusicLoading(false);
    }
  };

  const presets = ['corporate', 'tech', 'uplifting', 'calm', 'energetic', 'playful', 'cinematic', 'lofi'];

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-8">
      <div>
        <h2 className="text-xl font-bold mb-4">Text-to-Speech</h2>
        <textarea
          value={text}
          onChange={e => setText(e.target.value)}
          className="w-full p-3 border rounded-lg resize-none"
          rows={3}
          placeholder="Enter text to convert to speech..."
        />
        <div className="flex gap-3 mt-3 items-center">
          <select
            value={selectedVoice}
            onChange={e => setSelectedVoice(e.target.value)}
            className="p-2 border rounded"
          >
            {voices.length > 0
              ? voices.map(v => <option key={v.id} value={v.id}>{v.name} ({v.labels?.gender})</option>)
              : <option value="EXAVITQu4vr4xnSDxMaL">Sarah (default)</option>}
          </select>
          <button
            onClick={generateSpeech}
            disabled={loading || !text.trim()}
            className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
          >
            {loading ? 'Generating...' : 'Generate Speech'}
          </button>
        </div>
        {audioUrl && (
          <audio ref={audioRef} controls src={audioUrl} className="w-full mt-3" />
        )}
      </div>

      <hr />

      <div>
        <h2 className="text-xl font-bold mb-4">Music Generation</h2>
        <div className="flex flex-wrap gap-2 mb-3">
          {presets.map(p => (
            <button
              key={p}
              onClick={() => setMusicPreset(p)}
              className={`px-3 py-1 rounded-full text-sm border ${musicPreset === p ? 'bg-blue-600 text-white border-blue-600' : 'border-gray-300'}`}
            >
              {p}
            </button>
          ))}
        </div>
        <button
          onClick={generateMusic}
          disabled={musicLoading}
          className="px-4 py-2 bg-green-600 text-white rounded disabled:opacity-50"
        >
          {musicLoading ? 'Generating (~15s)...' : `Generate ${musicPreset} music`}
        </button>
        {musicUrl && (
          <audio ref={musicRef} controls src={musicUrl} className="w-full mt-3" />
        )}
      </div>
    </div>
  );
}
