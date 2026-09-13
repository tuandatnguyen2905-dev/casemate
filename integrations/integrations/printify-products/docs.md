# Printify Print-on-Demand Integration

Create and sell custom branded merchandise (t-shirts, hoodies, mugs, etc.) using Printify's print-on-demand platform with real-time mockup previews.

## Category
E-commerce / Print-on-Demand

## Required API Keys
- `PRINTIFY_API_KEY`

## API Endpoints

All endpoints are proxied through the backend for API key security. Never expose PRINTIFY_API_KEY to the browser.

### Get Shops
```
GET /api/printify/shops
```

**Response:**
```json
[
  {
    "id": 12345,
    "title": "My Shop",
    "sales_channel": "custom"
  }
]
```

### Get Product Catalog (Blueprints)
```
GET /api/printify/catalog/blueprints
```

**Response:**
```json
[
  {
    "id": 6,
    "title": "Unisex Staple T-Shirt",
    "brand": "Bella+Canvas",
    "model": "3001",
    "images": ["https://..."]
  }
]
```

### Get Print Providers for Blueprint
```
GET /api/printify/catalog/blueprints/:blueprintId/providers
```

**Response:**
```json
[
  {
    "id": 1,
    "title": "Printify Choice",
    "location": {
      "country": "US"
    }
  }
]
```

### Get Variants for Blueprint/Provider
```
GET /api/printify/catalog/blueprints/:blueprintId/providers/:providerId/variants
```

**Response:**
```json
{
  "variants": [
    {
      "id": 45740,
      "title": "Black / S",
      "options": { "color": "Black", "size": "S" },
      "placeholders": [
        { "position": "front", "width": 4500, "height": 5100 },
        { "position": "back", "width": 4500, "height": 5100 },
        { "position": "sleeve_left", "width": 1800, "height": 1800 },
        { "position": "sleeve_right", "width": 1800, "height": 1800 }
      ]
    }
  ]
}
```

### Upload Design Image
```
POST /api/printify/uploads
```

**Request:**
```json
{
  "imageData": "data:image/png;base64,...",
  "fileName": "my-logo.png"
}
```

**Response:**
```json
{
  "id": "5d15ca551163cde90d7b2203",
  "file_name": "my-logo.png",
  "width": 1200,
  "height": 1200,
  "preview_url": "https://..."
}
```

### Proxy External Images (CORS)
```
GET /api/proxy/image?url=<encoded-url>
```

Use this endpoint to fetch external images (like brand logos) that may have CORS restrictions.

**Response:** Binary image data with appropriate Content-Type header

### Create Product
```
POST /api/printify/shops/:shopId/products
```

**Request:**
```json
{
  "title": "My Custom T-Shirt",
  "description": "A premium quality custom tee",
  "blueprint_id": 6,
  "print_provider_id": 1,
  "variants": [
    { "id": 45740, "price": 2499, "is_enabled": true },
    { "id": 45742, "price": 2499, "is_enabled": true }
  ],
  "print_areas": [
    {
      "variant_ids": [45740, 45742],
      "placeholders": [
        {
          "position": "front",
          "images": [
            {
              "id": "5d15ca551163cde90d7b2203",
              "x": 0.5,
              "y": 0.5,
              "scale": 1,
              "angle": 0
            }
          ]
        }
      ]
    }
  ]
}
```

**Response:**
```json
{
  "id": "5bfd0b66a342bcc9b5563216",
  "title": "My Custom T-Shirt",
  "description": "A premium quality custom tee",
  "images": [{ "src": "https://mockup.png" }]
}
```

### Update Product
```
PUT /api/printify/shops/:shopId/products/:productId
```

Use this to update an existing product. **Note:** PUT may fail when changing variant lists; fallback to POST (create new) if needed.

**Request:** Same format as Create Product

### Delete Product
```
DELETE /api/printify/shops/:shopId/products/:productId
```

**Response:**
```json
{ "success": true }
```

### Submit Order
```
POST /api/printify/shops/:shopId/orders
```

