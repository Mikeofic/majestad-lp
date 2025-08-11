<script setup lang="ts">
import { ref, reactive, computed, onMounted, onUnmounted } from 'vue'

// Tipos
interface Color {
  id: string
  name: string
  hex: string
  image: string
}

interface SelectedPair {
  color: Color | null
  size: number | null
}

interface SizeOption {
  size: number
  stock: number
}

interface Testimonial {
  id: number
  name: string
  rating: number
  text: string
  verified: boolean
}

// Estado reativo
const selectedPairs = reactive({
  first: { color: null, size: null } as SelectedPair,
  second: { color: null, size: null } as SelectedPair
})

const selectedColor = ref<Color | null>(null)
const selectedSize = ref<number | null>(null)
const selectedPair1 = ref<{ color: Color | null; size: number | null }>({ color: null, size: null })
const selectedPair2 = ref<{ color: Color | null; size: number | null }>({ color: null, size: null })
const openFaq = ref<number | null>(null)
const showStickyBar = ref(false)
const currentImageIndex = ref(0)

// Dados
const colors = [
  {
    id: 'black',
    name: 'Preto Ônix',
    hex: '#000000',
    image: '/pé-salto-branco.png'
  },
  {
    id: 'white',
    name: 'Branco Pérola',
    hex: '#FFFFFF',
    image: '/pe-salto-preto.png'
  }
]

const sizes = [
  { size: 34, stock: 8 },
  { size: 35, stock: 12 },
  { size: 36, stock: 15 },
  { size: 37, stock: 10 },
  { size: 38, stock: 7 },
  { size: 39, stock: 9 },
  { size: 40, stock: 6 },
  { size: 41, stock: 4 },
  { size: 42, stock: 3 }
]

const galleryImages = [
  '/pé-salto-branco.png',
  'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=800',
  'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800',
  'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=800'
]

const testimonials = [
  {
    id: 1,
    name: 'Maria Silva',
    rating: 5,
    text: 'Simplesmente perfeito! O conforto é incrível e o design é elegante. Uso todos os dias e não sinto dor nos pés.',
    verified: true
  },
  {
    id: 2,
    name: 'Ana Costa',
    rating: 5,
    text: 'Melhor compra que fiz! A qualidade é excepcional e combina com tudo. Já comprei o segundo par.',
    verified: true
  },
  {
    id: 3,
    name: 'Juliana Santos',
    rating: 5,
    text: 'Estou apaixonada! O acabamento é impecável e o conforto é surreal. Recomendo de olhos fechados.',
    verified: true
  }
]

const faqs = [
  {
    question: 'Qual é o prazo de entrega?',
    answer: 'Entregamos em todo o Brasil. Para o combo 2 pares, o frete é GRÁTIS e o prazo varia de 3 a 7 dias úteis dependendo da sua região.'
  },
  {
    question: 'Posso trocar se não servir?',
    answer: 'Sim! Você tem 30 dias para trocar sem custo adicional. Basta entrar em contato conosco pelo WhatsApp.'
  },
  {
    question: 'O material é de qualidade?',
    answer: 'Absolutamente! Utilizamos materiais premium importados com certificação de qualidade e durabilidade.'
  },
  {
    question: 'Como funciona a garantia?',
    answer: 'Oferecemos 6 meses de garantia contra defeitos de fabricação. Sua satisfação é nossa prioridade.'
  }
]

// Computed
const isSelectionComplete = computed(() => {
  return selectedPairs.first.color && selectedPairs.first.size &&
         selectedPairs.second.color && selectedPairs.second.size
})

// Métodos
const selectColor = (pairNumber: number, color: Color) => {
  if (pairNumber === 1) {
    selectedPairs.first.color = color
    selectedPair1.value.color = color
  } else {
    selectedPairs.second.color = color
    selectedPair2.value.color = color
  }
  
  // Analytics tracking
  if (typeof gtag !== 'undefined') {
    gtag('event', 'select_color', {
      'pair_index': pairNumber,
      'color': color.id
    })
  }
}

const selectSize = (pairNumber: number, size: number) => {
  if (pairNumber === 1) {
    selectedPairs.first.size = size
    selectedPair1.value.size = size
  } else {
    selectedPairs.second.size = size
    selectedPair2.value.size = size
  }
  
  // Analytics tracking
  if (typeof gtag !== 'undefined') {
    gtag('event', 'select_size', {
      'pair_index': pairNumber,
      'size': size
    })
  }
}

const selectColorPair1 = (color: Color) => selectColor(1, color)
const selectSizePair1 = (size: SizeOption) => selectSize(1, size.size)
const selectColorPair2 = (color: Color) => selectColor(2, color)
const selectSizePair2 = (size: SizeOption) => selectSize(2, size.size)

const scrollToSelector = () => {
  const element = document.getElementById('selector')
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
  
  // Analytics tracking
  if (typeof gtag !== 'undefined') {
    gtag('event', 'click_cta', {
      'cta_location': 'hero'
    })
  }
}

const addToCart = () => {
  if (isSelectionComplete.value) {
    // Analytics tracking
    if (typeof gtag !== 'undefined') {
      gtag('event', 'begin_checkout', {
        'value': 349.90,
        'currency': 'BRL',
        'items': [{
          'item_id': 'combo-2-pares',
          'item_name': 'Combo 2 Pares Majestad',
          'quantity': 1,
          'price': 349.90
        }]
      })
    }
    
    // Cart data prepared for checkout
    
    // Redirect to WhatsApp
    window.open('https://wa.me/5511999999999?text=Olá! Quero garantir meu combo 2 pares por R$ 349,90', '_blank')
  }
}

const toggleFaq = (index: number) => {
  openFaq.value = openFaq.value === index ? null : index
}

const getSizeStock = (size: number) => {
  return sizes.find(s => s.size === size)?.stock || 0
}

const isLowStock = (size: number) => {
  return getSizeStock(size) <= 3
}

const handlePurchase = () => {
  if (selectedPairs.first.color && selectedPairs.first.size && 
      selectedPairs.second.color && selectedPairs.second.size) {
    if (typeof gtag !== 'undefined') {
      gtag('event', 'begin_checkout', {
        event_category: 'ecommerce',
        value: 349.90,
        currency: 'BRL'
      })
    }
    
    // Redirect to WhatsApp with selection details
    const message = `Olá! Quero garantir meu combo 2 pares por R$ 349,90:\nPar 1: ${selectedPairs.first.color?.name} - Tamanho ${selectedPairs.first.size}\nPar 2: ${selectedPairs.second.color?.name} - Tamanho ${selectedPairs.second.size}`
    window.open(`https://wa.me/5511999999999?text=${encodeURIComponent(message)}`, '_blank')
  } else {
    // Show validation message - could be replaced with a toast notification
    console.warn('Seleção incompleta: Por favor, selecione cor e tamanho para ambos os pares.')
  }
}

