// Cliente para Cloudflare Pages Functions que proxy a API da Yampi
// Assim, nenhum segredo fica exposto no front-end

class YampiAPI {
  constructor(basePath = '/api/yampi') {
    this.basePath = basePath;
  }

  // Buscar todos os produtos com informações de estoque
  async getProducts(options = {}) {
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
  async getProduct(productId, include = 'skus,images') {
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
  async getSKUs(options = {}) {
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
  async getProductsInStock() {
    const products = await this.getProducts({ include: 'skus' });
    const productsInStock = (products.data || []).filter(product => {
      return product.skus && Array.isArray(product.skus) && product.skus.some(sku => (sku.total_in_stock || 0) > 0);
    });

    return {
      ...products,
      data: productsInStock
    };
  }

  // Verificar estoque de um produto específico
  async checkProductStock(productId) {
    const product = await this.getProduct(productId, 'skus');

    if (!product.data?.skus || !Array.isArray(product.data.skus)) {
      return { inStock: false, totalStock: 0, skus: [] };
    }

    const skusWithStock = product.data.skus.map(sku => ({
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
export { YampiAPI };