**IMPORTANT: Workspace Tagging Convention**

When creating orders, you **must** include the workspace ID in the `external_id` field using this format:

```
ws:<workspaceId>:<identifier>
```

This tagging is what allows orders to be filtered by workspace later. Without it, orders cannot be associated with a specific workspace.

**Request:**
```json
{
  "external_id": "ws:abc-123:swag-1706745600000",
  "line_items": [
    {
      "product_id": "5bfd0b66a342bcc9b5563216",
      "variant_id": 45740,
      "quantity": 1
    }
  ],
  "shipping_method": 1,
  "address_to": {
    "first_name": "John",
    "last_name": "Smith",
    "email": "john@example.com",
    "phone": "1234567890",
    "country": "US",
    "address1": "123 Main St",
    "city": "New York",
    "zip": "10001"
  }
}
```

**Response:**
```json
{
  "id": "order-abc123",
  "status": "pending",
  "total_price": 2499,
  "total_shipping": 500
}
```

---

## Workspace-Scoped Order Access

All order retrieval is scoped to a workspace to prevent cross-tenant data leaks. Orders are associated with workspaces via the `external_id` field using the convention `ws:<workspaceId>:<rest>`.

### How It Works

1. **Order Creation**: When creating an order, the `external_id` field is set to `ws:<workspaceId>:swag-<timestamp>` (or `ws:<workspaceId>:space:<spaceId>:swag-<timestamp>` for space-level scoping)
2. **Order Retrieval**: All order listing endpoints filter by matching the `external_id` prefix against the requesting workspace's ID
3. **Security**: Endpoints that don't receive a `workspaceId` return empty results rather than exposing all orders

### Get Workspace Orders (Recommended)
```
GET /api/workspace/:workspaceId/printify/orders
```

This is the **preferred endpoint** for dashboard use. It automatically resolves the shop, fetches orders from Printify, and filters them to only include orders belonging to the specified workspace.

**Query Parameters:**
- `page` (optional): Page number for pagination
- `status` (optional): Filter by order status

**Response:**
```json
{
  "success": true,
  "orders": [
    {
      "id": "5a96d5e2a3eda800097bca15",
      "external_id": "ws:abc-123:swag-1706745600000",
      "status": "fulfilled",
      "total_price": 2499,
      "total_shipping": 450
    }
  ],
  "current_page": 1,
  "last_page": 1
}
```

### Convenience Endpoints (also workspace-scoped)
```
GET /api/printify/orders?workspaceId=<workspaceId>
GET /api/printify/orders/enriched?workspaceId=<workspaceId>
```

These convenience endpoints auto-resolve the shop ID and **require** a `workspaceId` query parameter. Without it, they return empty results for security.

---

## Order Administration (Internal Tools)

These endpoints are designed for building **internal admin tools** to track and manage orders. Use them to build order dashboards, fulfillment tracking, and customer support tools.

### List All Orders (Shop-level with workspace filter)
```
GET /api/printify/shops/:shopId/orders?workspaceId=<workspaceId>&page=1&status=fulfilled
```

**Query Parameters:**
- `workspaceId` (**required**): Filter orders to this workspace only. Omitting this returns empty results.
- `spaceId` (optional): Further filter to a specific space within the workspace
- `page` (optional): Page number for pagination (default: 1)
- `status` (optional): Filter by order status

**Order Statuses:**
- `pending` - Order created, awaiting processing
- `on-hold` - Awaiting manual approval
- `sending-to-production` - Being sent to print provider
- `in-production` - Currently being printed
- `fulfilled` - Order shipped
- `canceled` - Order was canceled
- `payment-not-received` - Awaiting payment

