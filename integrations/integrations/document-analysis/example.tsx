import { useState } from 'react';
// Import the helper: See docs.md for installation code

function InvoiceAnalyzer() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setLoading(true);
    
    try {
      // Upload document (works for both images and PDFs)
      const documentUrl = await documentAnalysis.uploadDocument(file);
      
      // Determine document type
      const documentType = file.type === 'application/pdf' ? 'pdf' : 'image';
      
      // Analyze with custom prompt
      const analysis = await documentAnalysis.analyze(
        documentUrl,
        `Extract the following from this invoice:
        - Invoice number
        - Date
        - Vendor name
        - Line items with quantities and prices
        - Total amount
        Format as JSON.`,
        documentType
      );
      
      // Parse and display results
      const data = JSON.parse(analysis);
      setResult(data);
      
    } catch (error) {
      console.error('Analysis failed:', error);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div>
      <input 
        type="file" 
        accept="image/*,application/pdf"
        onChange={handleFileUpload}
      />
      
      {loading && <p>Analyzing document...</p>}
      
      {result && (
        <div>
          <h3>Invoice #{result.invoiceNumber}</h3>
          <p>Vendor: {result.vendorName}</p>
          <p>Total: ${result.totalAmount}</p>
        </div>
      )}
    </div>
  );
}

export default InvoiceAnalyzer;
