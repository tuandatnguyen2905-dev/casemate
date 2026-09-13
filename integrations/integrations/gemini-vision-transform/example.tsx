import { useState } from 'react';

const geminiVision = {
  async analyzeImage(imageBase64: string, prompt: string, mimeType = 'image/jpeg') {
    const response = await fetch('/api/generate/vision', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt, image: imageBase64, mimeType })
    });
    const data = await response.json();
    if (!data.success) throw new Error(data.error);
    return data.result;
  },
  
  async transformImage(imageBase64: string, prompt: string, style: string, mimeType = 'image/jpeg', returnBase64 = false) {
    const response = await fetch('/api/generate/image-to-image', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt, image: imageBase64, mimeType, style, returnBase64 })
    });
    const data = await response.json();
    if (!data.success) throw new Error(data.error);
    return returnBase64 ? { imageBase64: data.imageBase64, mimeType: data.mimeType } : data.imageUrl;
  },
  
  async transformMultiImage(images: Array<{ data: string; mimeType?: string }>, prompt: string, returnBase64 = false) {
    const response = await fetch('/api/generate/image-to-image', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt, images, returnBase64 })
    });
    const data = await response.json();
    if (!data.success) throw new Error(data.error);
    return returnBase64 ? { imageBase64: data.imageBase64, mimeType: data.mimeType } : data.imageUrl;
  },
  
  async addLogo(mainImageBase64: string, logoBase64: string, position = 'bottom-right', mainMimeType = 'image/jpeg', logoMimeType = 'image/png') {
    return this.transformMultiImage(
      [
        { data: mainImageBase64, mimeType: mainMimeType },
        { data: logoBase64, mimeType: logoMimeType }
      ],
      `Add the logo from the second image to the ${position} corner of the first image. Make it look natural and professional, with appropriate sizing and blending.`
    );
  },
  
  async toLineArt(imageBase64: string, mimeType = 'image/jpeg') {
    return this.transformImage(
      imageBase64,
      'Create clean, minimalist line art from this image. Black lines on white background.',
      'clean line art, professional illustration, black outlines only',
      mimeType
    );
  },
  
  async fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const base64 = (reader.result as string).split(',')[1];
        resolve(base64);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }
};

export default function ImageTransformDemo() {
  const [mode, setMode] = useState<'single' | 'multi'>('single');
  const [mainImage, setMainImage] = useState<{ preview: string; base64: string; type: string } | null>(null);
  const [logoImage, setLogoImage] = useState<{ preview: string; base64: string; type: string } | null>(null);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [prompt, setPrompt] = useState('');

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, target: 'main' | 'logo') => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const base64 = await geminiVision.fileToBase64(file);
    const imageData = {
      preview: URL.createObjectURL(file),
      base64,
      type: file.type
    };
    
    if (target === 'main') {
      setMainImage(imageData);
    } else {
      setLogoImage(imageData);
    }
    setResultUrl(null);
  };

  const handleTransform = async () => {
    if (!mainImage) return;
    
    setLoading(true);
    setError('');
    setResultUrl(null);
    
    try {
      let result: string;
      
      if (mode === 'multi' && logoImage) {
        result = await geminiVision.transformMultiImage(
          [
            { data: mainImage.base64, mimeType: mainImage.type },
            { data: logoImage.base64, mimeType: logoImage.type }
          ],
          prompt || 'Add the logo from the second image to the bottom-right corner of the first image naturally'
        ) as string;
      } else {
        result = await geminiVision.transformImage(
          mainImage.base64,
          prompt || 'Transform this image into clean line art',
          'clean, professional',
          mainImage.type
        ) as string;
      }
      
      setResultUrl(result);
    } catch (err) {
      console.error('Transform failed:', err);
      setError(err instanceof Error ? err.message : 'Transform failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Image Transform Demo</h2>
      
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setMode('single')}
          className={`px-4 py-2 rounded ${mode === 'single' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
        >
          Single Image
        </button>
        <button
          onClick={() => setMode('multi')}
          className={`px-4 py-2 rounded ${mode === 'multi' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
        >
          Multi-Image (Logo)
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block font-medium mb-2">Main Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleFileUpload(e, 'main')}
            className="block w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-blue-50 file:text-blue-700"
          />
          {mainImage && <img src={mainImage.preview} alt="Main" className="mt-2 max-h-48 rounded" />}
        </div>
        
        {mode === 'multi' && (
          <div>
            <label className="block font-medium mb-2">Logo/Reference Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileUpload(e, 'logo')}
              className="block w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-blue-50 file:text-blue-700"
            />
            {logoImage && <img src={logoImage.preview} alt="Logo" className="mt-2 max-h-48 rounded" />}
          </div>
        )}
      </div>
      
      <div className="mb-4">
        <label className="block font-medium mb-2">Prompt</label>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder={mode === 'multi' 
            ? 'Add the logo from the second image to the bottom-right corner of the first image naturally'
            : 'Transform this image into clean line art'
          }
          className="w-full p-3 border rounded-lg"
          rows={3}
        />
      </div>
      
      <button
        onClick={handleTransform}
        disabled={!mainImage || loading || (mode === 'multi' && !logoImage)}
        className="w-full py-3 bg-blue-600 text-white rounded-lg disabled:opacity-50"
      >
        {loading ? 'Processing...' : 'Transform Image'}
      </button>
      
      {error && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 text-red-700 rounded">
          {error}
        </div>
      )}
      
      {resultUrl && (
        <div className="mt-6">
          <h3 className="font-semibold mb-2">Result</h3>
          <img src={resultUrl} alt="Result" className="max-w-full rounded-lg shadow-md" />
          <a href={resultUrl} download className="inline-block mt-2 text-blue-600 hover:underline">
            Download
          </a>
        </div>
      )}
    </div>
  );
}