**Response:**
```json
{
  "current_page": 1,
  "last_page": 5,
  "data": [
    {
      "id": "5a96d5e2a3eda800097bca15",
      "external_id": "order-12345",
      "status": "fulfilled",
      "created_at": "2025-01-06T10:30:00Z",
      "address_to": {
        "first_name": "John",
        "last_name": "Smith",
        "email": "john@example.com",
        "city": "New York",
        "country": "US"
      },
      "line_items": [
        {
          "product_id": "5bfd0b66a342bcc9b5563216",
          "variant_id": 45740,
          "quantity": 1,
          "cost": 1200,
          "shipping_cost": 450
        }
      ],
      "total_price": 2499,
      "total_shipping": 450,
      "shipments": [
        {
          "carrier": "USPS",
          "tracking_number": "9400111899223456789012",
          "tracking_url": "https://tools.usps.com/go/TrackConfirmAction?tLabels=9400111899223456789012",
          "shipped_at": "2025-01-08T14:22:00Z"
        }
      ]
    }
  ]
}
```

### Get Order Details
```
GET /api/printify/shops/:shopId/orders/:orderId
```

**Response:**
```json
{
  "id": "5a96d5e2a3eda800097bca15",
  "external_id": "order-12345",
  "status": "fulfilled",
  "created_at": "2025-01-06T10:30:00Z",
  "updated_at": "2025-01-08T14:22:00Z",
  "address_to": {
    "first_name": "John",
    "last_name": "Smith",
    "email": "john@example.com",
    "phone": "1234567890",
    "country": "US",
    "region": "NY",
    "address1": "123 Main St",
    "address2": "Apt 4B",
    "city": "New York",
    "zip": "10001"
  },
  "line_items": [
    {
      "product_id": "5bfd0b66a342bcc9b5563216",
      "variant_id": 45740,
      "quantity": 1,
      "print_provider_id": 1,
      "cost": 1200,
      "shipping_cost": 450,
      "status": "fulfilled",
      "metadata": {
        "title": "Custom T-Shirt",
        "variant_label": "Black / M"
      }
    }
  ],
  "total_price": 2499,
  "total_shipping": 450,
  "total_tax": 0,
  "shipments": [
    {
      "carrier": "USPS",
      "tracking_number": "9400111899223456789012",
      "tracking_url": "https://tools.usps.com/go/TrackConfirmAction?tLabels=9400111899223456789012",
      "shipped_at": "2025-01-08T14:22:00Z",
      "delivered_at": null
    }
  ]
}
```

### Send Order to Production
```
POST /api/printify/shops/:shopId/orders/:orderId/send-to-production
```

Use this to manually approve an order that is `on-hold` and send it to the print provider for fulfillment.

**Response:**
```json
{
  "success": true,
  "status": "sending-to-production"
}
```

### Cancel Order
```
POST /api/printify/shops/:shopId/orders/:orderId/cancel
```

**Note:** Can only cancel orders with status `on-hold` or `payment-not-received`. Orders already in production cannot be canceled.

**Response:**
```json
{
  "success": true,
  "status": "canceled"
}
```

### Calculate Shipping Cost
```
POST /api/printify/shops/:shopId/orders/shipping
```

Calculate shipping costs **before** creating an order. Useful for showing customers shipping prices at checkout.

**Request:**
```json
{
  "line_items": [
    {
      "product_id": "5bfd0b66a342bcc9b5563216",
      "variant_id": 45740,
      "quantity": 2
    }
  ],
  "address_to": {
    "first_name": "John",
    "last_name": "Smith",
    "country": "US",
    "region": "NY",
    "address1": "123 Main St",
    "city": "New York",
    "zip": "10001"
  }
}
```

**Response:**
```json
{
  "standard": 450,
  "express": 1295,
  "priority": 1895
}
```

Note: Shipping costs are in cents.

---

## Order Webhooks (Real-time Updates)

Printify can send real-time updates when order status changes. Set up webhooks to receive notifications for:

### Webhook Events

| Event | Description |
|-------|-------------|
| `order:created` | New order was submitted |
| `order:updated` | Order details changed |
| `order:sent-to-production` | Order sent to print provider |
| `order:shipment:created` | Items shipped (includes tracking) |
| `order:shipment:delivered` | Items delivered |