// Sticky bar visibility
const handleScroll = () => {
  const heroSection = document.querySelector('section')
  if (heroSection) {
    const heroBottom = heroSection.offsetTop + heroSection.offsetHeight
    showStickyBar.value = window.scrollY > heroBottom
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <div id="app" class="min-h-screen bg-[#0B0B0C] text-[#F5F5F5]">
    <!-- Barra Superior Dinâmica -->
    <div class="bg-gradient-to-r from-[#C8AE7D] to-[#E8E2D6] text-[#0B0B0C] text-center py-2 px-4 text-sm font-medium animate-pulse">
      🚚 Frete reduzido para todo o Brasil • 🔥 Oferta termina às 23:59
    </div>

    <!-- Barra/CTA Sticky -->
    <div 
      v-show="showStickyBar"
      class="fixed top-0 left-0 right-0 bg-[#0B0B0C]/95 backdrop-blur-md border-b border-[#C8AE7D]/20 z-50 transition-all duration-300"
    >
      <div class="max-w-6xl mx-auto px-4 py-3">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-4">
            <div class="text-lg font-bold">Majestad</div>
            <div class="hidden md:block text-sm text-[#E8E2D6]">
              Combo 2 pares por apenas R$ 349,90
            </div>
          </div>
          
          <div class="flex items-center space-x-4">
            <div class="text-right">
              <div class="text-sm text-[#E8E2D6]">Economia de 60%</div>
              <div class="text-lg font-bold text-[#C8AE7D]">R$ 349,90</div>
            </div>
            
            <button 
              :disabled="!isSelectionComplete"
              @click="addToCart"
              :class="[
                'px-6 py-2 rounded-full font-semibold transition-all duration-300',
                isSelectionComplete 
                  ? 'bg-gradient-to-r from-[#C8AE7D] to-[#E8E2D6] text-[#0B0B0C] hover:shadow-lg' 
                  : 'bg-gray-600 text-gray-400 cursor-not-allowed'
              ]"
            >
              {{ isSelectionComplete ? 'Garantir' : 'Selecione os pares' }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Hero Section -->
    <section class="relative min-h-screen flex items-center justify-center overflow-hidden">
      <!-- Background Gradient -->
      <div class="absolute inset-0 bg-gradient-to-br from-[#0B0B0C] via-[#1a1a1a] to-[#0B0B0C]"></div>
      
      <!-- Animated Background Elements -->
      <div class="absolute inset-0">
        <div class="absolute top-1/4 left-1/4 w-64 h-64 bg-[#C8AE7D]/5 rounded-full blur-3xl animate-pulse"></div>
        <div class="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#E8E2D6]/3 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>
      
      <div class="relative z-10 max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
        <!-- Content -->
        <div class="text-center lg:text-left">
          <!-- Selo de Oferta -->
          <div class="inline-flex items-center bg-gradient-to-r from-[#C8AE7D] to-[#E8E2D6] text-[#0B0B0C] px-4 py-2 rounded-full text-sm font-semibold mb-6">
            🔥 OFERTA LIMITADA • 60% OFF
          </div>
          
          <h1 class="text-5xl md:text-7xl font-serif font-bold mb-6 leading-tight">
             Sofisticação que <br>
             <span class="text-[#C8AE7D]">transforma</span> seu estilo
           </h1>
           
           <p class="text-xl md:text-2xl text-[#E8E2D6] mb-8 leading-relaxed font-light">
             Atemporal. Sofisticado. <span class="text-[#C8AE7D] font-semibold">Feito para você.</span>
           </p>
          
          <!-- Rating Component -->
          <div class="flex items-center justify-center lg:justify-start mb-8">
            <div class="flex text-yellow-400 text-2xl mr-3">
              <span v-for="i in 5" :key="i">★</span>
            </div>
            <span class="text-lg font-semibold text-[#C8AE7D] mr-2">4.9</span>
            <span class="text-[#E8E2D6]">(2.847 avaliações)</span>
          </div>
          
          <!-- Ancoragem de Valor -->
          <div class="mb-8 p-4 bg-[#C8AE7D]/10 rounded-2xl border border-[#C8AE7D]/20">
            <div class="text-center lg:text-left">
              <div class="text-sm text-[#E8E2D6] mb-1">Preço unitário: <span class="line-through">R$ 437,90</span></div>
              <div class="text-2xl font-bold text-[#C8AE7D]">Combo 2 pares: R$ 349,90</div>
              <div class="text-sm text-green-400 font-medium">Economia de 60% • R$ 525,80 de desconto</div>
            </div>
          </div>
          
          <button 
            @click="scrollToSelector" 
            class="btn-primary text-lg px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:scale-105 shadow-xl"
          >
            Escolher meus pares
          </button>
        </div>
        
        <!-- Hero Image -->
        <div class="relative">
          <div class="relative z-10">
            <img 
              src="/sandalia-branca.png" 
              alt="Sandália Majestad" 
              class="w-full max-w-2xl mx-auto transform hover:scale-105 transition-transform duration-500 filter drop-shadow-2xl"
            />
          </div>
          
          <!-- Floating Elements -->
          <div class="absolute top-1/4 -left-4 bg-[#C8AE7D]/20 backdrop-blur-sm rounded-2xl p-4 animate-float">
            <div class="text-sm font-semibold text-[#C8AE7D]">Conforto</div>
            <div class="text-xs text-[#E8E2D6]">Todo dia</div>
          </div>
          
          <div class="absolute bottom-1/4 -right-4 bg-[#E8E2D6]/20 backdrop-blur-sm rounded-2xl p-4 animate-float delay-1000">
            <div class="text-sm font-semibold text-[#C8AE7D]">Elegância</div>
            <div class="text-xs text-[#E8E2D6]">Atemporal</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Seletor de Compra - Combo 2 pares -->
    <section id="selector" class="py-20 px-4 bg-gradient-to-b from-[#1a1a1a] to-[#0B0B0C]">
      <div class="max-w-6xl mx-auto">
        <div class="text-center mb-12">
          <h2 class="text-4xl md:text-5xl font-serif font-bold mb-6">
            Escolha seus <span class="text-[#C8AE7D]">2 pares</span>
          </h2>
          <p class="text-xl text-[#E8E2D6] max-w-2xl mx-auto mb-8">
            Monte sua combinação perfeita e economize 60%
          </p>
          
          <!-- Ancoragem de Preço -->
          <div class="bg-[#C8AE7D]/10 border border-[#C8AE7D]/20 rounded-2xl p-6 max-w-md mx-auto mb-12">
            <div class="text-sm text-[#E8E2D6] mb-2">Preço unitário: <span class="line-through text-red-400">R$ 437,90</span></div>
            <div class="text-3xl font-bold text-[#C8AE7D] mb-2">Combo: R$ 349,90</div>
            <div class="text-green-400 font-semibold">Economia de R$ 525,80 (60%)</div>
          </div>
        </div>
        
        <!-- Seletor de Pares - Layout Inspirado Michael Kors -->
        <div class="max-w-5xl mx-auto">
          <!-- Header da Seleção -->
          <div class="text-center mb-12">
            <div class="inline-flex items-center bg-[#C8AE7D]/10 border border-[#C8AE7D]/30 rounded-full px-6 py-2 mb-4">
              <svg class="w-5 h-5 text-[#C8AE7D] mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <span class="text-[#C8AE7D] font-semibold text-sm">COMBO PERSONALIZADO</span>
            </div>
            <h3 class="text-2xl font-bold text-[#E8E2D6] mb-2">Monte sua combinação perfeita</h3>
            <p class="text-[#E8E2D6]/70">Selecione cor e tamanho para cada par</p>
          </div>

          <!-- Grid Principal -->
          <div class="grid lg:grid-cols-3 gap-8 mb-12">
            <!-- Par 1 -->
            <div class="bg-gradient-to-br from-[#C8AE7D]/5 to-[#E8E2D6]/5 backdrop-blur-sm border border-[#C8AE7D]/20 rounded-2xl overflow-hidden">
              <!-- Header do Par -->
              <div class="bg-gradient-to-r from-[#C8AE7D]/20 to-[#E8E2D6]/20 px-6 py-4 border-b border-[#C8AE7D]/20">
                <div class="flex items-center justify-between">
                  <div class="flex items-center">
                    <span class="bg-[#C8AE7D] text-[#0B0B0C] w-6 h-6 rounded-full inline-flex items-center justify-center text-sm font-bold mr-3">1</span>
                    <span class="font-semibold text-[#E8E2D6]">Primeiro Par</span>
                  </div>
                  <div v-if="selectedPairs.first.color && selectedPairs.first.size" class="text-[#C8AE7D] text-sm font-medium">
                    ✓ Selecionado
                  </div>
                </div>
              </div>

              <!-- Conteúdo do Par -->
              <div class="p-6">
                <!-- Preview da Imagem -->
                <div class="mb-6">
                  <div class="aspect-square bg-gradient-to-br from-[#C8AE7D]/10 to-[#E8E2D6]/10 rounded-xl border border-[#C8AE7D]/20 overflow-hidden">
                    <img 
                      v-if="selectedPairs.first.color"
                      :src="selectedPairs.first.color.image"
                      :alt="selectedPairs.first.color.name"
                      class="w-full h-full object-cover transition-all duration-500"
                    />
                    <div v-else class="w-full h-full flex flex-col items-center justify-center text-[#E8E2D6]/40">
                      <svg class="w-12 h-12 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                      </svg>
                      <span class="text-xs">Selecione uma cor</span>
                    </div>
                  </div>
                  <div v-if="selectedPairs.first.color" class="mt-3 text-center">
                    <p class="text-[#C8AE7D] font-semibold">{{ selectedPairs.first.color.name }}</p>
                    <p v-if="selectedPairs.first.size" class="text-[#E8E2D6]/70 text-sm">Tamanho {{ selectedPairs.first.size }}</p>
                  </div>
                </div>

                <!-- Seleção de Cores -->
                <div class="mb-6">
                  <h4 class="text-sm font-semibold mb-3 text-[#E8E2D6] uppercase tracking-wide">Cores</h4>
                  <div class="flex gap-3">
                    <button 
                      v-for="color in colors" 
                      :key="'pair1-' + color.id"
                      @click="selectColor(1, color)"
                      :class="[
                        'relative w-12 h-12 rounded-lg border-2 transition-all duration-300 hover:scale-110 overflow-hidden',
                        selectedPairs.first.color?.id === color.id 
                          ? 'border-[#C8AE7D] ring-2 ring-[#C8AE7D]/30' 
                          : 'border-[#E8E2D6]/30 hover:border-[#C8AE7D]/50'
                      ]"
                    >
                      <img 
                        :src="color.image"
                        :alt="color.name"
                        class="w-full h-full object-cover"
                      />
                      <div v-if="selectedPairs.first.color?.id === color.id" class="absolute inset-0 bg-[#C8AE7D]/20 flex items-center justify-center">
                        <svg class="w-4 h-4 text-[#C8AE7D]" fill="currentColor" viewBox="0 0 20 20">
                          <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                        </svg>
                      </div>
                    </button>
                  </div>
                </div>

                <!-- Seleção de Tamanhos -->
                <div>
                  <h4 class="text-sm font-semibold mb-3 text-[#E8E2D6] uppercase tracking-wide">Numeração</h4>
                  <div class="grid grid-cols-3 gap-2">
                    <button 
                      v-for="size in sizes" 
                      :key="'pair1-' + size.size"
                      @click="selectSize(1, size.size)"
                      :class="[
                        'py-2 px-3 rounded-lg border text-sm font-medium transition-all duration-300 hover:scale-105',
                        selectedPairs.first.size === size.size 
                          ? 'border-[#C8AE7D] bg-[#C8AE7D] text-[#0B0B0C]' 
                          : 'border-[#E8E2D6]/30 text-[#E8E2D6] hover:border-[#C8AE7D]/50'
                      ]"
                    >
                      {{ size.size }}
                      <div v-if="isLowStock(size.size)" class="text-xs mt-0.5 text-yellow-400">{{ getSizeStock(size.size) }} rest.</div>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <!-- Par 2 -->
            <div class="bg-gradient-to-br from-[#C8AE7D]/5 to-[#E8E2D6]/5 backdrop-blur-sm border border-[#C8AE7D]/20 rounded-2xl overflow-hidden">
              <!-- Header do Par -->
              <div class="bg-gradient-to-r from-[#C8AE7D]/20 to-[#E8E2D6]/20 px-6 py-4 border-b border-[#C8AE7D]/20">
                <div class="flex items-center justify-between">
                  <div class="flex items-center">
                    <span class="bg-[#C8AE7D] text-[#0B0B0C] w-6 h-6 rounded-full inline-flex items-center justify-center text-sm font-bold mr-3">2</span>
                    <span class="font-semibold text-[#E8E2D6]">Segundo Par</span>
                  </div>
                  <div v-if="selectedPairs.second.color && selectedPairs.second.size" class="text-[#C8AE7D] text-sm font-medium">
                    ✓ Selecionado
                  </div>
                </div>
              </div>

              <!-- Conteúdo do Par -->
              <div class="p-6">
                <!-- Preview da Imagem -->
                <div class="mb-6">
                  <div class="aspect-square bg-gradient-to-br from-[#C8AE7D]/10 to-[#E8E2D6]/10 rounded-xl border border-[#C8AE7D]/20 overflow-hidden">
                    <img 
                      v-if="selectedPairs.second.color"
                      :src="selectedPairs.second.color.image"
                      :alt="selectedPairs.second.color.name"
                      class="w-full h-full object-cover transition-all duration-500"
                    />
                    <div v-else class="w-full h-full flex flex-col items-center justify-center text-[#E8E2D6]/40">
                      <svg class="w-12 h-12 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                      </svg>
                      <span class="text-xs">Selecione uma cor</span>
                    </div>
                  </div>
                  <div v-if="selectedPairs.second.color" class="mt-3 text-center">
                    <p class="text-[#C8AE7D] font-semibold">{{ selectedPairs.second.color.name }}</p>
                    <p v-if="selectedPairs.second.size" class="text-[#E8E2D6]/70 text-sm">Tamanho {{ selectedPairs.second.size }}</p>
                  </div>
                </div>

                <!-- Seleção de Cores -->
                <div class="mb-6">
                  <h4 class="text-sm font-semibold mb-3 text-[#E8E2D6] uppercase tracking-wide">Cores</h4>
                  <div class="flex gap-3">
                    <button 
                      v-for="color in colors" 
                      :key="'pair2-' + color.id"
                      @click="selectColor(2, color)"
                      :class="[
                        'relative w-12 h-12 rounded-lg border-2 transition-all duration-300 hover:scale-110 overflow-hidden',
                        selectedPairs.second.color?.id === color.id 
                          ? 'border-[#C8AE7D] ring-2 ring-[#C8AE7D]/30' 
                          : 'border-[#E8E2D6]/30 hover:border-[#C8AE7D]/50'
                      ]"
                    >
                      <img 
                        :src="color.image"
                        :alt="color.name"
                        class="w-full h-full object-cover"
                      />
                      <div v-if="selectedPairs.second.color?.id === color.id" class="absolute inset-0 bg-[#C8AE7D]/20 flex items-center justify-center">
                        <svg class="w-4 h-4 text-[#C8AE7D]" fill="currentColor" viewBox="0 0 20 20">
                          <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                        </svg>
                      </div>
                    </button>
                  </div>
                </div>

                <!-- Seleção de Tamanhos -->
                <div>
                  <h4 class="text-sm font-semibold mb-3 text-[#E8E2D6] uppercase tracking-wide">Numeração</h4>
                  <div class="grid grid-cols-3 gap-2">
                    <button 
                      v-for="size in sizes" 
                      :key="'pair2-' + size.size"
                      @click="selectSize(2, size.size)"
                      :class="[
                        'py-2 px-3 rounded-lg border text-sm font-medium transition-all duration-300 hover:scale-105',
                        selectedPairs.second.size === size.size 
                          ? 'border-[#C8AE7D] bg-[#C8AE7D] text-[#0B0B0C]' 
                          : 'border-[#E8E2D6]/30 text-[#E8E2D6] hover:border-[#C8AE7D]/50'
                      ]"
                    >
                      {{ size.size }}
                      <div v-if="isLowStock(size.size)" class="text-xs mt-0.5 text-yellow-400">{{ getSizeStock(size.size) }} rest.</div>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <!-- Resumo e CTA -->
            <div class="bg-gradient-to-br from-[#C8AE7D]/10 to-[#E8E2D6]/10 backdrop-blur-sm border border-[#C8AE7D]/20 rounded-2xl overflow-hidden">
              <!-- Header do Resumo -->
              <div class="bg-gradient-to-r from-[#C8AE7D]/20 to-[#E8E2D6]/20 px-6 py-4 border-b border-[#C8AE7D]/20">
                <div class="flex items-center">
                  <svg class="w-5 h-5 text-[#C8AE7D] mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"></path>
                  </svg>
                  <span class="font-semibold text-[#E8E2D6]">Resumo do Combo</span>
                </div>
              </div>

              <!-- Conteúdo do Resumo -->
              <div class="p-6">
                <!-- Lista de Seleções -->
                <div class="space-y-4 mb-6">
                  <div class="flex items-center justify-between py-3 px-4 bg-[#C8AE7D]/5 rounded-lg border border-[#C8AE7D]/10">
                    <div class="flex items-center">
                      <span class="bg-[#C8AE7D] text-[#0B0B0C] w-5 h-5 rounded-full inline-flex items-center justify-center text-xs font-bold mr-3">1</span>
                      <div>
                        <p class="text-[#E8E2D6] font-medium text-sm">
                          {{ selectedPairs.first.color ? selectedPairs.first.color.name : 'Cor não selecionada' }}
                        </p>
                        <p class="text-[#E8E2D6]/60 text-xs">
                          {{ selectedPairs.first.size ? `Tamanho ${selectedPairs.first.size}` : 'Tamanho não selecionado' }}
                        </p>
                      </div>
                    </div>
                    <div v-if="selectedPairs.first.color && selectedPairs.first.size" class="text-[#C8AE7D]">
                      <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                      </svg>
                    </div>
                  </div>

                  <div class="flex items-center justify-between py-3 px-4 bg-[#C8AE7D]/5 rounded-lg border border-[#C8AE7D]/10">
                    <div class="flex items-center">
                      <span class="bg-[#C8AE7D] text-[#0B0B0C] w-5 h-5 rounded-full inline-flex items-center justify-center text-xs font-bold mr-3">2</span>
                      <div>
                        <p class="text-[#E8E2D6] font-medium text-sm">
                          {{ selectedPairs.second.color ? selectedPairs.second.color.name : 'Cor não selecionada' }}
                        </p>
                        <p class="text-[#E8E2D6]/60 text-xs">
                          {{ selectedPairs.second.size ? `Tamanho ${selectedPairs.second.size}` : 'Tamanho não selecionado' }}
                        </p>
                      </div>
                    </div>
                    <div v-if="selectedPairs.second.color && selectedPairs.second.size" class="text-[#C8AE7D]">
                      <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                      </svg>
                    </div>
                  </div>
                </div>

                <!-- Preço -->
                <div class="text-center mb-6">
                  <div class="text-sm text-[#E8E2D6]/60 line-through mb-1">De R$ 875,80</div>
                  <div class="text-3xl font-bold text-[#C8AE7D] mb-2">R$ 349,90</div>
                  <div class="text-sm text-green-400 font-medium">Economia de 60%</div>
                </div>

                <!-- Botão de Compra -->
                <button 
                  :disabled="!isSelectionComplete"
                  @click="addToCart"
                  :class="[
                    'w-full py-4 rounded-xl text-lg font-semibold transition-all duration-300 flex items-center justify-center',
                    isSelectionComplete 
                      ? 'bg-gradient-to-r from-[#C8AE7D] to-[#E8AE7D] text-[#0B0B0C] hover:shadow-2xl hover:scale-105' 
                      : 'bg-[#E8E2D6]/20 text-[#E8E2D6]/50 cursor-not-allowed border border-[#E8E2D6]/20'
                  ]"
                >
                  <svg v-if="isSelectionComplete" class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01"></path>
                  </svg>
                  {{ isSelectionComplete ? 'Garantir meu Combo' : 'Selecione os 2 pares' }}
                </button>

                <!-- Benefícios -->
                <div class="mt-4 space-y-2">
                  <div class="flex items-center text-xs text-[#E8E2D6]/70">
                    <svg class="w-3 h-3 text-[#C8AE7D] mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                    </svg>
                    Frete grátis para todo o Brasil
                  </div>
                  <div class="flex items-center text-xs text-[#E8E2D6]/70">
                    <svg class="w-3 h-3 text-[#C8AE7D] mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                    </svg>
                    30 dias para troca gratuita
                  </div>
                  <div class="flex items-center text-xs text-[#E8E2D6]/70">
                    <svg class="w-3 h-3 text-[#C8AE7D] mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                    </svg>
                    6 meses de garantia
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Resumo da Seleção e CTA -->
        <div class="max-w-2xl mx-auto">
          <div class="bg-gradient-to-r from-[#C8AE7D]/10 to-[#E8E2D6]/10 backdrop-blur-sm border border-[#C8AE7D]/20 rounded-3xl p-8">
            <h3 class="text-2xl font-bold text-center mb-6">Resumo do seu combo</h3>
            
            <div class="space-y-4 mb-8">
              <div class="space-y-2 text-[#E8E2D6] mb-6">
                <div v-if="selectedPairs.first.color && selectedPairs.first.size">
                  1º par: {{ selectedPairs.first.color?.name }} - Tamanho {{ selectedPairs.first.size }}
                </div>
                <div v-if="selectedPairs.second.color && selectedPairs.second.size">
                  2º par: {{ selectedPairs.second.color?.name }} - Tamanho {{ selectedPairs.second.size }}
                </div>
              </div>
              <div class="text-3xl font-bold text-[#C8AE7D] mb-2">R$ 349,90</div>
              <div class="text-sm text-[#E8E2D6] line-through mb-4">De R$ 875,80</div>
              
              <button 
                :disabled="!isSelectionComplete"
                @click="addToCart"
                :class="[
                  'w-full py-4 rounded-full text-xl font-semibold transition-all duration-300',
                  isSelectionComplete 
                    ? 'bg-gradient-to-r from-[#C8AE7D] to-[#E8E2D6] text-[#0B0B0C] hover:shadow-2xl hover:scale-105' 
                    : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                ]"
              >
                {{ isSelectionComplete ? 'Garantir meu Majestad' : 'Selecione cor e tamanho dos 2 pares' }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Galeria Premium + Zoom -->
    <section class="py-20 px-4">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-4xl md:text-5xl font-serif font-bold mb-6">
            Design <span class="text-[#C8AE7D]">minimalista</span> e exclusivo
          </h2>
          <p class="text-xl text-[#E8E2D6] max-w-2xl mx-auto">
            Cada detalhe pensado para elevar seu estilo com sofisticação atemporal
          </p>
        </div>
        
        <!-- Galeria Principal -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <!-- Imagem Principal Grande -->
          <div class="md:col-span-2 lg:col-span-2 group cursor-pointer">
            <div class="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#C8AE7D]/10 to-[#E8E2D6]/10 aspect-[16/10]">
              <img 
                src="/pé-salto-branco.png"
                alt="Sapato Majestad Preto Ônix - Vista Principal"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
              >
              <div class="absolute inset-0 bg-gradient-to-t from-[#0B0B0C]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div class="absolute bottom-6 left-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h3 class="text-2xl font-bold mb-2">Preto Ônix</h3>
                <p class="text-sm text-[#E8E2D6]">Elegância atemporal</p>
              </div>
            </div>
          </div>
          
          <!-- Imagem Lateral -->
          <div class="group cursor-pointer">
            <div class="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#C8AE7D]/10 to-[#E8E2D6]/10 aspect-[4/5]">
              <img 
                src="/DSC03084.jpg"
                alt="Sapato Majestad Branco Pérola"
                class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                loading="lazy"
              >
              <div class="absolute inset-0 bg-gradient-to-t from-[#0B0B0C]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div class="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h3 class="text-lg font-bold mb-1">Branco Pérola</h3>
                <p class="text-xs text-[#E8E2D6]">Sofisticação pura</p>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Galeria Secundária -->
        <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div class="group cursor-pointer">
            <div class="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#C8AE7D]/10 to-[#E8E2D6]/10 aspect-square">
              <img 
                src="/pe-salto-preto.png"
                alt="Detalhe do acabamento"
                class="w-full h-full object-cover object-bottom group-hover:scale-110 transition-transform duration-500"
                loading="lazy"
              >
              <div class="absolute inset-0 bg-[#0B0B0C]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          </div>
          
          <div class="group cursor-pointer">
            <div class="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#C8AE7D]/10 to-[#E8E2D6]/10 aspect-square">
              <img 
                src="/DSC02989.png"
                alt="Vista lateral"
                class="w-full h-full object-cover object-bottom group-hover:scale-110 transition-transform duration-500"
                loading="lazy"
              >
              <div class="absolute inset-0 bg-[#0B0B0C]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          </div>
          
          <div class="group cursor-pointer">
            <div class="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#C8AE7D]/10 to-[#E8E2D6]/10 aspect-square">
              <img 
                src="/DSC03116.png"
                alt="Detalhe da palmilha"
                class="w-full h-full object-cover object-bottom group-hover:scale-110 transition-transform duration-500"
                loading="lazy"
              >
              <div class="absolute inset-0 bg-[#0B0B0C]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Conforto e Engenharia do Ajuste -->
    <section class="py-20 px-4 bg-gradient-to-b from-[#1a1a1a] to-[#0B0B0C]">
      <div class="max-w-6xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-4xl md:text-5xl font-serif font-bold mb-6">
            Conforto e <span class="text-[#C8AE7D]">Engenharia</span> do Ajuste
          </h2>
          <p class="text-xl text-[#E8E2D6] max-w-3xl mx-auto">
            Desenvolvido com tecnologia avançada para proporcionar conforto prolongado sem comprometer o estilo
          </p>
        </div>
        
        <div class="grid md:grid-cols-3 gap-8 mb-12">
          <div class="text-center">
            <div class="w-20 h-20 bg-gradient-to-r from-[#C8AE7D] to-[#E8E2D6] rounded-full flex items-center justify-center mx-auto mb-6">
              <svg class="w-10 h-10 text-[#0B0B0C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-bold mb-4">Palmilha Anatômica</h3>
            <p class="text-[#E8E2D6] leading-relaxed">
              Desenho ergonômico que se adapta perfeitamente ao formato do pé, distribuindo o peso de forma equilibrada
            </p>
          </div>
          
          <div class="text-center">
            <div class="w-20 h-20 bg-gradient-to-r from-[#C8AE7D] to-[#E8E2D6] rounded-full flex items-center justify-center mx-auto mb-6">
              <svg class="w-10 h-10 text-[#0B0B0C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-bold mb-4">Acolchoado Premium</h3>
            <p class="text-[#E8E2D6] leading-relaxed">
              Espuma de alta densidade no calcanhar e antepé, proporcionando amortecimento superior durante todo o dia
            </p>
          </div>
          
          <div class="text-center">
            <div class="w-20 h-20 bg-gradient-to-r from-[#C8AE7D] to-[#E8E2D6] rounded-full flex items-center justify-center mx-auto mb-6">
              <svg class="w-10 h-10 text-[#0B0B0C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-bold mb-4">Materiais Nobres</h3>
            <p class="text-[#E8E2D6] leading-relaxed">
              Materiais premium e forros respiráveis selecionados para durabilidade e conforto prolongado
            </p>
          </div>
        </div>
        
        <!-- Depoimento de Conforto -->
        <div class="bg-[#C8AE7D]/10 border border-[#C8AE7D]/20 rounded-3xl p-8 max-w-4xl mx-auto text-center">
          <div class="flex justify-center mb-4">
            <div class="flex text-yellow-400 text-2xl">
              <span v-for="i in 5" :key="i">★</span>
            </div>
          </div>
          <p class="text-xl text-[#E8E2D6] mb-6 italic leading-relaxed">
            "Usei o dia todo em um evento e não senti dor alguma! O conforto é realmente excepcional."
          </p>
          <div class="font-semibold text-[#C8AE7D] text-lg">Ana Carolina - Cliente Verificada</div>
        </div>
      </div>
    </section>

    <!-- Prova Social -->
    <section class="py-20 px-4 bg-gradient-to-b from-[#0B0B0C] to-[#1a1a1a]">
      <div class="max-w-6xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-4xl md:text-5xl font-serif font-bold mb-6">
            Quem já usa, <span class="text-[#C8AE7D]">aprova</span>
          </h2>
          
          <!-- Estatísticas -->
          <div class="flex justify-center items-center gap-8 mb-12">
            <div class="text-center">
              <div class="flex items-center justify-center mb-2">
                <div class="flex text-yellow-400 text-2xl">
                  <span v-for="i in 5" :key="i">★</span>
                </div>
                <span class="ml-2 text-3xl font-bold text-[#C8AE7D]">4.9</span>
              </div>
              <p class="text-[#E8E2D6]">Avaliação média</p>
            </div>
            
            <div class="w-px h-16 bg-[#2A2A2A]"></div>
            
            <div class="text-center">
              <div class="text-3xl font-bold text-[#C8AE7D] mb-2">98%</div>
              <p class="text-[#E8E2D6]">Recomendam</p>
            </div>
            
            <div class="w-px h-16 bg-[#2A2A2A]"></div>
            
            <div class="text-center">
              <div class="text-3xl font-bold text-[#C8AE7D] mb-2">2.847</div>
              <p class="text-[#E8E2D6]">Clientes satisfeitas</p>
            </div>
          </div>
        </div>
        
        <!-- Carrossel de Depoimentos -->
        <div class="grid md:grid-cols-3 gap-8 mb-16">
          <div v-for="(testimonial, index) in testimonials" :key="index" class="bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl p-6">
            <div class="flex items-center mb-4">
              <div class="flex text-yellow-400 text-lg mr-3">
                <span v-for="i in 5" :key="i">★</span>
              </div>
              <span class="text-[#C8AE7D] font-semibold">5.0</span>
            </div>
            
            <p class="text-[#E8E2D6] mb-6 leading-relaxed italic">
              "{{ testimonial.text }}"
            </p>
            
            <div class="flex items-center">
              <div class="w-12 h-12 bg-gradient-to-r from-[#C8AE7D] to-[#E8E2D6] rounded-full flex items-center justify-center mr-4">
                <span class="text-[#0B0B0C] font-bold text-lg">{{ testimonial.name.charAt(0) }}</span>
              </div>
              <div>
                <div class="font-semibold">{{ testimonial.name }}</div>
                <div class="text-sm text-[#E8E2D6]">Cliente verificada</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Guia de Tamanhos -->
    <section class="py-20 px-4 bg-gradient-to-b from-[#1a1a1a] to-[#0B0B0C]">
      <div class="max-w-4xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-4xl md:text-5xl font-serif font-bold mb-6">
            Guia de <span class="text-[#C8AE7D]">Tamanhos</span>
          </h2>
          <p class="text-xl text-[#E8E2D6] max-w-2xl mx-auto">
            Encontre o tamanho perfeito para máximo conforto
          </p>
        </div>
        
        <!-- Tabela de Tamanhos -->
        <div class="bg-[#C8AE7D]/10 border border-[#C8AE7D]/20 rounded-3xl p-8 mb-8">
          <div class="overflow-x-auto">
            <table class="w-full text-center">
              <thead>
                <tr class="border-b border-[#C8AE7D]/30">
                  <th class="py-4 px-6 text-[#C8AE7D] font-bold text-lg">Tamanho BR</th>
                  <th class="py-4 px-6 text-[#C8AE7D] font-bold text-lg">Comprimento (cm)</th>
                  <th class="py-4 px-6 text-[#C8AE7D] font-bold text-lg">Largura (cm)</th>
                </tr>
              </thead>
              <tbody class="text-[#E8E2D6]">
                <tr class="border-b border-[#C8AE7D]/10">
                  <td class="py-4 px-6 font-semibold">34</td>
                  <td class="py-4 px-6">22,0</td>
                  <td class="py-4 px-6">8,5</td>
                </tr>
                <tr class="border-b border-[#C8AE7D]/10">
                  <td class="py-4 px-6 font-semibold">35</td>
                  <td class="py-4 px-6">22,7</td>
                  <td class="py-4 px-6">8,7</td>
                </tr>
                <tr class="border-b border-[#C8AE7D]/10">
                  <td class="py-4 px-6 font-semibold">36</td>
                  <td class="py-4 px-6">23,3</td>
                  <td class="py-4 px-6">8,9</td>
                </tr>
                <tr class="border-b border-[#C8AE7D]/10">
                  <td class="py-4 px-6 font-semibold">37</td>
                  <td class="py-4 px-6">24,0</td>
                  <td class="py-4 px-6">9,1</td>
                </tr>
                <tr class="border-b border-[#C8AE7D]/10">
                  <td class="py-4 px-6 font-semibold">38</td>
                  <td class="py-4 px-6">24,7</td>
                  <td class="py-4 px-6">9,3</td>
                </tr>
                <tr class="border-b border-[#C8AE7D]/10">
                  <td class="py-4 px-6 font-semibold">39</td>
                  <td class="py-4 px-6">25,3</td>
                  <td class="py-4 px-6">9,5</td>
                </tr>
                <tr>
                  <td class="py-4 px-6 font-semibold">40</td>
                  <td class="py-4 px-6">26,0</td>
                  <td class="py-4 px-6">9,7</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        <!-- Dicas de Medição -->
        <div class="grid md:grid-cols-2 gap-8">
          <div class="bg-gradient-to-br from-[#C8AE7D]/10 to-[#E8E2D6]/10 rounded-3xl p-8">
            <h3 class="text-2xl font-bold mb-4 text-[#C8AE7D]">Como medir seu pé</h3>
            <ol class="text-[#E8E2D6] space-y-3">
              <li class="flex items-start">
                <span class="bg-[#C8AE7D] text-[#0B0B0C] rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">1</span>
                Coloque uma folha de papel no chão
              </li>
              <li class="flex items-start">
                <span class="bg-[#C8AE7D] text-[#0B0B0C] rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">2</span>
                Pise sobre a folha com o pé descalço
              </li>
              <li class="flex items-start">
                <span class="bg-[#C8AE7D] text-[#0B0B0C] rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">3</span>
                Marque o ponto mais longo do dedão
              </li>
              <li class="flex items-start">
                <span class="bg-[#C8AE7D] text-[#0B0B0C] rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">4</span>
                Meça a distância do calcanhar até a marca
              </li>
            </ol>
          </div>
          
          <div class="bg-gradient-to-br from-[#C8AE7D]/10 to-[#E8E2D6]/10 rounded-3xl p-8">
            <h3 class="text-2xl font-bold mb-4 text-[#C8AE7D]">Dica importante</h3>
            <div class="bg-[#C8AE7D]/20 border border-[#C8AE7D]/30 rounded-2xl p-6">
              <p class="text-[#E8E2D6] text-lg leading-relaxed">
                <strong class="text-[#C8AE7D]">Ficou entre dois tamanhos?</strong><br>
                Prefira sempre o maior. Nossos sapatos têm ajuste anatômico que se adapta perfeitamente ao seu pé.
              </p>
            </div>
            
            <div class="mt-6 text-center">
              <p class="text-sm text-[#E8E2D6] mb-4">Ainda com dúvidas?</p>
              <button class="bg-gradient-to-r from-[#C8AE7D] to-[#E8E2D6] text-[#0B0B0C] px-6 py-3 rounded-full font-bold hover:shadow-lg transition-all duration-300">
                Falar com Especialista
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Política de Troca & Devolução -->
    <section class="py-20 px-4">
      <div class="max-w-6xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-4xl md:text-5xl font-serif font-bold mb-6">
            Troca e <span class="text-[#C8AE7D]">Devolução</span> sem dor
          </h2>
          <p class="text-xl text-[#E8E2D6] max-w-3xl mx-auto">
            Sua satisfação é nossa prioridade. Processo simples e humanizado
          </p>
        </div>
        
        <div class="grid md:grid-cols-3 gap-8 mb-12">
          <div class="text-center">
            <div class="w-20 h-20 bg-gradient-to-r from-[#C8AE7D] to-[#E8E2D6] rounded-full flex items-center justify-center mx-auto mb-6">
              <svg class="w-10 h-10 text-[#0B0B0C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
              </svg>
            </div>
            <h3 class="text-xl font-bold mb-4">1ª Troca Grátis</h3>
            <p class="text-[#E8E2D6] leading-relaxed">
              Primeira troca por tamanho ou cor sem custo adicional. Você só paga se quiser trocar novamente.
            </p>
          </div>
          
          <div class="text-center">
            <div class="w-20 h-20 bg-gradient-to-r from-[#C8AE7D] to-[#E8E2D6] rounded-full flex items-center justify-center mx-auto mb-6">
              <svg class="w-10 h-10 text-[#0B0B0C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-bold mb-4">30 Dias Corridos</h3>
            <p class="text-[#E8E2D6] leading-relaxed">
              Prazo generoso para você testar e ter certeza. Conte a partir do recebimento do produto.
            </p>
          </div>
          
          <div class="text-center">
            <div class="w-20 h-20 bg-gradient-to-r from-[#C8AE7D] to-[#E8E2D6] rounded-full flex items-center justify-center mx-auto mb-6">
              <svg class="w-10 h-10 text-[#0B0B0C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-bold mb-4">Atendimento Humano</h3>
            <p class="text-[#E8E2D6] leading-relaxed">
              Fale direto com nossa equipe via WhatsApp. Sem robôs, sem complicação.
            </p>
          </div>
        </div>
        
        <!-- Processo Simplificado -->
        <div class="bg-[#C8AE7D]/10 border border-[#C8AE7D]/20 rounded-3xl p-8 mb-8">
          <h3 class="text-2xl font-bold mb-8 text-center text-[#C8AE7D]">Como solicitar troca ou devolução</h3>
          
          <div class="grid md:grid-cols-4 gap-6">
            <div class="text-center">
              <div class="bg-[#C8AE7D] text-[#0B0B0C] rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 font-bold text-lg">1</div>
              <h4 class="font-bold mb-2">Entre em contato</h4>
              <p class="text-sm text-[#E8E2D6]">WhatsApp ou e-mail com seu pedido</p>
            </div>
            
            <div class="text-center">
              <div class="bg-[#C8AE7D] text-[#0B0B0C] rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 font-bold text-lg">2</div>
              <h4 class="font-bold mb-2">Receba a etiqueta</h4>
              <p class="text-sm text-[#E8E2D6]">Enviamos etiqueta de postagem gratuita</p>
            </div>
            
            <div class="text-center">
              <div class="bg-[#C8AE7D] text-[#0B0B0C] rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 font-bold text-lg">3</div>
              <h4 class="font-bold mb-2">Envie o produto</h4>
              <p class="text-sm text-[#E8E2D6]">Na embalagem original, pelos Correios</p>
            </div>
            
            <div class="text-center">
              <div class="bg-[#C8AE7D] text-[#0B0B0C] rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 font-bold text-lg">4</div>
              <h4 class="font-bold mb-2">Receba o novo</h4>
              <p class="text-sm text-[#E8E2D6]">Produto novo ou reembolso em até 7 dias</p>
            </div>
          </div>
        </div>
        
        <!-- CTA Troca -->
        <div class="text-center">
          <button class="bg-gradient-to-r from-[#C8AE7D] to-[#E8E2D6] text-[#0B0B0C] px-8 py-4 rounded-full font-bold text-lg hover:shadow-lg transition-all duration-300">
            Solicitar Troca no WhatsApp
          </button>
          <p class="text-sm text-[#E8E2D6] mt-4">Resposta em até 2 horas úteis</p>
        </div>
      </div>
    </section>

    <!-- Entrega, Prazos e Frete -->
    <section class="py-20 px-4 bg-gradient-to-b from-[#1a1a1a] to-[#0B0B0C]">
      <div class="max-w-6xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-4xl md:text-5xl font-serif font-bold mb-6">
            Entrega <span class="text-[#C8AE7D]">Segura</span> e Rápida
          </h2>
          <p class="text-xl text-[#E8E2D6] max-w-3xl mx-auto">
            Receba seu Majestad com segurança e acompanhe cada etapa da entrega
          </p>
        </div>
        
        <!-- Prazos por Região -->
        <div class="grid md:grid-cols-3 gap-8 mb-12">
          <div class="bg-[#C8AE7D]/10 border border-[#C8AE7D]/20 rounded-3xl p-8 text-center">
            <div class="w-16 h-16 bg-gradient-to-r from-[#C8AE7D] to-[#E8E2D6] rounded-full flex items-center justify-center mx-auto mb-6">
              <svg class="w-8 h-8 text-[#0B0B0C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-bold mb-4 text-[#C8AE7D]">Sudeste</h3>
            <p class="text-3xl font-bold mb-2">2-4 dias</p>
            <p class="text-[#E8E2D6] text-sm">SP, RJ, MG, ES</p>
          </div>
          
          <div class="bg-[#C8AE7D]/10 border border-[#C8AE7D]/20 rounded-3xl p-8 text-center">
            <div class="w-16 h-16 bg-gradient-to-r from-[#C8AE7D] to-[#E8E2D6] rounded-full flex items-center justify-center mx-auto mb-6">
              <svg class="w-8 h-8 text-[#0B0B0C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-bold mb-4 text-[#C8AE7D]">Sul</h3>
            <p class="text-3xl font-bold mb-2">3-6 dias</p>
            <p class="text-[#E8E2D6] text-sm">RS, SC, PR</p>
          </div>
          
          <div class="bg-[#C8AE7D]/10 border border-[#C8AE7D]/20 rounded-3xl p-8 text-center">
            <div class="w-16 h-16 bg-gradient-to-r from-[#C8AE7D] to-[#E8E2D6] rounded-full flex items-center justify-center mx-auto mb-6">
              <svg class="w-8 h-8 text-[#0B0B0C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-bold mb-4 text-[#C8AE7D]">Demais Regiões</h3>
            <p class="text-3xl font-bold mb-2">5-10 dias</p>
            <p class="text-[#E8E2D6] text-sm">Norte, Nordeste, Centro-Oeste</p>
          </div>
        </div>
        
        <!-- Benefícios da Entrega -->
        <div class="grid md:grid-cols-2 gap-8">
          <div class="space-y-6">
            <div class="flex items-start space-x-4">
              <div class="w-12 h-12 bg-[#C8AE7D] rounded-full flex items-center justify-center flex-shrink-0">
                <svg class="w-6 h-6 text-[#0B0B0C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <div>
                <h4 class="font-bold text-lg mb-2">Rastreio em Tempo Real</h4>
                <p class="text-[#E8E2D6]">Acompanhe seu pedido desde a saída até a entrega, com atualizações automáticas via WhatsApp</p>
              </div>
            </div>
            
            <div class="flex items-start space-x-4">
              <div class="w-12 h-12 bg-[#C8AE7D] rounded-full flex items-center justify-center flex-shrink-0">
                <svg class="w-6 h-6 text-[#0B0B0C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
                </svg>
              </div>
              <div>
                <h4 class="font-bold text-lg mb-2">Embalagem Discreta</h4>
                <p class="text-[#E8E2D6]">Caixa neutra e protegida, sem identificação externa do conteúdo para sua privacidade</p>
              </div>
            </div>
            
            <div class="flex items-start space-x-4">
              <div class="w-12 h-12 bg-[#C8AE7D] rounded-full flex items-center justify-center flex-shrink-0">
                <svg class="w-6 h-6 text-[#0B0B0C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                </svg>
              </div>
              <div>
                <h4 class="font-bold text-lg mb-2">Seguro Incluso</h4>
                <p class="text-[#E8E2D6]">Todos os envios com seguro total contra extravio, danos ou roubo durante o transporte</p>
              </div>
            </div>
          </div>
          
          <div class="bg-gradient-to-br from-[#C8AE7D]/10 to-[#E8E2D6]/10 rounded-3xl p-8">
            <h3 class="text-2xl font-bold mb-6 text-[#C8AE7D]">Frete Promocional</h3>
            <div class="space-y-4">
              <div class="flex justify-between items-center py-3 border-b border-[#C8AE7D]/20">
                <span class="text-[#E8E2D6]">Combo 2 pares</span>
                <span class="font-bold text-[#C8AE7D] text-lg">GRÁTIS</span>
              </div>
              <div class="flex justify-between items-center py-3 border-b border-[#C8AE7D]/20">
                <span class="text-[#E8E2D6]">1 par avulso</span>
                <span class="text-[#E8E2D6]">R$ 19,90</span>
              </div>
              <div class="flex justify-between items-center py-3">
                <span class="text-[#E8E2D6]">Entrega expressa</span>
                <span class="text-[#E8E2D6]">R$ 39,90</span>
              </div>
            </div>
            
            <div class="mt-6 p-4 bg-[#C8AE7D]/20 rounded-2xl">
              <p class="text-sm text-[#E8E2D6] text-center">
                <strong class="text-[#C8AE7D]">Oferta especial:</strong> Frete grátis para o combo termina hoje!
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Tríade de Valor -->
    <section class="py-20 px-4">
      <div class="max-w-6xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-4xl md:text-5xl font-serif font-bold mb-6">
            Por que <span class="text-[#C8AE7D]">Majestad</span>?
          </h2>
        </div>
        
        <div class="grid md:grid-cols-3 gap-8">
          <div class="text-center group">
            <div class="w-20 h-20 bg-gradient-to-r from-[#C8AE7D] to-[#E8E2D6] rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
              <svg class="w-10 h-10 text-[#0B0B0C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
              </svg>
            </div>
            <h3 class="text-2xl font-bold mb-4">Conforto Superior</h3>
            <p class="text-[#E8E2D6] leading-relaxed">
              Design ergonômico com acolchoado especial e apoio anatômico para uso prolongado sem dor.
            </p>
          </div>
          
          <div class="text-center group">
            <div class="w-20 h-20 bg-gradient-to-r from-[#C8AE7D] to-[#E8E2D6] rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
              <svg class="w-10 h-10 text-[#0B0B0C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <h3 class="text-2xl font-bold mb-4">Estilo Atemporal</h3>
            <p class="text-[#E8E2D6] leading-relaxed">
              Design minimalista e elegante que nunca sai de moda, perfeito para qualquer ocasião.
            </p>
          </div>
          
          <div class="text-center group">
            <div class="w-20 h-20 bg-gradient-to-r from-[#C8AE7D] to-[#E8E2D6] rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
              <svg class="w-10 h-10 text-[#0B0B0C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path>
              </svg>
            </div>
            <h3 class="text-2xl font-bold mb-4">Acabamento Impecável</h3>
            <p class="text-[#E8E2D6] leading-relaxed">
              Materiais premium e artesanato de alta qualidade em cada detalhe do produto.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Unboxing de Luxo & Autenticidade -->
    <section class="py-20 px-4 bg-gradient-to-b from-[#1a1a1a] to-[#0B0B0C]">
      <div class="max-w-6xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-4xl md:text-5xl font-serif font-bold mb-6">
            Unboxing de <span class="text-[#C8AE7D]">Luxo</span> & Autenticidade
          </h2>
          <p class="text-xl text-[#E8E2D6] max-w-3xl mx-auto">
            Uma experiência premium desde o primeiro contato até o uso diário
          </p>
        </div>
        
        <div class="grid md:grid-cols-2 gap-12 items-center">
          <!-- Imagem da Embalagem -->
          <div class="order-2 md:order-1">
            <div class="relative group">
              <div class="absolute inset-0 bg-gradient-to-r from-[#C8AE7D] to-[#E8E2D6] rounded-3xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-500"></div>
              <div class="relative bg-gradient-to-br from-[#C8AE7D]/10 to-[#E8E2D6]/10 rounded-3xl p-8 border border-[#C8AE7D]/20">
                <img 
                  src="/DSC03095.jpg?w=600&h=400&fit=crop"
                  alt="Embalagem Premium Majestad"
                  class="w-full h-80 object-cover object-center rounded-2xl mb-6"
                  loading="lazy"
                >
                <div class="text-center">
                  <h3 class="text-xl font-bold mb-2 text-[#C8AE7D]">Embalagem Sofisticada</h3>
                  <p class="text-[#E8E2D6] text-sm">Caixa premium com acabamento em relevo e proteção interna</p>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Detalhes do Unboxing -->
          <div class="order-1 md:order-2">
            <div class="space-y-8">
              <div class="flex items-start space-x-4">
                <div class="w-12 h-12 bg-gradient-to-r from-[#C8AE7D] to-[#E8E2D6] rounded-full flex items-center justify-center flex-shrink-0">
                  <svg class="w-6 h-6 text-[#0B0B0C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
                  </svg>
                </div>
                <div>
                  <h4 class="text-xl font-bold mb-2">Caixa Premium</h4>
                  <p class="text-[#E8E2D6] leading-relaxed">
                    Embalagem rígida com acabamento em relevo, lacre de segurança e proteção interna em veludo
                  </p>
                </div>
              </div>
              
              <div class="flex items-start space-x-4">
                <div class="w-12 h-12 bg-gradient-to-r from-[#C8AE7D] to-[#E8E2D6] rounded-full flex items-center justify-center flex-shrink-0">
                  <svg class="w-6 h-6 text-[#0B0B0C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path>
                  </svg>
                </div>
                <div>
                  <h4 class="text-xl font-bold mb-2">Certificado de Autenticidade</h4>
                  <p class="text-[#E8E2D6] leading-relaxed">
                    Cada par acompanha certificado numerado que garante a originalidade e qualidade Majestad
                  </p>
                </div>
              </div>
              
              <div class="flex items-start space-x-4">
                <div class="w-12 h-12 bg-gradient-to-r from-[#C8AE7D] to-[#E8E2D6] rounded-full flex items-center justify-center flex-shrink-0">
                  <svg class="w-6 h-6 text-[#0B0B0C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                  </svg>
                </div>
                <div>
                  <h4 class="text-xl font-bold mb-2">Cartão de Cuidados</h4>
                  <p class="text-[#E8E2D6] leading-relaxed">
                    Guia exclusivo com dicas de conservação para manter seu Majestad sempre impecável
                  </p>
                </div>
              </div>
            </div>
            
            <!-- Selo de Qualidade -->
            <div class="mt-8 bg-gradient-to-r from-[#C8AE7D]/20 to-[#E8E2D6]/20 border border-[#C8AE7D]/30 rounded-2xl p-6 text-center">
              <div class="flex items-center justify-center mb-3">
                <svg class="w-8 h-8 text-[#C8AE7D] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path>
                </svg>
                <span class="text-lg font-bold text-[#C8AE7D]">100% Autêntico</span>
              </div>
              <p class="text-[#E8E2D6] text-sm">Garantia de originalidade em cada detalhe</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Comparativo "Por que Majestad?" -->
    <section class="py-20 px-4">
      <div class="max-w-6xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-4xl md:text-5xl font-serif font-bold mb-6">
            Por que <span class="text-[#C8AE7D]">Majestad</span>?
          </h2>
          <p class="text-xl text-[#E8E2D6] max-w-3xl mx-auto">
            Compare e descubra os diferenciais que fazem toda a diferença
          </p>
        </div>
        
        <!-- Tabela Comparativa -->
        <div class="bg-[#C8AE7D]/10 border border-[#C8AE7D]/20 rounded-3xl p-8 overflow-x-auto">
          <table class="w-full">
            <thead>
              <tr class="border-b border-[#C8AE7D]/30">
                <th class="text-left py-6 px-4 text-[#E8E2D6] font-bold text-lg">Características</th>
                <th class="text-center py-6 px-4 text-[#C8AE7D] font-bold text-lg">Majestad</th>
                <th class="text-center py-6 px-4 text-[#E8E2D6] font-bold text-lg">Sapatos Genéricos</th>
              </tr>
            </thead>
            <tbody class="text-[#E8E2D6]">
              <tr class="border-b border-[#C8AE7D]/10">
                <td class="py-6 px-4 font-semibold">Conforto prolongado</td>
                <td class="text-center py-6 px-4">
                  <div class="flex justify-center">
                    <svg class="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <span class="text-sm text-[#C8AE7D]">Palmilha anatômica</span>
                </td>
                <td class="text-center py-6 px-4">
                  <div class="flex justify-center">
                    <svg class="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                  </div>
                  <span class="text-sm text-gray-400">Básico</span>
                </td>
              </tr>
              
              <tr class="border-b border-[#C8AE7D]/10">
                <td class="py-6 px-4 font-semibold">Materiais premium</td>
                <td class="text-center py-6 px-4">
                  <div class="flex justify-center">
                    <svg class="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <span class="text-sm text-[#C8AE7D]">Material premium</span>
                </td>
                <td class="text-center py-6 px-4">
                  <div class="flex justify-center">
                    <svg class="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                  </div>
                  <span class="text-sm text-gray-400">Sintético</span>
                </td>
              </tr>
              
              <tr class="border-b border-[#C8AE7D]/10">
                <td class="py-6 px-4 font-semibold">Acabamento impecável</td>
                <td class="text-center py-6 px-4">
                  <div class="flex justify-center">
                    <svg class="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <span class="text-sm text-[#C8AE7D]">Artesanal</span>
                </td>
                <td class="text-center py-6 px-4">
                  <div class="flex justify-center">
                    <svg class="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"></path>
                    </svg>
                  </div>
                  <span class="text-sm text-gray-400">Industrial</span>
                </td>
              </tr>
              
              <tr class="border-b border-[#C8AE7D]/10">
                <td class="py-6 px-4 font-semibold">Garantia de troca</td>
                <td class="text-center py-6 px-4">
                  <div class="flex justify-center">
                    <svg class="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <span class="text-sm text-[#C8AE7D]">1ª troca grátis</span>
                </td>
                <td class="text-center py-6 px-4">
                  <div class="flex justify-center">
                    <svg class="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                  </div>
                  <span class="text-sm text-gray-400">Limitada</span>
                </td>
              </tr>
              
              <tr class="border-b border-[#C8AE7D]/10">
                <td class="py-6 px-4 font-semibold">Certificado de autenticidade</td>
                <td class="text-center py-6 px-4">
                  <div class="flex justify-center">
                    <svg class="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <span class="text-sm text-[#C8AE7D]">Numerado</span>
                </td>
                <td class="text-center py-6 px-4">
                  <div class="flex justify-center">
                    <svg class="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                  </div>
                  <span class="text-sm text-gray-400">Não possui</span>
                </td>
              </tr>
              
              <tr>
                <td class="py-6 px-4 font-semibold">Avaliação dos clientes</td>
                <td class="text-center py-6 px-4">
                  <div class="flex justify-center mb-2">
                    <div class="flex text-yellow-400 text-lg">
                      <span v-for="i in 5" :key="i">★</span>
                    </div>
                  </div>
                  <span class="text-sm text-[#C8AE7D]">4,9/5 (98% recomendam)</span>
                </td>
                <td class="text-center py-6 px-4">
                  <div class="flex justify-center mb-2">
                    <div class="flex text-gray-400 text-lg">
                      <span v-for="i in 3" :key="i">★</span>
                      <span v-for="i in 2" :key="i+3" class="text-gray-600">★</span>
                    </div>
                  </div>
                  <span class="text-sm text-gray-400">3,2/5 (variável)</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <!-- CTA Comparativo -->
        <div class="text-center mt-12">
          <p class="text-xl text-[#E8E2D6] mb-6">A diferença está nos detalhes</p>
          <button class="bg-gradient-to-r from-[#C8AE7D] to-[#E8E2D6] text-[#0B0B0C] px-8 py-4 rounded-full font-bold text-lg hover:shadow-lg transition-all duration-300">
            Escolher Majestad Agora
          </button>
        </div>
      </div>
    </section>

    <!-- Lookbook de Estilo -->
    <section class="py-20 px-4 bg-gradient-to-b from-[#1a1a1a] to-[#0B0B0C]">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-4xl md:text-5xl font-serif font-bold mb-6">
            Lookbook de <span class="text-[#C8AE7D]">Estilo</span>
          </h2>
          <p class="text-xl text-[#E8E2D6] max-w-3xl mx-auto">
            Inspire-se e descubra como usar seu Majestad em diferentes ocasiões
          </p>
        </div>
        
        <!-- Tabs de Cores -->
        <div class="flex justify-center mb-12">
          <div class="bg-[#C8AE7D]/10 border border-[#C8AE7D]/20 rounded-full p-2">
            <button class="px-6 py-3 rounded-full font-semibold transition-all duration-300 bg-[#C8AE7D] text-[#0B0B0C]">
              Preto Ônix
            </button>
            <button class="px-6 py-3 rounded-full font-semibold transition-all duration-300 text-[#E8E2D6] hover:bg-[#C8AE7D]/20">
              Branco Pérola
            </button>
          </div>
        </div>
        
        <!-- Looks Grid -->
        <div class="grid md:grid-cols-3 gap-8">
          <!-- Look Casual Elegante -->
          <div class="group">
            <div class="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#C8AE7D]/10 to-[#E8E2D6]/10 aspect-[3/4] mb-6">
              <img 
                src="/casual.png"
                alt="Look Casual Elegante"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
              >
              <div class="absolute inset-0 bg-gradient-to-t from-[#0B0B0C]/60 to-transparent"></div>
              <div class="absolute bottom-6 left-6 right-6">
                <h3 class="text-xl font-bold mb-2 text-white">Casual Elegante</h3>
                <p class="text-[#E8E2D6] text-sm mb-4">Perfeito para o dia a dia com sofisticação</p>
                <div class="flex flex-wrap gap-2">
                  <span class="bg-[#C8AE7D]/20 text-[#C8AE7D] px-3 py-1 rounded-full text-xs font-medium">Jeans</span>
                  <span class="bg-[#C8AE7D]/20 text-[#C8AE7D] px-3 py-1 rounded-full text-xs font-medium">Blazer</span>
                  <span class="bg-[#C8AE7D]/20 text-[#C8AE7D] px-3 py-1 rounded-full text-xs font-medium">Camisa</span>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Look Noite Formal -->
          <div class="group">
            <div class="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#C8AE7D]/10 to-[#E8E2D6]/10 aspect-[3/4] mb-6">
              <img 
                src="/noite.png"
                alt="Look Noite Formal"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
              >
              <div class="absolute inset-0 bg-gradient-to-t from-[#0B0B0C]/60 to-transparent"></div>
              <div class="absolute bottom-6 left-6 right-6">
                <h3 class="text-xl font-bold mb-2 text-white">Noite Formal</h3>
                <p class="text-[#E8E2D6] text-sm mb-4">Elegância máxima para eventos especiais</p>
                <div class="flex flex-wrap gap-2">
                  <span class="bg-[#C8AE7D]/20 text-[#C8AE7D] px-3 py-1 rounded-full text-xs font-medium">Vestido longo</span>
                  <span class="bg-[#C8AE7D]/20 text-[#C8AE7D] px-3 py-1 rounded-full text-xs font-medium">Calça</span>
                  <span class="bg-[#C8AE7D]/20 text-[#C8AE7D] px-3 py-1 rounded-full text-xs font-medium">Social</span>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Look Evento de Dia -->
          <div class="group">
            <div class="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#C8AE7D]/10 to-[#E8E2D6]/10 aspect-[3/4] mb-6">
              <img 
                src="/1.png"
                alt="Look Evento de Dia"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
              >
              <div class="absolute inset-0 bg-gradient-to-t from-[#0B0B0C]/60 to-transparent"></div>
              <div class="absolute bottom-6 left-6 right-6">
                <h3 class="text-xl font-bold mb-2 text-white">Relação apimentada</h3>
                <p class="text-[#E8E2D6] text-sm mb-4">Versatilidade para qualquer ocasião</p>
                <div class="flex flex-wrap gap-2">
                  <span class="bg-[#C8AE7D]/20 text-[#C8AE7D] px-3 py-1 rounded-full text-xs font-medium">Vestido</span>
                  <span class="bg-[#C8AE7D]/20 text-[#C8AE7D] px-3 py-1 rounded-full text-xs font-medium">Shorts</span>
                  <span class="bg-[#C8AE7D]/20 text-[#C8AE7D] px-3 py-1 rounded-full text-xs font-medium">Sexy</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Dica de Styling -->
        <div class="mt-12 bg-gradient-to-r from-[#C8AE7D]/10 to-[#E8E2D6]/10 border border-[#C8AE7D]/20 rounded-3xl p-8 text-center">
          <h3 class="text-2xl font-bold mb-4 text-[#C8AE7D]">Dica de Styling</h3>
          <p class="text-[#E8E2D6] text-lg leading-relaxed max-w-3xl mx-auto">
            O Majestad foi criado para ser versátil. Combine com peças básicas para um look casual ou com trajes formais para ocasiões especiais. 
            <strong class="text-[#C8AE7D]">A elegância está nos detalhes.</strong>
          </p>
        </div>
      </div>
    </section>

    <!-- Provas de Autoridade & Mídia -->
    <section class="py-20 px-4">
      <div class="max-w-6xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-4xl md:text-5xl font-serif font-bold mb-6">
            Reconhecimento e <span class="text-[#C8AE7D]">Autoridade</span>
          </h2>
          <p class="text-xl text-[#E8E2D6] max-w-3xl mx-auto">
            A confiança de milhares de clientes e o reconhecimento da mídia especializada
          </p>
        </div>
        
        <!-- Números de Autoridade -->
        <div class="grid md:grid-cols-4 gap-8 mb-16">
          <div class="text-center">
            <div class="text-4xl md:text-5xl font-bold text-[#C8AE7D] mb-2">15.000+</div>
            <p class="text-[#E8E2D6] font-medium">Clientes Satisfeitos</p>
          </div>
          
          <div class="text-center">
            <div class="text-4xl md:text-5xl font-bold text-[#C8AE7D] mb-2">4.9/5</div>
            <p class="text-[#E8E2D6] font-medium">Avaliação Média</p>
          </div>
          
          <div class="text-center">
            <div class="text-4xl md:text-5xl font-bold text-[#C8AE7D] mb-2">98%</div>
            <p class="text-[#E8E2D6] font-medium">Recomendam</p>
          </div>
          
          <div class="text-center">
            <div class="text-4xl md:text-5xl font-bold text-[#C8AE7D] mb-2">3</div>
            <p class="text-[#E8E2D6] font-medium">Anos no Mercado</p>
          </div>
        </div>
        
        <!-- Selos "Visto em" -->
        <div class="bg-[#C8AE7D]/10 border border-[#C8AE7D]/20 rounded-3xl p-8">
          <h3 class="text-2xl font-bold mb-8 text-center text-[#C8AE7D]">Visto em</h3>
          
          <div class="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
            <div class="text-center opacity-70 hover:opacity-100 transition-opacity duration-300">
              <div class="bg-[#E8E2D6]/10 rounded-2xl p-6 mb-3">
                <div class="text-2xl font-bold text-[#E8E2D6]">VOGUE</div>
              </div>
              <p class="text-sm text-[#E8E2D6]">"Tendência em calçados"</p>
            </div>
            
            <div class="text-center opacity-70 hover:opacity-100 transition-opacity duration-300">
              <div class="bg-[#E8E2D6]/10 rounded-2xl p-6 mb-3">
                <div class="text-2xl font-bold text-[#E8E2D6]">ELLE</div>
              </div>
              <p class="text-sm text-[#E8E2D6]">"Conforto e estilo"</p>
            </div>
            
            <div class="text-center opacity-70 hover:opacity-100 transition-opacity duration-300">
              <div class="bg-[#E8E2D6]/10 rounded-2xl p-6 mb-3">
                <div class="text-2xl font-bold text-[#E8E2D6]">GQ</div>
              </div>
              <p class="text-sm text-[#E8E2D6]">"Elegância masculina"</p>
            </div>
            
            <div class="text-center opacity-70 hover:opacity-100 transition-opacity duration-300">
              <div class="bg-[#E8E2D6]/10 rounded-2xl p-6 mb-3">
                <div class="text-2xl font-bold text-[#E8E2D6]">MARIE CLAIRE</div>
              </div>
              <p class="text-sm text-[#E8E2D6]">"Sapato do ano"</p>
            </div>
          </div>
        </div>
        
        <!-- Certificações -->
        <div class="grid md:grid-cols-3 gap-8 mt-12">
          <div class="bg-gradient-to-br from-[#C8AE7D]/10 to-[#E8E2D6]/10 rounded-3xl p-6 text-center">
            <div class="w-16 h-16 bg-[#C8AE7D] rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-[#0B0B0C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path>
              </svg>
            </div>
            <h4 class="font-bold text-lg mb-2">ISO 9001</h4>
            <p class="text-[#E8E2D6] text-sm">Certificação de qualidade internacional</p>
          </div>
          
          <div class="bg-gradient-to-br from-[#C8AE7D]/10 to-[#E8E2D6]/10 rounded-3xl p-6 text-center">
            <div class="w-16 h-16 bg-[#C8AE7D] rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-[#0B0B0C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
              </svg>
            </div>
            <h4 class="font-bold text-lg mb-2">SSL Seguro</h4>
            <p class="text-[#E8E2D6] text-sm">Compra 100% segura e protegida</p>
          </div>
          
          <div class="bg-gradient-to-br from-[#C8AE7D]/10 to-[#E8E2D6]/10 rounded-3xl p-6 text-center">
            <div class="w-16 h-16 bg-[#C8AE7D] rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-[#0B0B0C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 1v6m0 0V1m0 6l4-4M8 8l4-4m0 0v6m0 0l4 4M8 16l4-4m0 0l4 4M8 16l4 4m4-4l-4 4m0 0l-4-4m4 4v6m0-6l4 4"></path>
                <rect x="3" y="11" width="18" height="10" rx="2" ry="2"></rect>
                <circle cx="12" cy="16" r="1"></circle>
              </svg>
            </div>
            <h4 class="font-bold text-lg mb-2">Pagamento Seguro</h4>
            <p class="text-[#E8E2D6] text-sm">SSL 256 bits e criptografia</p>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ Enxuto -->
    <section class="py-20 px-4 bg-gradient-to-b from-[#1a1a1a] to-[#0B0B0C]">
      <div class="max-w-4xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-4xl md:text-5xl font-serif font-bold mb-6">
            Dúvidas <span class="text-[#C8AE7D]">Essenciais</span>
          </h2>
          <p class="text-xl text-[#E8E2D6] max-w-3xl mx-auto">
            Respostas diretas para suas principais questões
          </p>
        </div>
        
        <div class="space-y-6">
          <div class="bg-[#C8AE7D]/10 border border-[#C8AE7D]/20 rounded-3xl p-6">
            <button 
              @click="toggleFaq(0)"
              class="w-full text-left flex justify-between items-center"
            >
              <h3 class="text-xl font-bold text-[#E8E2D6] pr-4">É realmente confortável para usar o dia todo?</h3>
              <svg 
                :class="openFaq === 0 ? 'rotate-180' : ''"
                class="w-6 h-6 text-[#C8AE7D] transition-transform duration-300 flex-shrink-0"
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>
            <div 
              v-show="openFaq === 0"
              class="mt-4 text-[#E8E2D6] leading-relaxed"
            >
              Sim! O Majestad possui palmilha anatômica com acolchoado premium no calcanhar e design ergonômico que distribui o peso uniformemente. Nossos materiais nobres e a construção artesanal garantem conforto prolongado sem causar dor ou desconforto.
            </div>
          </div>
          
          <div class="bg-[#C8AE7D]/10 border border-[#C8AE7D]/20 rounded-3xl p-6">
            <button 
              @click="toggleFaq(1)"
              class="w-full text-left flex justify-between items-center"
            >
              <h3 class="text-xl font-bold text-[#E8E2D6] pr-4">Como escolher o tamanho correto?</h3>
              <svg 
                :class="openFaq === 1 ? 'rotate-180' : ''"
                class="w-6 h-6 text-[#C8AE7D] transition-transform duration-300 flex-shrink-0"
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>
            <div 
              v-show="openFaq === 1"
              class="mt-4 text-[#E8E2D6] leading-relaxed"
            >
              Consulte nosso guia de tamanhos com medidas em centímetros. Meça seu pé no final do dia (quando está mais inchado) e compare com nossa tabela. <strong class="text-[#C8AE7D]">Dica:</strong> se ficar entre dois tamanhos, prefira o maior.
            </div>
          </div>
          
          <div class="bg-[#C8AE7D]/10 border border-[#C8AE7D]/20 rounded-3xl p-6">
            <button 
              @click="toggleFaq(2)"
              class="w-full text-left flex justify-between items-center"
            >
              <h3 class="text-xl font-bold text-[#E8E2D6] pr-4">Qual o prazo de entrega?</h3>
              <svg 
                :class="openFaq === 2 ? 'rotate-180' : ''"
                class="w-6 h-6 text-[#C8AE7D] transition-transform duration-300 flex-shrink-0"
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>
            <div 
              v-show="openFaq === 2"
              class="mt-4 text-[#E8E2D6] leading-relaxed"
            >
              <strong>Sudeste:</strong> 2-4 dias úteis | <strong>Sul/Nordeste:</strong> 3-6 dias úteis | <strong>Norte/Centro-Oeste:</strong> 5-8 dias úteis. Todas as entregas incluem rastreamento em tempo real e embalagem premium.
            </div>
          </div>
          
          <div class="bg-[#C8AE7D]/10 border border-[#C8AE7D]/20 rounded-3xl p-6">
            <button 
              @click="toggleFaq(3)"
              class="w-full text-left flex justify-between items-center"
            >
              <h3 class="text-xl font-bold text-[#E8E2D6] pr-4">Posso trocar se não servir?</h3>
              <svg 
                :class="openFaq === 3 ? 'rotate-180' : ''"
                class="w-6 h-6 text-[#C8AE7D] transition-transform duration-300 flex-shrink-0"
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>
            <div 
              v-show="openFaq === 3"
              class="mt-4 text-[#E8E2D6] leading-relaxed"
            >
              Claro! Sua <strong class="text-[#C8AE7D]">primeira troca é totalmente grátis</strong> em até 30 dias. Basta entrar em contato pelo WhatsApp e nossa equipe cuida de tudo. Processo simples, sem burocracia.
            </div>
          </div>
          
          <div class="bg-[#C8AE7D]/10 border border-[#C8AE7D]/20 rounded-3xl p-6">
            <button 
              @click="toggleFaq(4)"
              class="w-full text-left flex justify-between items-center"
            >
              <h3 class="text-xl font-bold text-[#E8E2D6] pr-4">Como cuidar do meu Majestad?</h3>
              <svg 
                :class="openFaq === 4 ? 'rotate-180' : ''"
                class="w-6 h-6 text-[#C8AE7D] transition-transform duration-300 flex-shrink-0"
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>
            <div 
              v-show="openFaq === 4"
              class="mt-4 text-[#E8E2D6] leading-relaxed"
            >
              Cada par vem com um cartão de cuidados exclusivo. Use pano macio e produtos de limpeza adequados. Evite água em excesso e guarde em local arejado. Com os cuidados corretos, seu Majestad durará anos mantendo a elegância original.
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Final + Escassez Elegante -->
    <section class="py-20 px-4">
      <div class="max-w-4xl mx-auto text-center">
        <div class="bg-gradient-to-br from-[#C8AE7D]/20 to-[#E8E2D6]/20 border border-[#C8AE7D]/30 rounded-3xl p-12">
          <!-- Escassez Elegante -->
          <div class="mb-8">
            <div class="inline-flex items-center bg-red-500/20 border border-red-500/30 rounded-full px-6 py-3 mb-4">
              <svg class="w-5 h-5 mr-2 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <span class="text-red-400 font-semibold text-sm">Lote atual com frete promocional termina hoje às 23:59</span>
            </div>
            <div class="text-sm text-yellow-400 font-medium">
              ⚠️ Tamanhos 37 e 38 com estoque reduzido
            </div>
          </div>
          
          <h2 class="text-4xl md:text-5xl font-serif font-bold mb-6">
            Últimas <span class="text-[#C8AE7D]">Unidades</span> Disponíveis
          </h2>
          <p class="text-xl text-[#E8E2D6] mb-8 max-w-2xl mx-auto">
            Não perca a oportunidade de ter o sapato mais desejado do momento
          </p>
          
          <!-- Preço Final com Ancoragem -->
          <div class="mb-8">
            <div class="text-sm text-gray-400 line-through mb-2">Preço unitário: R$ 437,90 cada</div>
            <div class="text-lg text-gray-400 line-through mb-2">Total: R$ 875,80 (2 pares)</div>
            <div class="text-5xl font-bold text-[#C8AE7D] mb-2">R$ 349,90</div>
            <div class="text-lg text-[#E8E2D6] mb-2">2 pares completos</div>
            <div class="inline-flex items-center bg-green-500/20 border border-green-500/30 rounded-full px-4 py-2">
              <span class="text-green-400 font-bold text-lg">Economia de 60% • R$ 525,90 menos</span>
            </div>
          </div>
          
          <button 
            @click="scrollToSelector"
            :disabled="!isSelectionComplete"
            :class="[
              'w-full max-w-md mx-auto px-8 py-6 rounded-full font-bold text-xl transition-all duration-300 mb-4',
              isSelectionComplete 
                ? 'bg-gradient-to-r from-[#C8AE7D] to-[#E8E2D6] text-[#0B0B0C] hover:shadow-2xl hover:scale-105 animate-pulse' 
                : 'bg-gray-600 text-gray-400 cursor-not-allowed'
            ]"
          >
            {{ isSelectionComplete ? 'Garantir 2 Pares por R$ 349,90' : 'Selecione seus Pares Acima' }}
          </button>
          
          <!-- Selos de Pagamento -->
          <div class="mb-6">
            <p class="text-sm text-[#E8E2D6] mb-3">Formas de pagamento:</p>
            <div class="flex items-center justify-center space-x-4 text-xs text-[#E8E2D6]">
              <div class="bg-[#C8AE7D]/20 px-3 py-2 rounded-lg border border-[#C8AE7D]/30">
                <strong>PIX</strong> • Desconto 5%
              </div>
              <div class="bg-[#C8AE7D]/20 px-3 py-2 rounded-lg border border-[#C8AE7D]/30">
                <strong>Cartão</strong> • 12x sem juros
              </div>
              <div class="bg-[#C8AE7D]/20 px-3 py-2 rounded-lg border border-[#C8AE7D]/30">
                <strong>Boleto</strong> • À vista
              </div>
            </div>
          </div>
          
          <div class="flex items-center justify-center space-x-6 text-sm text-[#E8E2D6]">
            <div class="flex items-center">
              <svg class="w-5 h-5 mr-2 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
              Frete Grátis
            </div>
            <div class="flex items-center">
              <svg class="w-5 h-5 mr-2 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
              1ª Troca Grátis
            </div>
            <div class="flex items-center">
              <svg class="w-5 h-5 mr-2 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
              Compra Segura
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer Minimalista de Confiança -->
    <footer class="bg-[#0B0B0C] py-12 px-4 border-t border-[#C8AE7D]/20">
      <div class="max-w-4xl mx-auto">
        <!-- Contatos Principais -->
        <div class="text-center mb-8">
          <h3 class="text-2xl font-serif font-bold text-[#C8AE7D] mb-6">Majestad</h3>
          
          <div class="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-8 mb-6">
            <!-- WhatsApp -->
            <a href="https://wa.me/5511999999999" class="flex items-center text-[#E8E2D6] hover:text-[#C8AE7D] transition-colors">
              <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
              </svg>
              <span class="font-medium">(11) 99999-9999</span>
            </a>
            
            <!-- Email -->
            <a href="mailto:contato@majestad.com.br" class="flex items-center text-[#E8E2D6] hover:text-[#C8AE7D] transition-colors">
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
              </svg>
              <span class="font-medium">contato@majestad.com.br</span>
            </a>
            
            <!-- Instagram -->
            <a href="https://instagram.com/majestad" class="flex items-center text-[#E8E2D6] hover:text-[#C8AE7D] transition-colors">
              <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              <span class="font-medium">@majestad</span>
            </a>
          </div>
        </div>
        
        <!-- Links Úteis -->
        <div class="flex flex-wrap items-center justify-center space-x-6 mb-6 text-sm text-[#E8E2D6]">
          <a href="#size-guide" class="hover:text-[#C8AE7D] transition-colors">Guia de Tamanhos</a>
          <a href="#return-policy" class="hover:text-[#C8AE7D] transition-colors">Política de Troca</a>
          <a href="#delivery" class="hover:text-[#C8AE7D] transition-colors">Entrega e Prazos</a>
          <a href="#faq" class="hover:text-[#C8AE7D] transition-colors">FAQ</a>
        </div>
        
        <!-- Selos de Confiança -->
        <div class="flex items-center justify-center space-x-6 mb-6">
          <div class="flex items-center text-xs text-[#E8E2D6]">
            <svg class="w-4 h-4 mr-1 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
            </svg>
            <span>Compra Segura</span>
          </div>
          
          <div class="flex items-center text-xs text-[#E8E2D6]">
            <svg class="w-4 h-4 mr-1 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path>
            </svg>
            <span>4,9/5 Estrelas</span>
          </div>
          
          <div class="flex items-center text-xs text-[#E8E2D6]">
            <svg class="w-4 h-4 mr-1 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
            </svg>
            <span>15.000+ Clientes</span>
          </div>
        </div>
        
        <!-- Copyright -->
        <div class="border-t border-[#C8AE7D]/20 pt-6 text-center text-xs text-[#E8E2D6]">
          <p>&copy; 2024 Majestad. Todos os direitos reservados. | CNPJ: 00.000.000/0001-00</p>
        </div>
      </div>
    </footer>


  </div>
</template>

<style>
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}

.animate-float {
  animation: float 3s ease-in-out infinite;
}

.btn-primary {
  @apply bg-gradient-to-r from-[#C8AE7D] to-[#E8E2D6] text-[#0B0B0C];
}
</style>
