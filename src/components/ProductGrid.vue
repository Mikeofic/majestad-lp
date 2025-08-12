<script setup lang="ts">
import { ref, reactive, computed } from 'vue'

// Emits
const emit = defineEmits<{
  addToCart: [product: { id: number; name: string; price: number }]
}>()

// Interface para produtos
interface Product {
  id: number
  name: string
  price: number
  originalPrice?: number
  image: string
  category: string
  rating: number
  reviews: number
  isNew?: boolean
  isOnSale?: boolean
}

// Estado reativo
const selectedCategory = ref('todos')
const products = ref<Product[]>([
  {
    id: 1,
    name: 'Relógio Elegante Premium',
    price: 299.99,
    originalPrice: 399.99,
    image: '/placeholder-watch.jpg',
    category: 'acessorios',
    rating: 4.8,
    reviews: 124,
    isOnSale: true
  },
  {
    id: 2,
    name: 'Bolsa de Couro Artesanal',
    price: 189.99,
    image: '/placeholder-bag.jpg',
    category: 'bolsas',
    rating: 4.9,
    reviews: 89,
    isNew: true
  },
  {
    id: 3,
    name: 'Tênis Esportivo Confort',
    price: 159.99,
    originalPrice: 199.99,
    image: '/placeholder-shoes.jpg',
    category: 'calcados',
    rating: 4.7,
    reviews: 203,
    isOnSale: true
  },
  {
    id: 4,
    name: 'Camiseta Premium Cotton',
    price: 79.99,
    image: '/placeholder-shirt.jpg',
    category: 'roupas',
    rating: 4.6,
    reviews: 156
  },
  {
    id: 5,
    name: 'Óculos de Sol Clássico',
    price: 129.99,
    image: '/placeholder-sunglasses.jpg',
    category: 'acessorios',
    rating: 4.8,
    reviews: 78,
    isNew: true
  },
  {
    id: 6,
    name: 'Jaqueta de Couro Vintage',
    price: 349.99,
    originalPrice: 449.99,
    image: '/placeholder-jacket.jpg',
    category: 'roupas',
    rating: 4.9,
    reviews: 67,
    isOnSale: true
  }
])

const categories = [
  { id: 'todos', name: 'Todos os Produtos' },
  { id: 'roupas', name: 'Roupas' },
  { id: 'acessorios', name: 'Acessórios' },
  { id: 'calcados', name: 'Calçados' },
  { id: 'bolsas', name: 'Bolsas' }
]

// Computed para produtos filtrados
const filteredProducts = computed(() => {
  if (selectedCategory.value === 'todos') {
    return products.value
  }
  return products.value.filter(product => product.category === selectedCategory.value)
})

// Função para adicionar ao carrinho
const handleAddToCart = (product: Product) => {
  emit('addToCart', {
    id: product.id,
    name: product.name,
    price: product.price
  })
}
</script>

<template>
  <section class="py-16 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Section Header -->
      <div class="text-center mb-12">
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900 font-serif mb-4">
          Nossos Produtos
        </h2>
        <p class="text-lg text-gray-600 max-w-2xl mx-auto">
          Descubra nossa coleção cuidadosamente selecionada de produtos premium
        </p>
      </div>
      
      <!-- Category Filter -->
      <div class="flex flex-wrap justify-center gap-4 mb-12">
        <button
          v-for="category in categories"
          :key="category.id"
          @click="selectedCategory = category.id"
          :class="[
            'px-6 py-2 rounded-full font-medium transition-all duration-200',
            selectedCategory === category.id
              ? 'bg-primary-500 text-white shadow-lg'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          ]"
        >
          {{ category.name }}
        </button>
      </div>
      
      <!-- Products Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <div
          v-for="product in filteredProducts"
          :key="product.id"
          class="group bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
        >
          <!-- Product Image -->
          <div class="relative aspect-w-4 aspect-h-3 bg-gray-100">
            <!-- Placeholder para imagem do produto -->
            <div class="flex items-center justify-center h-64">
              <svg class="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
            </div>
            
            <!-- Badges -->
            <div class="absolute top-3 left-3 flex flex-col gap-2">
              <span v-if="product.isNew" class="bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
                Novo
              </span>
              <span v-if="product.isOnSale" class="bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
                Oferta
              </span>
            </div>
            
            <!-- Quick Actions -->
            <div class="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <button class="bg-white p-2 rounded-full shadow-md hover:bg-gray-50 transition-colors">
                <svg class="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                </svg>
              </button>
              <button class="bg-white p-2 rounded-full shadow-md hover:bg-gray-50 transition-colors">
                <svg class="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                </svg>
              </button>
            </div>
          </div>
          
          <!-- Product Info -->
          <div class="p-6">
            <div class="mb-2">
              <h3 class="text-lg font-semibold text-gray-900 mb-1 group-hover:text-primary-600 transition-colors">
                {{ product.name }}
              </h3>
              <p class="text-sm text-gray-500 capitalize">{{ product.category }}</p>
            </div>
            
            <!-- Rating -->
            <div class="flex items-center mb-3">
              <div class="flex items-center">
                <svg 
                  v-for="star in 5" 
                  :key="star"
                  :class="[
                    'w-4 h-4',
                    star <= Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'
                  ]"
                  fill="currentColor" 
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
              </div>
              <span class="text-sm text-gray-600 ml-2">
                {{ product.rating }} ({{ product.reviews }} avaliações)
              </span>
            </div>
            
            <!-- Price -->
            <div class="flex items-center justify-between mb-4">
              <div class="flex items-center space-x-2">
                <span class="text-xl font-bold text-primary-600">
                  R$ {{ product.price.toFixed(2) }}
                </span>
                <span 
                  v-if="product.originalPrice" 
                  class="text-sm text-gray-500 line-through"
                >
                  R$ {{ product.originalPrice.toFixed(2) }}
                </span>
              </div>
            </div>
            
            <!-- Add to Cart Button -->
            <button 
              @click="handleAddToCart(product)"
              class="w-full btn-primary flex items-center justify-center space-x-2"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01"></path>
              </svg>
              <span>Adicionar ao Carrinho</span>
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>