### Webhook Payload Example (order:shipment:created)
```json
{
  "event": "order:shipment:created",
  "resource": {
    "id": "5a96d5e2a3eda800097bca15",
    "type": "order",
    "data": {
      "order_id": "5a96d5e2a3eda800097bca15",
      "shipment": {
        "carrier": "USPS",
        "tracking_number": "9400111899223456789012",
        "tracking_url": "https://...",
        "shipped_at": "2025-01-08T14:22:00Z"
      }
    }
  }
}
```

### Setting Up Webhooks
Webhooks are configured at the platform level. Contact platform admin to set up webhook receivers.

---

## Admin Dashboard Helper Functions

```typescript
export const printifyAdmin = {
  // List orders for a workspace (RECOMMENDED - workspace-scoped)
  async listWorkspaceOrders(workspaceId: string, options?: { page?: number; status?: string }) {
    const params = new URLSearchParams();
    if (options?.page) params.set('page', String(options.page));
    if (options?.status) params.set('status', options.status);
    
    const response = await fetch(`/api/workspace/${workspaceId}/printify/orders?${params}`);
    return response.json();
  },

  // List orders with shop-level access (requires workspaceId for security)
  async listOrders(shopId: number, workspaceId: string, options?: { page?: number; status?: string }) {
    const params = new URLSearchParams();
    params.set('workspaceId', workspaceId);
    if (options?.page) params.set('page', String(options.page));
    if (options?.status) params.set('status', options.status);
    
    const response = await fetch(`/api/printify/shops/${shopId}/orders?${params}`);
    return response.json();
  },

  // Get detailed order info with tracking
  async getOrder(shopId: number, orderId: string) {
    const response = await fetch(`/api/printify/shops/${shopId}/orders/${orderId}`);
    return response.json();
  },

  // Send held order to production
  async sendToProduction(shopId: number, orderId: string) {
    const response = await fetch(`/api/printify/shops/${shopId}/orders/${orderId}/send-to-production`, {
      method: 'POST'
    });
    return response.json();
  },

  // Cancel an order (only works for on-hold orders)
  async cancelOrder(shopId: number, orderId: string) {
    const response = await fetch(`/api/printify/shops/${shopId}/orders/${orderId}/cancel`, {
      method: 'POST'
    });
    return response.json();
  },

  // Calculate shipping before order
  async calculateShipping(shopId: number, lineItems: any[], addressTo: any) {
    const response = await fetch(`/api/printify/shops/${shopId}/orders/shipping`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ line_items: lineItems, address_to: addressTo })
    });
    return response.json();
  },

  // Create order with workspace tagging (REQUIRED for workspace filtering)
  async createOrder(shopId: number, workspaceId: string, orderData: any) {
    const response = await fetch(`/api/printify/shops/${shopId}/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...orderData,
        external_id: `ws:${workspaceId}:swag-${Date.now()}`
      })
    });
    return response.json();
  },

  // Get order status summary (for dashboard widgets)
  async getOrderStats(workspaceId: string) {
    const result = await this.listWorkspaceOrders(workspaceId);
    const orders = result.orders || [];
    
    const stats: Record<string, number> = {
      pending: 0,
      'on-hold': 0,
      'in-production': 0,
      fulfilled: 0,
      canceled: 0
    };
    
    orders.forEach((order: any) => {
      if (stats[order.status] !== undefined) {
        stats[order.status]++;
      }
    });
    
    return stats;
  }
};
```

---

## Internal Tools Use Cases

Use these admin endpoints to build:

### Order Dashboard
- View workspace-scoped orders across statuses
- Filter by status (pending, in-production, fulfilled)
- Search by customer name or order ID
- Track fulfillment pipeline
- **Always use workspace-scoped endpoints to prevent cross-tenant data access**

### Fulfillment Manager
- List orders needing attention (on-hold, pending)
- One-click "Send to Production" action
- Bulk operations for order management

### Customer Support Tool
- Look up order by ID or customer email
- View full order history
- Access tracking information
- Cancel/refund orders when needed

### Analytics Dashboard
- Orders by status over time
- Revenue tracking (total_price - cost)
- Shipping cost analysis
- Popular products/variants

---

## Installation

```javascript
export const printify = {
  async getShops() {
    const response = await fetch('/api/printify/shops');
    return response.json();
  },

  async getCatalog() {
    const response = await fetch('/api/printify/catalog/blueprints');
    return response.json();
  },

  async getProviders(blueprintId) {
    const response = await fetch(`/api/printify/catalog/blueprints/${blueprintId}/providers`);
    return response.json();
  },

  async getVariants(blueprintId, providerId) {
    const response = await fetch(`/api/printify/catalog/blueprints/${blueprintId}/providers/${providerId}/variants`);
    return response.json();
  },

  async uploadDesign(imageData, fileName) {
    const response = await fetch('/api/printify/uploads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ imageData, fileName })
    });
    return response.json();
  },

  async createProduct(shopId, productData) {
    const response = await fetch(`/api/printify/shops/${shopId}/products`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(productData)
    });
    return response.json();
  },

  async updateProduct(shopId, productId, productData) {
    const response = await fetch(`/api/printify/shops/${shopId}/products/${productId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(productData)
    });
    return response.json();
  },

  async deleteProduct(shopId, productId) {
    const response = await fetch(`/api/printify/shops/${shopId}/products/${productId}`, {
      method: 'DELETE'
    });
    return response.json();
  },

  async submitOrder(shopId, orderData) {
    const response = await fetch(`/api/printify/shops/${shopId}/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderData)
    });
    return response.json();
  },

  async proxyImage(externalUrl) {
    const response = await fetch(`/api/proxy/image?url=${encodeURIComponent(externalUrl)}`);
    return response.blob();
  }
};
```

## Print Positions

Each variant has available print positions (placeholders). Common positions include:
- `front` - Front of garment
- `back` - Back of garment  
- `sleeve_left` - Left sleeve
- `sleeve_right` - Right sleeve

These are returned in the variants endpoint:

```json
{
  "variants": [
    {
      "id": 45740,
      "placeholders": [
        { "position": "front", "width": 4500, "height": 5100 },
        { "position": "back", "width": 4500, "height": 5100 },
        { "position": "sleeve_left", "width": 1800, "height": 1800 },
        { "position": "sleeve_right", "width": 1800, "height": 1800 }
      ]
    }
  ]
}
```

## Per-Position Design Settings

Each print position should maintain independent settings for scale, x, and y coordinates. This allows users to customize each position differently (e.g., large centered logo on front, small logo on back).

```typescript
interface PositionSettings {
  scale: number;  // 0.25 to 2.0
  x: number;      // 0 to 1 (0.5 = center)
  y: number;      // 0 to 1 (0.5 = center)
}

