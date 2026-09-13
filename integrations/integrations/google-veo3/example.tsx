import { useState } from 'react';
// Import the helper: See docs.md for installation code

// Veo 3.1 supports first/last frame (image-to-video) for continuity:
//   imageData      = the FIRST frame (seed) — public URL, data: URL, or base64
//   lastFrameImage = { imageData } = the LAST frame — Veo fills in the motion between them
// To make videos LONGER than ~8s, chain clips (last frame of clip N = first frame
// of clip N+1) or let the server do it via POST /api/veo/generate-long-video.
function VideoGenerator() {
  const [prompt, setPrompt] = useState('');
  const [generating, setGenerating] = useState(false);
  const [videoUrl, setVideoUrl] = useState('');
  const [progress, setProgress] = useState(0);
  // Optional first/last frame seeds (Veo 3.1 only)
  const [firstFrameImage, setFirstFrameImage] = useState('');
  const [lastFrameImage, setLastFrameImage] = useState('');

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
          model: 'veo-3.1-generate-preview',
          aspectRatio: '16:9',
          generateAudio: true,
          // First/last frame (image-to-video). Only sent when provided.
          ...(firstFrameImage.trim() ? { imageData: firstFrameImage.trim() } : {}),
          ...(lastFrameImage.trim() ? { lastFrameImage: { imageData: lastFrameImage.trim() } } : {})
        })
      });
      
      const { operationId } = await response.json();
      
      // Poll for completion
      const pollStatus = async () => {
        const statusResponse = await fetch(`/api/generate/video/status/${operationId}`);
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

  // Automated long video: the server chains clips (last frame of clip N seeds
  // clip N+1) and auto-stitches them into one MP4. Up to 8 clips, each ~8s.
  const generateLongVideo = async (scenes: { prompt: string }[]) => {
    setGenerating(true);
    setProgress(0);
    try {
      const response = await fetch('/api/veo/generate-long-video', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'veo-3.1-generate-preview',
          aspectRatio: '16:9',
          scenes, // [{ prompt }, { prompt }, ...]
          ...(firstFrameImage.trim() ? { startImage: firstFrameImage.trim() } : {})
        })
      });
      const { jobId } = await response.json();

      const pollLong = async () => {
        const statusRes = await fetch(`/api/veo/status-long-video/${jobId}`);
        const status = await statusRes.json();
        setProgress(status.overallProgress || 0);
        if (status.overallStatus === 'completed' || status.overallStatus === 'partial') {
          setVideoUrl(status.stitchedUrl);
          setGenerating(false);
        } else if (status.overallStatus === 'failed') {
          console.error('Long video failed:', status.errorMessage);
          setGenerating(false);
        } else {
          setTimeout(pollLong, 6000);
        }
      };
      pollLong();
    } catch (error) {
      console.error('Long video generation failed:', error);
      setGenerating(false);
    }
  };

  return (
    <div className="p-4 space-y-2">
      <input
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Describe your video..."
        className="w-full p-2 border rounded"
      />
      <input
        value={firstFrameImage}
        onChange={(e) => setFirstFrameImage(e.target.value)}
        placeholder="First frame image URL / base64 (optional)"
        className="w-full p-2 border rounded"
      />
      <input
        value={lastFrameImage}
        onChange={(e) => setLastFrameImage(e.target.value)}
        placeholder="Last frame image URL / base64 (optional)"
        className="w-full p-2 border rounded"
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
