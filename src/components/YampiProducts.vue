<template>
  <div class="yampi-products p-6">
    <h2 class="text-2xl font-bold mb-6">Produtos Yampi - Verificação de Estoque</h2>
    <p class="text-sm text-gray-400 mb-4">Integração via Cloudflare Pages API (segura)</p>
    
    <!-- Controles -->
    <div class="flex flex-wrap gap-4 mb-6">
      <button 
        @click="loadProducts" 
        :disabled="loading"
        class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50 transition-colors"
      >
        {{ loading ? 'Carregando...' : 'Carregar Produtos' }}
      </button>
      
      <button 
        @click="loadProductsInStock" 
        :disabled="loading"
        class="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 disabled:opacity-50 transition-colors"
      >
        {{ loading ? 'Carregando...' : 'Apenas com Estoque' }}
      </button>
      
      <div class="flex items-center gap-2">
        <input 
          v-model="productIdToCheck" 
          type="number" 
          placeholder="ID do produto"
          class="px-3 py-2 border border-gray-300 rounded-md"
        >
        <button 
          @click="checkSpecificProduct" 
          :disabled="loading || !productIdToCheck"
          class="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 disabled:opacity-50 transition-colors"
        >
          Verificar Estoque
        </button>
      </div>
    </div>

    <!-- Mensagens de erro -->
    <div v-if="error" class="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
      <h3 class="text-lg font-semibold text-red-800 mb-2">❌ Erro</h3>
      <p class="text-red-700">{{ error }}</p>
      <div class="mt-3 text-sm text-red-600">
        <p><strong>Possíveis soluções:</strong></p>
        <ul class="list-disc list-inside mt-1">
          <li>Verifique se suas credenciais estão corretas</li>
          <li>Confirme se o alias da loja está correto</li>
          <li>Verifique sua conexão com a internet</li>
          <li>Consulte a documentação da Yampi: <a href="https://docs.yampi.com.br" target="_blank" class="underline">docs.yampi.com.br</a></li>
        </ul>
      </div>
    </div>

    <!-- Informações de estoque específico -->
    <div v-if="specificProductStock" class="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
      <h3 class="text-lg font-semibold text-blue-800 mb-3">📦 Estoque do Produto #{{ productIdToCheck }}</h3>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="text-center">
          <div class="text-2xl font-bold" :class="specificProductStock.inStock ? 'text-green-600' : 'text-red-600'">
            {{ specificProductStock.inStock ? '✅ Em Estoque' : '❌ Sem Estoque' }}
          </div>
        </div>
        <div class="text-center">
          <div class="text-sm text-gray-600">Total em Estoque</div>
          <div class="text-xl font-bold text-blue-600">{{ specificProductStock.totalStock }}</div>
        </div>
        <div class="text-center">
          <div class="text-sm text-gray-600">SKUs Disponíveis</div>
          <div class="text-xl font-bold text-blue-600">{{ Array.isArray(specificProductStock.skus) ? specificProductStock.skus.length : 0 }}</div>
        </div>
      </div>
      
      <!-- Detalhes dos SKUs -->
      <div v-if="Array.isArray(specificProductStock.skus) && specificProductStock.skus.length > 0" class="mt-4">
        <h4 class="font-semibold mb-2">Detalhes dos SKUs:</h4>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
          <div 
            v-for="sku in specificProductStock.skus" 
            :key="sku.id"
            class="bg-white p-3 rounded border"
            :class="sku.inStock ? 'border-green-200' : 'border-red-200'"
          >
            <div class="font-medium">{{ sku.name || `SKU #${sku.id}` }}</div>
            <div class="text-sm" :class="sku.inStock ? 'text-green-600' : 'text-red-600'">
              Estoque: {{ sku.stock }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Lista de produtos -->
    <div v-if="products.length > 0">
      <div class="flex justify-between items-center mb-4">
        <h3 class="text-lg font-semibold">Produtos ({{ products.length }})</h3>
        <div v-if="pagination" class="text-sm text-gray-600">
          Página {{ pagination.current_page }} de {{ pagination.total_pages }} 
          ({{ pagination.total }} produtos no total)
        </div>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div 
          v-for="product in products" 
          :key="product.id"
          class="bg-white rounded-lg shadow-md overflow-hidden border"
        >
          <!-- Imagem do produto -->
          <div class="h-48 bg-gray-200 flex items-center justify-center">
            <img 
              v-if="product.images && product.images[0]"
              :src="product.images[0].url"
              :alt="product.name"
              class="h-full w-full object-cover"
              loading="lazy"
              decoding="async"
            >
            <div v-else class="text-gray-500">Sem imagem</div>
          </div>
          
          <!-- Informações do produto -->
          <div class="p-4">
            <h4 class="font-semibold text-lg mb-2">{{ product.name }}</h4>
            <p class="text-sm text-gray-600 mb-3">ID: {{ product.id }}</p>
            
            <!-- Status do estoque -->
            <div class="mb-3">
              <div v-if="getProductStockInfo(product).inStock" class="flex items-center text-green-600">
                <span class="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                Em estoque ({{ getProductStockInfo(product).totalStock }})
              </div>
              <div v-else class="flex items-center text-red-600">
                <span class="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                Sem estoque
              </div>
            </div>
            
            <!-- SKUs -->
            <div v-if="product.skus && product.skus.length > 0">
              <div class="text-sm font-medium mb-2">SKUs ({{ product.skus.length }}):</div>
              <div class="space-y-1">
                <div 
                  v-for="sku in product.skus.slice(0, 3)" 
                  :key="sku.id"
                  class="text-xs p-2 rounded"
                  :class="(sku.total_in_stock || 0) > 0 ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'"
                >
                  {{ sku.title || `SKU #${sku.id}` }} - Estoque: {{ sku.total_in_stock || 0 }}
                </div>
                <div v-if="product.skus.length > 3" class="text-xs text-gray-500">
                  +{{ product.skus.length - 3 }} SKUs adicionais
                </div>
              </div>
            </div>
            
            <!-- Preço -->
            <div v-if="product.price" class="mt-3 pt-3 border-t">
              <div class="text-lg font-bold text-blue-600">
                R$ {{ formatPrice(product.price) }}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Paginação -->
      <div v-if="pagination && pagination.total_pages > 1" class="mt-6 flex justify-center gap-2">
        <button 
          @click="loadPage(pagination.current_page - 1)"
          :disabled="pagination.current_page <= 1 || loading"
          class="px-3 py-1 border rounded disabled:opacity-50"
        >
          Anterior
        </button>
        <span class="px-3 py-1">
          {{ pagination.current_page }} / {{ pagination.total_pages }}
        </span>
        <button 
          @click="loadPage(pagination.current_page + 1)"
          :disabled="pagination.current_page >= pagination.total_pages || loading"
          class="px-3 py-1 border rounded disabled:opacity-50"
        >
          Próxima
        </button>
      </div>
    </div>
    
    <!-- Estado vazio -->
    <div v-else-if="!loading && !error" class="text-center py-12">
      <div class="text-gray-500 text-lg mb-4">📦</div>
      <p class="text-gray-600">Clique em "Carregar Produtos" para ver os produtos da sua loja Yampi</p>
    </div>
  </div>
</template>

<script>
import yampiApi from '../services/yampiApi.js';

export default {
  name: 'YampiProducts',
  data() {
    return {
      products: [],
      loading: false,
      error: null,
      pagination: null,
      productIdToCheck: '',
      specificProductStock: null
    };
  },
  methods: {
    // Removido: updateApiConfig (credenciais agora ficam no servidor)
    async loadProducts(page = 1) {
      this.loading = true;
      this.error = null;
      this.specificProductStock = null;
      try {
        const response = await yampiApi.getProducts({
          include: 'skus,images',
          limit: 12,
          page,
          skipCache: true
        });
        this.products = response.data || [];
        this.pagination = response.meta?.pagination || null;
      } catch (error) {
        this.error = `Erro ao carregar produtos: ${error.message}`;
        this.products = [];
      } finally {
        this.loading = false;
      }
    },
    async loadProductsInStock() {
      this.loading = true;
      this.error = null;
      this.specificProductStock = null;
      try {
        const response = await yampiApi.getProductsInStock();
        this.products = response.data || [];
        this.pagination = response.meta?.pagination || null;
      } catch (error) {
        this.error = `Erro ao carregar produtos em estoque: ${error.message}`;
        this.products = [];
      } finally {
        this.loading = false;
      }
    },
    async checkSpecificProduct() {
      if (!this.productIdToCheck) {
        this.error = 'Digite o ID do produto';
        return;
      }
      this.loading = true;
      this.error = null;
      try {
        this.specificProductStock = await yampiApi.checkProductStock(this.productIdToCheck);
      } catch (error) {
        this.error = `Erro ao verificar estoque do produto: ${error.message}`;
        this.specificProductStock = null;
      } finally {
        this.loading = false;
      }
    },
    loadPage(page) {
      this.loadProducts(page);
    },
    getProductStockInfo(product) {
      if (!product.skus || !Array.isArray(product.skus)) {
        return { inStock: false, totalStock: 0 };
      }
      
      const totalStock = product.skus.reduce((total, sku) => {
        return total + (sku.total_in_stock || 0);
      }, 0);
      
      return {
        inStock: totalStock > 0,
        totalStock
      };
    },
    
    formatPrice(price) {
      return new Intl.NumberFormat('pt-BR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }).format(price);
    }
  }
};
</script>

<style scoped>
.yampi-products {
  max-width: 1200px;
  margin: 0 auto;
}

code {
  font-family: 'Courier New', monospace;
}
</style>