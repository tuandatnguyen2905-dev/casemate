import { useState, useRef } from 'react';

const geminiVideo = {
  async analyzeVideoFile(file: File, prompt: string) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('prompt', prompt);
    
    const response = await fetch('/api/generate/video-analysis', {
      method: 'POST',
      body: formData
    });
    
    const data = await response.json();
    if (!data.success) throw new Error(data.error);
    return data.result;
  },
  
  async analyzeYouTube(youtubeUrl: string, prompt: string) {
    const response = await fetch('/api/generate/video-youtube', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt, youtubeUrl })
    });
    
    const data = await response.json();
    if (!data.success) throw new Error(data.error);
    return data.result;
  }
};

export default function VideoAnalyzer() {
  const [mode, setMode] = useState<'upload' | 'youtube'>('upload');
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setVideoFile(file);
      setVideoPreview(URL.createObjectURL(file));
      setError('');
      setResult('');
    }
  };

  const handleAnalyze = async () => {
    if (mode === 'upload' && !videoFile) {
      setError('Please select a video file');
      return;
    }
    if (mode === 'youtube' && !youtubeUrl) {
      setError('Please enter a YouTube URL');
      return;
    }
    if (!prompt) {
      setError('Please enter a prompt');
      return;
    }

    setLoading(true);
    setError('');
    setResult('');

    try {
      let analysis: string;
      
      if (mode === 'upload' && videoFile) {
        analysis = await geminiVideo.analyzeVideoFile(videoFile, prompt);
      } else {
        analysis = await geminiVideo.analyzeYouTube(youtubeUrl, prompt);
      }
      
      setResult(analysis);
    } catch (err) {
      console.error('Analysis failed:', err);
      setError(err instanceof Error ? err.message : 'Analysis failed');
    } finally {
      setLoading(false);
    }
  };

  const quickPrompts = [
    { label: 'Summarize', prompt: 'Provide a comprehensive summary of this video including main topics and key points.' },
    { label: 'Timestamps', prompt: 'List all key moments with their timestamps in format [MM:SS] - Description' },
    { label: 'Quiz', prompt: 'Create a 5-question quiz based on the content of this video with answers.' },
    { label: 'Transcribe', prompt: 'Transcribe the spoken content in this video as accurately as possible.' },
  ];

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-2">Video Analyzer</h2>
      <p className="text-gray-600 mb-6">
        Analyze videos using Gemini AI - summarize, ask questions, extract timestamps, and more.
      </p>

      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setMode('upload')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            mode === 'upload'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Upload Video
        </button>
        <button
          onClick={() => setMode('youtube')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            mode === 'youtube'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          YouTube URL
        </button>
      </div>

      {mode === 'upload' ? (
        <div className="mb-6">
          <input
            ref={fileInputRef}
            type="file"
            accept="video/*"
            onChange={handleFileSelect}
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="w-full p-8 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors"
          >
            {videoFile ? (
              <div className="text-center">
                <p className="font-medium text-gray-900">{videoFile.name}</p>
                <p className="text-sm text-gray-500">
                  {(videoFile.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            ) : (
              <div className="text-center text-gray-500">
                <p className="font-medium">Click to upload a video</p>
                <p className="text-sm">MP4, WebM, MOV up to 2GB</p>
              </div>
            )}
          </button>
          
          {videoPreview && (
            <video
              src={videoPreview}
              controls
              className="mt-4 w-full rounded-lg shadow-md"
              style={{ maxHeight: '300px' }}
            />
          )}
        </div>
      ) : (
        <div className="mb-6">
          <input
            type="text"
            value={youtubeUrl}
            onChange={(e) => setYoutubeUrl(e.target.value)}
            placeholder="https://www.youtube.com/watch?v=..."
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      )}

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Quick Prompts
        </label>
        <div className="flex flex-wrap gap-2">
          {quickPrompts.map((qp) => (
            <button
              key={qp.label}
              onClick={() => setPrompt(qp.prompt)}
              className="px-3 py-1.5 text-sm bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
            >
              {qp.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Your Question or Prompt
        </label>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="What would you like to know about this video?"
          rows={3}
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <button
        onClick={handleAnalyze}
        disabled={loading}
        className="w-full py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
            </svg>
            Analyzing Video...
          </span>
        ) : (
          'Analyze Video'
        )}
      </button>

      {error && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      {result && (
        <div className="mt-6">
          <h3 className="font-semibold text-lg mb-2">Analysis Result</h3>
          <div className="p-4 bg-gray-50 rounded-lg whitespace-pre-wrap">
            {result}
          </div>
        </div>
      )}
    </div>
  );
}
