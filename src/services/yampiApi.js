// Serviço para integração com a API da Yampi
// Documentação: https://docs.yampi.com.br

class YampiAPI {
  constructor(alias, userToken, userSecretKey) {
    this.baseURL = `https://api.dooki.com.br/v2/${alias}`;
    this.headers = {
      'Content-Type': 'application/json',
      'User-Token': userToken,
      'User-Secret-Key': userSecretKey
    };
  }

  // Buscar todos os produtos com informações de estoque
  async getProducts(options = {}) {
    try {
      const {
        include = 'skus,images',
        limit = 50,
        page = 1,
        skipCache = false
      } = options;

      const params = new URLSearchParams({
        include,
        limit: limit.toString(),
        page: page.toString()
      });

      if (skipCache) {
        params.append('skipCache', 'true');
      }

      const response = await fetch(`${this.baseURL}/catalog/products?${params}`, {
        method: 'GET',
        headers: this.headers
      });

      if (!response.ok) {
        throw new Error(`Erro na API: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
      throw error;
    }
  }

  // Buscar um produto específico por ID
  async getProduct(productId, include = 'skus,images') {
    try {
      const response = await fetch(`${this.baseURL}/catalog/products/${productId}?include=${include}`, {
        method: 'GET',
        headers: this.headers
      });

      if (!response.ok) {
        throw new Error(`Erro na API: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Erro ao buscar produto:', error);
      throw error;
    }
  }

  // Buscar SKUs com informações de estoque
  async getSKUs(options = {}) {
    try {
      const {
        include = 'prices,stocks',
        limit = 50,
        page = 1
      } = options;

      const params = new URLSearchParams({
        include,
        limit: limit.toString(),
        page: page.toString()
      });

      const response = await fetch(`${this.baseURL}/catalog/skus?${params}`, {
        method: 'GET',
        headers: this.headers
      });

      if (!response.ok) {
        throw new Error(`Erro na API: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Erro ao buscar SKUs:', error);
      throw error;
    }
  }

  // Verificar produtos em estoque (com quantidade > 0)
  async getProductsInStock() {
    try {
      const products = await this.getProducts({ include: 'skus' });
      
      // Filtrar produtos que têm pelo menos um SKU em estoque
      const productsInStock = products.data.filter(product => {
        return product.skus && Array.isArray(product.skus) && product.skus.some(sku => sku.total_in_stock > 0);
      });

      return {
        ...products,
        data: productsInStock
      };
    } catch (error) {
      console.error('Erro ao verificar produtos em estoque:', error);
      throw error;
    }
  }

  // Verificar estoque de um produto específico
  async checkProductStock(productId) {
    try {
      const product = await this.getProduct(productId, 'skus');
      
      if (!product.data.skus || !Array.isArray(product.data.skus)) {
        return { inStock: false, totalStock: 0, skus: [] };
      }

      const skusWithStock = product.data.skus.map(sku => ({
        id: sku.id,
        name: sku.title || sku.name,
        stock: sku.total_in_stock || 0,
        inStock: (sku.total_in_stock || 0) > 0
      }));

      const totalStock = skusWithStock.reduce((total, sku) => total + sku.stock, 0);
      const inStock = totalStock > 0;

      return {
        inStock,
        totalStock,
        skus: skusWithStock
      };
    } catch (error) {
      console.error('Erro ao verificar estoque do produto:', error);
      return { inStock: false, totalStock: 0, skus: [] };
    }
  }
}

// Configuração da instância da API
// IMPORTANTE: Substitua pelos seus dados reais da Yampi
const YAMPI_CONFIG = {
  alias: 'majestad', // Encontre em: Perfil > Credenciais de API
  userToken: '8xFx87f5Nx8J2yokYoHMeyuIa6TDQ58Nw7sAq3DS', // Encontre em: Perfil > Credenciais de API
  userSecretKey: 'sk_mQPnAwsGrNebfffoSecVpEsbCG1miRVevxNEY' // Encontre em: Perfil > Credenciais de API
};

// Instância da API
const yampiApi = new YampiAPI(
  YAMPI_CONFIG.alias,
  YAMPI_CONFIG.userToken,
  YAMPI_CONFIG.userSecretKey
);

export default yampiApi;
export { YampiAPI };