type PositionSettingsMap = Record<string, PositionSettings>;

const defaultSettings: PositionSettingsMap = {
  front: { scale: 1.0, x: 0.5, y: 0.5 },
  back: { scale: 1.0, x: 0.5, y: 0.5 },
  sleeve_left: { scale: 0.5, x: 0.5, y: 0.5 },
  sleeve_right: { scale: 0.5, x: 0.5, y: 0.5 },
};
```

To print on multiple positions with different settings:

```json
{
  "print_areas": [{
    "variant_ids": [45740],
    "placeholders": [
      {
        "position": "front",
        "images": [{ "id": "image-id", "x": 0.5, "y": 0.4, "scale": 1.2, "angle": 0 }]
      },
      {
        "position": "back",
        "images": [{ "id": "image-id", "x": 0.5, "y": 0.3, "scale": 0.8, "angle": 0 }]
      }
    ]
  }]
}
```

## Design Positioning

- `x`: Horizontal position (0-1, 0.5 = center)
- `y`: Vertical position (0-1, 0.5 = center)
- `scale`: Size multiplier (0.25-2.0, 1.0 = 100%)
- `angle`: Rotation in degrees

## Color-Specific Mockup Generation

**Critical Insight:** Printify generates mockups based on the variants included when creating a product. To get mockups for a specific color:

1. Create a "preview product" with only ONE variant (the desired color)
2. Printify will generate mockups specifically for that color
3. Delete the preview product after getting the mockup

```typescript
async function generateColorMockup(
  shopId: string,
  blueprintId: number,
  providerId: number,
  variantId: number,  // Single variant for specific color
  imageId: string,
  position: string,
  settings: PositionSettings
) {
  const productData = {
    title: `Preview-${Date.now()}`,
    description: 'Preview product',
    blueprint_id: blueprintId,
    print_provider_id: providerId,
    variants: [{ id: variantId, price: 100, is_enabled: true }],
    print_areas: [{
      variant_ids: [variantId],
      placeholders: [{
        position,
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

  const response = await fetch(`/api/printify/shops/${shopId}/products`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(productData)
  });

  const product = await response.json();
  const mockupUrl = product.images?.[0]?.src;
  
  return { productId: product.id, mockupUrl };
}
```

## Automatic Preview on Customize

When users enter the customize step, automatically:
1. Select the first available brand logo
2. Generate a mockup with the default color
3. Display the preview immediately

This provides instant visual feedback without requiring user interaction.

```typescript
useEffect(() => {
  if (
    step === 'customize' &&
    !variantsLoading &&
    variants.length > 0 &&
    brandLogos.length > 0 &&
    !designImage &&
    !isGeneratingMockup &&
    shops?.length
  ) {
    handleSelectBrandLogo(brandLogos[0]);
  }
}, [step, variantsLoading, variants.length, brandLogos.length, designImage, isGeneratingMockup, shops?.length]);
```

## Best Practices

### Mockup Generation Strategy
Printify doesn't have a standalone mockup API - mockups are generated when creating products.

1. **Single-variant preview products** - Create products with one variant to get color-specific mockups
2. **Reuse preview products** - Store preview product ID and try PUT to update; fallback to POST if PUT fails
3. **Clean up** - Delete preview products when user exits or finalizes

### Variant Limits
- **Maximum 100 variants per product** - Printify enforces this limit
- When creating final products, batch variants if needed or limit color/size combinations

### PUT vs POST for Updates
PUT updates may fail when changing variant lists. Implement fallback logic:

```typescript
async function updateOrCreateProduct(shopId, productId, productData) {
  if (productId) {
    try {
      const response = await fetch(`/api/printify/shops/${shopId}/products/${productId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData)
      });
      if (response.ok) return response.json();
    } catch (error) {
      console.warn('PUT failed, falling back to POST');
    }
  }
  
  // Fallback to creating new product
  const response = await fetch(`/api/printify/shops/${shopId}/products`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(productData)
  });
  return response.json();
}
```

### Handling External Images (CORS)
Use the image proxy endpoint for external URLs like brand logos:

```typescript
async function loadExternalImage(url: string): Promise<string> {
  const proxyUrl = `/api/proxy/image?url=${encodeURIComponent(url)}`;
  const response = await fetch(proxyUrl);
  const blob = await response.blob();
  
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.readAsDataURL(blob);
  });
}
```

### Color Selection UI
Display up to 12 colors from available variants for a clean UI:

```typescript
const availableColors = useMemo(() => {
  const colorMap = new Map<string, number>();
  variants.forEach(v => {
    if (v.options?.color && !colorMap.has(v.options.color)) {
      colorMap.set(v.options.color, v.id);
    }
  });
  return Array.from(colorMap.entries())
    .slice(0, 12)
    .map(([color, variantId]) => ({ color, variantId }));
}, [variants]);
```

## Use Cases
- Custom branded merchandise for businesses
- T-shirts, hoodies, hats with company logos
- Promotional items (mugs, phone cases, bags)
- Event merchandise
- Team uniforms and apparel
- Customer reward items
- Influencer merchandise

## Product Categories
- Apparel (T-shirts, Hoodies, Tank Tops, Long Sleeves)
- Accessories (Hats, Bags, Phone Cases)
- Home & Living (Mugs, Posters, Pillows)
- Kids & Baby (Onesies, Youth Tees)

## Dynamic Pricing

Printify provides variant-level pricing through the variants endpoint. Each variant includes:
- `cost` - What you pay Printify (in cents)
- `price` - Suggested retail price (in cents)

```typescript
interface Variant {
  id: number;
  title: string;
  options: { color: string; size: string };
  placeholders?: Placeholder[];
  cost: number;    // Your cost in cents (e.g., 1200 = $12.00)
  price: number;   // Suggested retail in cents (e.g., 2499 = $24.99)
}
```

### Pricing Strategy Example
Apply a 20% markup on the suggested retail price:

```typescript
const calculateSellingPrice = (suggestedRetailCents: number): number => {
  return Math.round(suggestedRetailCents * 1.20); // 20% markup
};

// Example: $24.99 suggested → $29.99 selling price
const sellingPriceCents = calculateSellingPrice(2499); // 2999
```

## Price Handling (Cents vs Dollars)

**Critical:** All prices are stored in the database as **integers in cents**. Convert when:
- Displaying to users: divide by 100
- Saving to database: multiply by 100

```typescript
// Frontend display (cents → dollars)
const displayPrice = (cents: number): string => {
  return `$${(cents / 100).toFixed(2)}`;
};

// Before database insert (dollars → cents)
const unitPriceCents = Math.round(unitPriceDollars * 100);
const shippingPriceCents = Math.round(shippingPriceDollars * 100);
const totalPriceCents = Math.round(totalPriceDollars * 100);
```

## Workspace Order Flow

Orders are created within a workspace context with wallet-based payments:

### Save Product to Workspace
```
POST /api/workspaces/:configId/swag-products
```

**Request:**
```json
{
  "title": "Custom T-Shirt",
  "blueprintId": 6,
  "providerId": 1,
  "printifyProductId": "abc123",
  "selectedVariants": [45740, 45742],
  "designImageUrl": "https://...",
  "mockupImageUrl": "https://...",
  "basePrice": 1200,
  "sellingPrice": 2999,
  "positionSettings": {
    "front": { "scale": 1.0, "x": 0.5, "y": 0.5 },
    "back": { "scale": 0.8, "x": 0.5, "y": 0.3 }
  }
}
```

### Get Wallet Balance
```
GET /api/workspaces/:configId/wallet
```

**Response:**
```json
{
  "success": true,
  "balance": 15000
}
```
Note: Balance is returned in cents.

### Create Order (with Wallet Payment)
```
POST /api/workspaces/:configId/swag-orders
```

**Request:**
```json
{
  "swagProductId": "uuid-here",
  "variantId": 45740,
  "quantity": 2,
  "unitPrice": 29.99,
  "shippingPrice": 4.99,
  "totalPrice": 64.97,
  "shippingAddress": {
    "firstName": "John",
    "lastName": "Smith",
    "email": "john@example.com",
    "phone": "1234567890",
    "country": "US",
    "address1": "123 Main St",
    "city": "New York",
    "state": "NY",
    "zip": "10001"
  }
}
```

Note: Prices in request are in dollars; they are converted to cents server-side before database storage.

**Response:**
```json
{
  "success": true,
  "order": {
    "id": "order-uuid",
    "printifyOrderId": "printify-order-123",
    "status": "submitted"
  },
  "newWalletBalance": 8503
}
```

### Get Order History
```
GET /api/workspaces/:configId/swag-orders
```

### Reorder Saved Product
Use the same order endpoint with a saved product's `swagProductId`. The system will:
1. Look up the saved product details
2. Create a new Printify order

## Rate Limits
- 600 API calls per minute (global)
- 100 catalog requests per minute
- Product publishing: 200 requests per 30 minutes
- Error rate must not exceed 5% of total requests

## Documentation
- [Printify API Reference](https://developers.printify.com/)
- [Printify Help Center](https://help.printify.com/)
