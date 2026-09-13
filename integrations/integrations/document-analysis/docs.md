# Document Analysis Integration (GPT-4 Vision)

Analyze images and PDFs with GPT-4 vision - extract data from invoices, forms, diagrams, and more. Supports native PDF processing (up to 100 pages, 32MB max).

## Category
AI/ML

## Required API Keys
- `OPENAI_API_KEY`

## API Endpoint

**Analyze Document**
```
POST /api/analyze-document
```

**Request:**
```json
{
  "documentUrl": "https://storage.googleapis.com/...",
  "analysisPrompt": "Extract invoice data",
  "documentType": "pdf"
}
```

**Response:**
```json
{
  "success": true,
  "analysis": "{ invoiceNumber: '12345', ... }",
  "documentUrl": "https://storage.googleapis.com/...",
  "documentType": "pdf"
}
```

## PDF Capabilities
- Processes PDFs directly via OpenAI's native support
- Handles up to 100 pages per PDF
- Maximum 32MB file size
- Extracts both text and visual elements (charts, tables, diagrams)
- No page-to-image conversion needed

## Installation

```javascript
export const documentAnalysis = {
  // Step 1: Upload document to get URL
  async uploadDocument(file) {
    const reader = new FileReader();
    const base64Data = await new Promise((resolve) => {
      reader.onload = (e) => resolve(e.target.result);
      reader.readAsDataURL(file);
    });
    
    const response = await fetch('/api/upload/image', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        imageData: base64Data,
        fileName: file.name
      })
    });
    
    const { imageUrl } = await response.json();
    return imageUrl;
  },
  
  // Step 2: Analyze document with custom prompt
  async analyze(documentUrl, analysisPrompt, documentType = 'image') {
    const response = await fetch('/api/analyze-document', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'X-App-Id': window.__APP_ID__
      },
      body: JSON.stringify({
        documentUrl,
        analysisPrompt,
        documentType // 'image' or 'pdf'
      })
    });
    
    const { analysis } = await response.json();
    return analysis;
  }
};
```

## Use Cases
- Invoice extraction
- Receipt scanning
- Form processing
- ID verification
- Document digitization
- Chart/diagram analysis

## Supported Document Types
- Images (JPEG, PNG, GIF, WebP)
- PDFs (up to 100 pages, 32MB)

## Documentation
- [OpenAI Vision Docs](https://platform.openai.com/docs/guides/vision)
