import { useState } from 'react';
// Import the helper: See docs.md for installation code

function VideoGenerator() {
  const [prompt, setPrompt] = useState('');
  const [generating, setGenerating] = useState(false);
  const [videoUrl, setVideoUrl] = useState('');
  const [progress, setProgress] = useState(0);

  const generateVideo = async () => {
    setGenerating(true);
    setProgress(0);
    
    try {
      // Start video generation
      const response = await fetch('/api/generate/video', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: prompt,
          aspectRatio: '16:9',
          generateAudio: true
        })
      });
      
      const { operationId } = await response.json();
      
      // Poll for completion
      const pollStatus = async () => {
        const statusResponse = await fetch(`/api/veo/status/${operationId}`);
        const status = await statusResponse.json();
        
        setProgress(status.progress || 0);
        
        if (status.status === 'completed') {
          setVideoUrl(status.videoUrl);
          setGenerating(false);
        } else if (status.status === 'failed') {
          console.error('Video generation failed:', status.errorMessage);
          setGenerating(false);
        } else {
          setTimeout(pollStatus, 5000);
        }
      };
      
      pollStatus();
    } catch (error) {
      console.error('Video generation failed:', error);
      setGenerating(false);
    }
  };

  return (
    <div className="p-4">
      <input
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Describe your video..."
        className="w-full p-2 border rounded mb-2"
      />
      <button
        onClick={generateVideo}
        disabled={generating || !prompt}
        className="px-4 py-2 bg-purple-600 text-white rounded disabled:opacity-50"
      >
        {generating ? `Generating... ${progress}%` : 'Generate Video'}
      </button>
      
      {videoUrl && (
        <video src={videoUrl} controls className="mt-4 w-full rounded" />
      )}
    </div>
  );
}

export default VideoGenerator;
