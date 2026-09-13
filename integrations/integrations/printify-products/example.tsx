import { useState, useEffect, useMemo } from 'react';

interface Shop {
  id: number;
  title: string;
}

interface Blueprint {
  id: number;
  title: string;
  brand: string;
  images: string[];
}

interface Provider {
  id: number;
  title: string;
  location: { country: string };
}

interface Variant {
  id: number;
  title: string;
  options: { color: string; size: string };
  placeholders?: Array<{ position: string; width: number; height: number }>;
  cost?: number;
  price?: number;
  is_available?: boolean;
}

interface UploadedImage {
  id: string;
  preview_url: string;
}

interface PositionSettings {
  scale: number;
  x: number;
  y: number;
}

type Step = 'catalog' | 'customize' | 'variants' | 'preview';

export default function PrintifyProductCreator() {
  const [shops, setShops] = useState<Shop[]>([]);
  const [selectedShop, setSelectedShop] = useState<number | null>(null);
  const [blueprints, setBlueprints] = useState<Blueprint[]>([]);
  const [selectedBlueprint, setSelectedBlueprint] = useState<Blueprint | null>(null);
  const [providers, setProviders] = useState<Provider[]>([]);
  const [selectedProvider, setSelectedProvider] = useState<Provider | null>(null);
  const [variants, setVariants] = useState<Variant[]>([]);
  const [selectedVariants, setSelectedVariants] = useState<number[]>([]);
  const [uploadedImage, setUploadedImage] = useState<UploadedImage | null>(null);
  const [mockupImage, setMockupImage] = useState<string | null>(null);
  const [productTitle, setProductTitle] = useState('');
  const [price, setPrice] = useState(2499);
  const [loading, setLoading] = useState(false);
  const [isGeneratingMockup, setIsGeneratingMockup] = useState(false);
  const [step, setStep] = useState<Step>('catalog');
  const [selectedPrintPosition, setSelectedPrintPosition] = useState('front');
  const [selectedPreviewColor, setSelectedPreviewColor] = useState<string | null>(null);
  const [positionSettings, setPositionSettings] = useState<Record<string, PositionSettings>>({
    front: { scale: 1.0, x: 0.5, y: 0.5 },
    back: { scale: 1.0, x: 0.5, y: 0.5 },
    sleeve_left: { scale: 0.5, x: 0.5, y: 0.5 },
    sleeve_right: { scale: 0.5, x: 0.5, y: 0.5 },
  });

  const currentSettings = positionSettings[selectedPrintPosition] || { scale: 1.0, x: 0.5, y: 0.5 };

  useEffect(() => {
    loadShops();
    loadCatalog();
  }, []);

  async function loadShops() {
    try {
      const res = await fetch('/api/printify/shops');
      const data = await res.json();
      setShops(data);
      if (data.length > 0) setSelectedShop(data[0].id);
    } catch (err) {
      console.error('Failed to load shops:', err);
    }
  }

  async function loadCatalog() {
    try {
      const res = await fetch('/api/printify/catalog/blueprints');
      const data = await res.json();
      setBlueprints(data.slice(0, 20));
    } catch (err) {
      console.error('Failed to load catalog:', err);
    }
  }

  async function selectBlueprint(blueprint: Blueprint) {
    setSelectedBlueprint(blueprint);
    setSelectedProvider(null);
    setVariants([]);
    setMockupImage(null);
    setUploadedImage(null);
    setLoading(true);
    
    try {
      const providersRes = await fetch(`/api/printify/catalog/blueprints/${blueprint.id}/providers`);
      const providersData = await providersRes.json();
      setProviders(providersData);
      
      if (providersData.length > 0) {
        const provider = providersData[0];
        setSelectedProvider(provider);
        
        const variantsRes = await fetch(
          `/api/printify/catalog/blueprints/${blueprint.id}/providers/${provider.id}/variants`
        );
        const variantsData = await variantsRes.json();
        setVariants(variantsData.variants?.filter((v: Variant) => v.is_available) || []);
      }
      setStep('customize');
    } catch (err) {
      console.error('Failed to load variants:', err);
    } finally {
      setLoading(false);
    }
  }

  const availablePrintPositions = useMemo(() => {
    if (!variants.length) return ['front'];
    const positions = new Set<string>();
    variants.forEach(v => {
      v.placeholders?.forEach(p => positions.add(p.position));
    });
    return positions.size > 0 ? Array.from(positions) : ['front'];
  }, [variants]);

  const availableColors = useMemo(() => {
    if (!variants.length) return [];
    const colorMap = new Map<string, number>();
    variants.forEach(v => {
      if (v.options?.color && !colorMap.has(v.options.color)) {
        colorMap.set(v.options.color, v.id);
      }
    });
    return Array.from(colorMap.entries()).map(([color, variantId]) => ({ color, variantId }));
  }, [variants]);

  function getVariantIdForColor(color: string | null): number {
    if (!color || !variants.length) return variants[0]?.id || 0;
    const variant = variants.find(v => v.options?.color === color);
    return variant?.id || variants[0]?.id || 0;
  }

  async function generateMockup(imageId: string, variantId: number, position: string) {
    if (!selectedBlueprint || !selectedProvider || !selectedShop) {
      throw new Error('Missing required data for mockup generation');
    }

    const settings = positionSettings[position] || { scale: 1.0, x: 0.5, y: 0.5 };
    const variant = variants.find(v => v.id === variantId);
    const variantPrice = variant?.price || 2499;

    const productData = {
      title: `Preview - ${selectedBlueprint.title}`,
      description: 'Preview product for mockup generation',
      blueprint_id: selectedBlueprint.id,
      print_provider_id: selectedProvider.id,
      variants: [{ id: variantId, price: variantPrice, is_enabled: true }],
      print_areas: [{
        variant_ids: [variantId],
        placeholders: [{
          position: position,
          images: [{
            id: imageId,
            x: settings.x,
            y: settings.y,
            scale: settings.scale,
            angle: 0
          }]
        }]
      }]
    };

    const res = await fetch(`/api/printify/shops/${selectedShop}/products`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(productData)
    });
    
    if (!res.ok) throw new Error('Failed to create preview product');
    const product = await res.json();
    
    return {
      productId: product.id,
      mockupUrl: product.images?.[0]?.src || null,
      allImages: product.images || []
    };
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    setIsGeneratingMockup(true);
    
    try {
      const base64 = await fileToBase64(file);
      
      const res = await fetch('/api/printify/uploads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageData: base64, fileName: file.name })
      });
      
      if (!res.ok) throw new Error('Failed to upload design');
      const uploadData = await res.json();
      setUploadedImage(uploadData);

      if (selectedShop && selectedBlueprint && selectedProvider && variants.length > 0) {
        const variantId = getVariantIdForColor(selectedPreviewColor);
        const mockup = await generateMockup(uploadData.id, variantId, selectedPrintPosition);
        setMockupImage(mockup.mockupUrl);
      }
      
      setStep('variants');
    } catch (err) {
      console.error('Upload failed:', err);
    } finally {
      setLoading(false);
      setIsGeneratingMockup(false);
    }
  }

  async function handleColorChange(color: string) {
    setSelectedPreviewColor(color);
    
    if (uploadedImage && selectedShop && selectedBlueprint && selectedProvider) {
      setIsGeneratingMockup(true);
      try {
        const variantId = getVariantIdForColor(color);
        const mockup = await generateMockup(uploadedImage.id, variantId, selectedPrintPosition);
        setMockupImage(mockup.mockupUrl);
      } catch (err) {
        console.error('Failed to regenerate mockup:', err);
      } finally {
        setIsGeneratingMockup(false);
      }
    }
  }

  async function handlePositionChange(position: string) {
    setSelectedPrintPosition(position);
    
    if (uploadedImage && selectedShop && selectedBlueprint && selectedProvider) {
      setIsGeneratingMockup(true);
      try {
        const variantId = getVariantIdForColor(selectedPreviewColor);
        const mockup = await generateMockup(uploadedImage.id, variantId, position);
        setMockupImage(mockup.mockupUrl);
      } catch (err) {
        console.error('Failed to regenerate mockup:', err);
      } finally {
        setIsGeneratingMockup(false);
      }
    }
  }

  async function handleScaleChange(scale: number) {
    setPositionSettings(prev => ({
      ...prev,
      [selectedPrintPosition]: { ...prev[selectedPrintPosition], scale }
    }));
    
    if (uploadedImage && selectedShop && selectedBlueprint && selectedProvider) {
      setIsGeneratingMockup(true);
      try {
        const variantId = getVariantIdForColor(selectedPreviewColor);
        const mockup = await generateMockup(uploadedImage.id, variantId, selectedPrintPosition);
        setMockupImage(mockup.mockupUrl);
      } catch (err) {
        console.error('Failed to regenerate mockup:', err);
      } finally {
        setIsGeneratingMockup(false);
      }
    }
  }

  async function createProduct() {
    if (!selectedShop || !selectedBlueprint || !selectedProvider || !uploadedImage || selectedVariants.length === 0) {
      alert('Please complete all steps');
      return;
    }

    setLoading(true);
    try {
      const productData = {
        title: productTitle || `Custom ${selectedBlueprint.title}`,
        description: `High-quality ${selectedBlueprint.title} with custom design`,
        blueprint_id: selectedBlueprint.id,
        print_provider_id: selectedProvider.id,
        variants: selectedVariants.map(id => {
          const v = variants.find(variant => variant.id === id);
          return { id, price: v?.price || price, is_enabled: true };
        }),
        print_areas: [{
          variant_ids: selectedVariants,
          placeholders: [{
            position: selectedPrintPosition,
            images: [{ 
              id: uploadedImage.id, 
              x: currentSettings.x, 
              y: currentSettings.y, 
              scale: currentSettings.scale, 
              angle: 0 
            }]
          }]
        }]
      };

      const res = await fetch(`/api/printify/shops/${selectedShop}/products`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData)
      });
      
      const product = await res.json();
      
      await fetch(`/api/printify/shops/${selectedShop}/products/${product.id}/publish`, {
        method: 'POST'
      });

      alert(`Product "${productTitle || selectedBlueprint.title}" created and published!`);
      setStep('preview');
    } catch (err) {
      console.error('Failed to create product:', err);
      alert('Failed to create product');
    } finally {
      setLoading(false);
    }
  }

  function fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  function toggleVariant(variantId: number) {
    setSelectedVariants(prev => 
      prev.includes(variantId) 
        ? prev.filter(id => id !== variantId)
        : [...prev, variantId]
    );
  }

  function resetFlow() {
    setStep('catalog');
    setSelectedBlueprint(null);
    setSelectedProvider(null);
    setVariants([]);
    setSelectedVariants([]);
    setUploadedImage(null);
    setMockupImage(null);
    setProductTitle('');
    setSelectedPreviewColor(null);
    setSelectedPrintPosition('front');
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Create Print-on-Demand Product</h1>
      
      <div className="flex gap-4 mb-6">
        {['catalog', 'customize', 'variants', 'preview'].map((s, i) => (
          <div key={s} className={`w-8 h-8 rounded-full flex items-center justify-center ${
            step === s || ['catalog', 'customize', 'variants', 'preview'].indexOf(step) > i 
              ? 'bg-blue-500 text-white' 
              : 'bg-gray-200'
          }`}>
            {i + 1}
          </div>
        ))}
      </div>

      {step === 'catalog' && (
        <div>
          <h2 className="text-lg font-semibold mb-4">Step 1: Select Product Type</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {blueprints.map(bp => (
              <div 
                key={bp.id}
                onClick={() => selectBlueprint(bp)}
                className="border rounded-lg p-4 cursor-pointer hover:border-blue-500 transition"
                data-testid={`blueprint-${bp.id}`}
              >
                {bp.images[0] && <img src={bp.images[0]} alt={bp.title} className="w-full h-32 object-contain mb-2" />}
                <p className="text-sm font-medium">{bp.title}</p>
                <p className="text-xs text-gray-500">{bp.brand}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {step === 'customize' && selectedBlueprint && (
        <div>
          <h2 className="text-lg font-semibold mb-4">Step 2: Upload Your Design</h2>
          
          <div className="flex gap-6">
            <div className="flex-1">
              <div className="relative w-full max-w-[300px] mx-auto">
                {isGeneratingMockup ? (
                  <div className="aspect-square rounded-lg bg-gray-100 flex flex-col items-center justify-center">
                    <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-3" />
                    <p className="text-sm text-gray-600">Generating mockup...</p>
                  </div>
                ) : mockupImage ? (
                  <img src={mockupImage} alt="Product mockup" className="w-full rounded-lg shadow-lg" />
                ) : selectedBlueprint.images[0] ? (
                  <img src={selectedBlueprint.images[0]} alt={selectedBlueprint.title} className="w-full rounded-lg" />
                ) : (
                  <div className="aspect-square rounded-lg bg-gray-100 flex items-center justify-center">
                    <span className="text-6xl">👕</span>
                  </div>
                )}
                {mockupImage && (
                  <p className="text-xs text-green-600 text-center mt-2">Real mockup preview</p>
                )}
              </div>
            </div>

            <div className="w-64 space-y-4">
              {availableColors.length > 1 && (
                <div>
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">Product Color</p>
                  <div className="flex flex-wrap gap-2">
                    {availableColors.slice(0, 8).map(({ color, variantId }) => (
                      <button
                        key={variantId}
                        onClick={() => handleColorChange(color)}
                        className={`px-3 py-1.5 text-xs rounded-full border transition-colors ${
                          selectedPreviewColor === color
                            ? 'bg-blue-500 text-white border-blue-500'
                            : 'bg-white text-gray-700 border-gray-300 hover:border-blue-300'
                        }`}
                        data-testid={`color-${color.toLowerCase().replace(/\s+/g, '-')}`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {availablePrintPositions.length > 1 && (
                <div>
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">Print Position</p>
                  <div className="flex flex-wrap gap-2">
                    {availablePrintPositions.map(position => (
                      <button
                        key={position}
                        onClick={() => handlePositionChange(position)}
                        className={`px-3 py-1.5 text-xs rounded-full border transition-colors capitalize ${
                          selectedPrintPosition === position
                            ? 'bg-blue-500 text-white border-blue-500'
                            : 'bg-white text-gray-700 border-gray-300 hover:border-blue-300'
                        }`}
                        data-testid={`position-${position}`}
                      >
                        {position.replace(/_/g, ' ')}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">Design Scale</p>
                <input
                  type="range"
                  min="0.3"
                  max="1.5"
                  step="0.1"
                  value={currentSettings.scale}
                  onChange={e => handleScaleChange(parseFloat(e.target.value))}
                  className="w-full"
                  data-testid="scale-slider"
                />
                <p className="text-xs text-gray-500 text-center">{(currentSettings.scale * 100).toFixed(0)}%</p>
              </div>

              <div>
                <p className="text-sm text-gray-600 mb-2">Upload a high-resolution PNG image (4500x5400px recommended)</p>
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={handleImageUpload}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-blue-500 file:text-white file:cursor-pointer"
                  data-testid="design-upload"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {step === 'variants' && (
        <div>
          <h2 className="text-lg font-semibold mb-4">Step 3: Select Variants & Set Price</h2>
          
          <div className="flex gap-6">
            <div className="flex-1">
              {mockupImage && (
                <img src={mockupImage} alt="Product mockup" className="w-48 rounded-lg shadow-lg mb-4" />
              )}
            </div>

            <div className="flex-1 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Product Title</label>
                <input 
                  type="text"
                  value={productTitle}
                  onChange={e => setProductTitle(e.target.value)}
                  placeholder={`Custom ${selectedBlueprint?.title}`}
                  className="w-full px-3 py-2 border rounded"
                  data-testid="product-title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Price (cents)</label>
                <input 
                  type="number"
                  value={price}
                  onChange={e => setPrice(Number(e.target.value))}
                  className="w-32 px-3 py-2 border rounded"
                  data-testid="product-price"
                />
                <span className="ml-2 text-gray-500">${(price / 100).toFixed(2)}</span>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Select Sizes/Colors</label>
                <div className="flex flex-wrap gap-2 max-h-40 overflow-auto">
                  {variants.slice(0, 30).map(v => (
                    <button
                      key={v.id}
                      onClick={() => toggleVariant(v.id)}
                      className={`px-3 py-1 rounded border text-sm ${
                        selectedVariants.includes(v.id) ? 'bg-blue-500 text-white' : 'bg-white'
                      }`}
                      data-testid={`variant-${v.id}`}
                    >
                      {v.options.color} / {v.options.size}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={createProduct}
                disabled={selectedVariants.length === 0 || loading}
                className="px-6 py-2 bg-green-500 text-white rounded disabled:opacity-50"
                data-testid="create-product"
              >
                {loading ? 'Creating...' : 'Create & Publish Product'}
              </button>
            </div>
          </div>
        </div>
      )}

      {step === 'preview' && (
        <div className="text-center py-10">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
            <span className="text-4xl">✓</span>
          </div>
          <h2 className="text-xl font-semibold mb-2">Product Created!</h2>
          <p className="text-gray-600 mb-6">Your product has been published to your Printify shop.</p>
          <button
            onClick={resetFlow}
            className="px-6 py-2 bg-blue-500 text-white rounded"
            data-testid="create-another"
          >
            Create Another Product
          </button>
        </div>
      )}

      {loading && step !== 'preview' && (
        <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            <p>Processing...</p>
          </div>
        </div>
      )}
    </div>
  );
}
