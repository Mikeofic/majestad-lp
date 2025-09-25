// Cliente para Cloudflare Pages Functions que proxy a API da Yampi
// Assim, nenhum segredo fica exposto no front-end

// Interfaces para tipagem
export interface YampiSku {
  id: string | number;
  name?: string;
  title?: string;
  total_in_stock?: number;
  variations?: Array<{ name?: string; value?: string | number }>;
  [key: string]: any;
}

export interface YampiProduct {
  id: string | number;
  name: string;
  skus?: any; // pode ser array ou objeto { data: [] }
  images?: any[];
  [key: string]: any;
}

export interface GetProductsOptions {
  include?: string;
  limit?: number;
  page?: number;
  skipCache?: boolean;
}

export interface GetSKUsOptions {
  include?: string;
  limit?: number;
  page?: number;
}

export interface GetProductsResponse {
  data: YampiProduct[];
  meta?: {
    pagination?: {
      total?: number;
      count?: number;
      per_page?: number;
      current_page?: number;
      total_pages?: number;
    };
  };
  [key: string]: any;
}

export interface GetProductResponse {
  data: YampiProduct;
  [key: string]: any;
}

export interface GetSKUsResponse {
  data: YampiSku[];
  meta?: {
    pagination?: {
      total?: number;
      count?: number;
      per_page?: number;
      current_page?: number;
      total_pages?: number;
    };
  };
  [key: string]: any;
}

export interface ProductStockInfo {
  inStock: boolean;
  totalStock: number;
  skus: Array<{
    id: string | number;
    name?: string;
    stock: number;
    inStock: boolean;
  }>;
}

// Helper para normalizar SKUs vindos da Yampi
function normalizeSkus(skus: any): YampiSku[] {
  if (Array.isArray(skus)) return skus as YampiSku[];
  if (Array.isArray(skus?.data)) return skus.data as YampiSku[];
  return [];
}

export class YampiAPI {
  private basePath: string;

  constructor(basePath = '/api/yampi') {
    this.basePath = basePath;
  }

  // Buscar todos os produtos com informações de estoque
  async getProducts(options: GetProductsOptions = {}): Promise<GetProductsResponse> {
    const {
      include = 'skus,images',
      limit = 50,
      page = 1,
      skipCache = false
    } = options;

    const params = new URLSearchParams({
      include,
      limit: String(limit),
      page: String(page)
    });
    if (skipCache) params.append('skipCache', 'true');

    const response = await fetch(`${this.basePath}/products?${params}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });

    if (!response.ok) {
      throw new Error(`Erro na API: ${response.status} - ${response.statusText}`);
    }
    return await response.json();
  }

  // Buscar um produto específico por ID
  async getProduct(productId: string | number, include = 'skus,images'): Promise<GetProductResponse> {
    const params = new URLSearchParams({ productId: String(productId), include });
    const response = await fetch(`${this.basePath}/product?${params}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });

    if (!response.ok) {
      throw new Error(`Erro na API: ${response.status} - ${response.statusText}`);
    }
    return await response.json();
  }

  // Buscar SKUs com informações de estoque
  async getSKUs(options: GetSKUsOptions = {}): Promise<GetSKUsResponse> {
    const {
      include = 'prices,stocks',
      limit = 50,
      page = 1
    } = options;

    const params = new URLSearchParams({
      include,
      limit: String(limit),
      page: String(page)
    });

    const response = await fetch(`${this.basePath}/skus?${params}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });

    if (!response.ok) {
      throw new Error(`Erro na API: ${response.status} - ${response.statusText}`);
    }
    return await response.json();
  }

  // Verificar produtos em estoque (com quantidade > 0)
  async getProductsInStock(): Promise<GetProductsResponse> {
    const products = await this.getProducts({ include: 'skus' });
    const productsInStock = (products.data || []).filter(product => {
      const skusArr = normalizeSkus(product.skus);
      return skusArr.some(sku => (sku.total_in_stock || 0) > 0);
    });

    return {
      ...products,
      data: productsInStock
    };
  }

  // Verificar estoque de um produto específico
  async checkProductStock(productId: string | number): Promise<ProductStockInfo> {
    const product = await this.getProduct(productId, 'skus');

    const skusArr = normalizeSkus(product.data?.skus);
    if (!Array.isArray(skusArr) || skusArr.length === 0) {
      return { inStock: false, totalStock: 0, skus: [] };
    }

    const skusWithStock = skusArr.map(sku => ({
      id: sku.id,
      name: sku.title || sku.name,
      stock: sku.total_in_stock || 0,
      inStock: (sku.total_in_stock || 0) > 0
    }));

    const totalStock = skusWithStock.reduce((total, sku) => total + (sku.stock || 0), 0);
    const inStock = totalStock > 0;

    return { inStock, totalStock, skus: skusWithStock };
  }
}

// Instância única exportada
const yampiApi = new YampiAPI();

export default yampiApi;
