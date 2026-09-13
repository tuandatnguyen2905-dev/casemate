import { useState } from 'react';
// Import the helper: See docs.md for installation code

function ImageUploader() {
  const [uploadedUrl, setUploadedUrl] = useState('');
  const [uploading, setUploading] = useState(false);

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const imageUrl = await fileStorage.uploadImage(file);
      setUploadedUrl(imageUrl);
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="p-4">
      <input
        type="file"
        accept="image/*"
        onChange={handleFileUpload}
        className="mb-4"
      />

      {uploading && <p>Uploading...</p>}

      {uploadedUrl && (
        <div className="mt-4">
          <img src={uploadedUrl} alt="Uploaded" className="max-w-md rounded" />
          <p className="text-sm mt-2 text-gray-600">
            Stored in GCS: {uploadedUrl}
          </p>
        </div>
      )}
    </div>
  );
}

export default ImageUploader;
