<script setup lang="ts">
import { ref, reactive, computed } from 'vue'

// Tipos
interface Color {
  id: string
  name: string
}

interface SelectedPair {
  color: Color | null
  size: number | null
}

// Estado reativo
const selectedPairs = reactive({
  first: { color: null, size: null } as SelectedPair,
  second: { color: null, size: null } as SelectedPair
})

const openFaq = ref<number | null>(null)

// Dados
const colors: Color[] = [
  { id: 'black', name: 'Preto Ônix' },
  { id: 'white', name: 'Branco Pérola' }
]

const sizes = [34, 35, 36, 37, 38, 39, 40]

const faqs = [
  {
    question: 'Como é o conforto do salto Majestad?',
    answer: 'O salto Majestad possui palmilha anatômica desenvolvida especialmente para proporcionar conforto superior durante todo o dia. Os materiais premium e o design ergonômico garantem que você possa usar por horas sem desconforto.'
  },
  {
    question: 'Como escolher o tamanho ideal?',
    answer: 'Recomendamos que você escolha o mesmo número que usa habitualmente. Nossos sapatos seguem a numeração brasileira padrão. Em caso de dúvidas, nossa equipe está disponível via WhatsApp para orientações personalizadas.'
  },
  {
    question: 'Qual o prazo de entrega?',
    answer: 'Entregamos em todo o Brasil. O prazo varia de 3 a 10 dias úteis dependendo da sua região. Você receberá o código de rastreamento assim que o pedido for despachado.'
  },
  {
    question: 'Posso trocar se não servir?',
    answer: 'Sim! Você tem 30 dias para trocar sem custo adicional. Basta entrar em contato conosco e enviaremos as instruções para a troca.'
  },
  {
    question: 'O produto tem garantia?',
    answer: 'Todos os nossos produtos têm garantia de 6 meses contra defeitos de fabricação. Além disso, cada par vem com certificado de autenticidade.'
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
  } else {
    selectedPairs.second.color = color
  }
  
  // Evento de tracking
  console.log(`Color selected: ${color.name} for pair ${pairNumber}`)
}

const selectSize = (pairNumber: number, size: number) => {
  if (pairNumber === 1) {
    selectedPairs.first.size = size
  } else {
    selectedPairs.second.size = size
  }
  
  // Evento de tracking
  console.log(`Size selected: ${size} for pair ${pairNumber}`)
}

const scrollToSelector = () => {
  const element = document.getElementById('selector')
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
  
  // Evento de tracking
  console.log('CTA clicked: Scroll to selector')
}

const addToCart = () => {
  if (isSelectionComplete.value) {
    // Aqui você implementaria a lógica de adicionar ao carrinho
    console.log('Added to cart:', {
      pair1: selectedPairs.first,
      pair2: selectedPairs.second,
      price: 349.90
    })
    
    // Evento de tracking
    console.log('Combo added to cart')
    
    alert('Combo adicionado ao carrinho! Em breve você será redirecionado para finalizar a compra.')
  }
}

const toggleFaq = (index: number) => {
  openFaq.value = openFaq.value === index ? null : index
}
</script>

<template>
  <div id="app" class="min-h-screen bg-[#0B0B0C] text-[#F5F5F5]">
    <!-- Hero Section -->
    <section class="relative min-h-screen flex items-center justify-center px-4 py-20 overflow-hidden">
      <!-- Background Pattern -->
      <div class="absolute inset-0 opacity-5">
        <div class="absolute top-20 left-10 w-32 h-32 bg-[#C8AE7D] rounded-full blur-3xl"></div>
        <div class="absolute bottom-20 right-10 w-40 h-40 bg-[#C8AE7D] rounded-full blur-3xl"></div>
      </div>
      
      <!-- Hero Product Image -->
      <div class="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1/4 z-5 hidden lg:block">
        <div class="relative">
          <img 
            src="https://majestad.com.br/wp-content/uploads/2025/02/DSC03016.avif"
            alt="Salto Majestad Hero"
            class="w-96 h-auto object-contain opacity-80 transform rotate-12 hover:rotate-6 transition-transform duration-700"
            loading="eager"
          >
          <div class="absolute inset-0 bg-gradient-to-l from-transparent via-[#C8AE7D]/10 to-[#C8AE7D]/20 rounded-3xl blur-2xl"></div>
        </div>
      </div>
      
      <div class="relative z-10 max-w-4xl mx-auto text-center lg:text-left lg:max-w-2xl">
        <!-- Selo de Oferta -->
        <div class="inline-flex items-center px-6 py-3 bg-gradient-to-r from-[#C8AE7D] to-[#E8E2D6] text-[#0B0B0C] rounded-full font-medium mb-8 shadow-lg">
          <span class="text-sm font-semibold tracking-wide">OFERTA EXCLUSIVA</span>
        </div>
        
        <!-- Headline -->
        <h1 class="text-5xl md:text-7xl font-serif font-bold mb-6 tracking-tight leading-tight">
          Sofisticação que <br>
          <span class="text-[#C8AE7D]">transforma</span> seu estilo
        </h1>
        
        <!-- Subheadline -->
        <p class="text-xl md:text-2xl text-[#E8E2D6] mb-8 font-light tracking-wide">
          Atemporal. Sofisticado. Feito para você.
        </p>
        
        <!-- Oferta Principal -->
        <div class="bg-gradient-to-r from-[#C8AE7D]/10 to-[#E8E2D6]/10 backdrop-blur-sm border border-[#C8AE7D]/20 rounded-2xl p-8 mb-10 max-w-2xl mx-auto">
          <div class="text-3xl md:text-4xl font-bold mb-2">
            Leve <span class="text-[#C8AE7D]">2 pares</span> por
          </div>
          <div class="text-5xl md:text-6xl font-bold text-[#C8AE7D] mb-4">
            R$ 349,90
          </div>
          <div class="text-sm text-[#E8E2D6] line-through">
            De R$ 875,80 (R$ 437,90 cada)
          </div>
          <div class="text-lg text-[#C8AE7D] font-medium mt-2">
            Economia de R$ 525,90
          </div>
        </div>
        
        <!-- CTA Principal -->
        <button 
          @click="scrollToSelector"
          class="bg-gradient-to-r from-[#C8AE7D] to-[#E8E2D6] text-[#0B0B0C] px-12 py-4 rounded-full text-xl font-semibold hover:shadow-2xl hover:scale-105 transition-all duration-300 mb-8"
        >
          Garantir meu Majestad
        </button>
        
        <!-- Indicadores de Qualidade -->
        <div class="flex flex-wrap justify-center gap-8 text-sm text-[#E8E2D6]">
          <div class="flex items-center gap-2">
            <div class="w-2 h-2 bg-[#C8AE7D] rounded-full"></div>
            <span>Entrega em todo Brasil</span>
          </div>
          <div class="flex items-center gap-2">
            <div class="w-2 h-2 bg-[#C8AE7D] rounded-full"></div>
            <span>Troca grátis em 30 dias</span>
          </div>
          <div class="flex items-center gap-2">
            <div class="w-2 h-2 bg-[#C8AE7D] rounded-full"></div>
            <span>Certificado de autenticidade</span>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Seletor de Produtos -->
    <section id="selector" class="py-20 px-4">
      <div class="max-w-6xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-4xl md:text-5xl font-serif font-bold mb-6">
            Monte seu <span class="text-[#C8AE7D]">combo exclusivo</span>
          </h2>
          <p class="text-xl text-[#E8E2D6] max-w-2xl mx-auto">
            Escolha 2 pares e garante sua economia de R$ 525,90
          </p>
        </div>
        
        <!-- Seletor do Primeiro Par -->
        <div class="bg-gradient-to-r from-[#C8AE7D]/5 to-[#E8E2D6]/5 backdrop-blur-sm border border-[#C8AE7D]/20 rounded-3xl p-8 mb-8">
          <h3 class="text-2xl font-bold mb-6 text-center">
            <span class="bg-[#C8AE7D] text-[#0B0B0C] w-8 h-8 rounded-full inline-flex items-center justify-center mr-3 text-lg font-bold">1</span>
            Escolha seu primeiro par
          </h3>
          
          <!-- Cores -->
          <div class="mb-8">
            <h4 class="text-lg font-semibold mb-4 text-[#E8E2D6]">Cor:</h4>
            <div class="flex gap-4 justify-center">
              <button 
                v-for="color in colors" 
                :key="color.id"
                @click="selectColor(1, color)"
                :class="[
                  'flex flex-col items-center p-4 rounded-2xl border-2 transition-all duration-300 hover:scale-105',
                  selectedPairs.first.color?.id === color.id 
                    ? 'border-[#C8AE7D] bg-[#C8AE7D]/10' 
                    : 'border-[#E8E2D6]/20 hover:border-[#C8AE7D]/50'
                ]"
              >
                <div 
                  :class="[
                    'w-16 h-16 rounded-full mb-3 border-4',
                    color.id === 'black' ? 'bg-black border-gray-600' : 'bg-white border-gray-300'
                  ]"
                ></div>
                <span class="font-medium">{{ color.name }}</span>
              </button>
            </div>
          </div>
          
          <!-- Tamanhos -->
          <div class="mb-6">
            <h4 class="text-lg font-semibold mb-4 text-[#E8E2D6]">Numeração:</h4>
            <div class="grid grid-cols-4 md:grid-cols-7 gap-3 max-w-md mx-auto">
              <button 
                v-for="size in sizes" 
                :key="size"
                @click="selectSize(1, size)"
                :class="[
                  'py-3 px-4 rounded-xl border-2 font-semibold transition-all duration-300 hover:scale-105',
                  selectedPairs.first.size === size 
                    ? 'border-[#C8AE7D] bg-[#C8AE7D] text-[#0B0B0C]' 
                    : 'border-[#E8E2D6]/20 hover:border-[#C8AE7D]/50'
                ]"
              >
                {{ size }}
              </button>
            </div>
          </div>
        </div>
        
        <!-- Seletor do Segundo Par -->
        <div class="bg-gradient-to-r from-[#C8AE7D]/5 to-[#E8E2D6]/5 backdrop-blur-sm border border-[#C8AE7D]/20 rounded-3xl p-8 mb-12">
          <h3 class="text-2xl font-bold mb-6 text-center">
            <span class="bg-[#C8AE7D] text-[#0B0B0C] w-8 h-8 rounded-full inline-flex items-center justify-center mr-3 text-lg font-bold">2</span>
            Escolha seu segundo par
          </h3>
          
          <!-- Cores -->
          <div class="mb-8">
            <h4 class="text-lg font-semibold mb-4 text-[#E8E2D6]">Cor:</h4>
            <div class="flex gap-4 justify-center">
              <button 
                v-for="color in colors" 
                :key="color.id"
                @click="selectColor(2, color)"
                :class="[
                  'flex flex-col items-center p-4 rounded-2xl border-2 transition-all duration-300 hover:scale-105',
                  selectedPairs.second.color?.id === color.id 
                    ? 'border-[#C8AE7D] bg-[#C8AE7D]/10' 
                    : 'border-[#E8E2D6]/20 hover:border-[#C8AE7D]/50'
                ]"
              >
                <div 
                  :class="[
                    'w-16 h-16 rounded-full mb-3 border-4',
                    color.id === 'black' ? 'bg-black border-gray-600' : 'bg-white border-gray-300'
                  ]"
                ></div>
                <span class="font-medium">{{ color.name }}</span>
              </button>
            </div>
          </div>
          
          <!-- Tamanhos -->
          <div class="mb-6">
            <h4 class="text-lg font-semibold mb-4 text-[#E8E2D6]">Numeração:</h4>
            <div class="grid grid-cols-4 md:grid-cols-7 gap-3 max-w-md mx-auto">
              <button 
                v-for="size in sizes" 
                :key="size"
                @click="selectSize(2, size)"
                :class="[
                  'py-3 px-4 rounded-xl border-2 font-semibold transition-all duration-300 hover:scale-105',
                  selectedPairs.second.size === size 
                    ? 'border-[#C8AE7D] bg-[#C8AE7D] text-[#0B0B0C]' 
                    : 'border-[#E8E2D6]/20 hover:border-[#C8AE7D]/50'
                ]"
              >
                {{ size }}
              </button>
            </div>
          </div>
        </div>
        
        <!-- Resumo e CTA -->
        <div class="text-center">
          <div class="bg-gradient-to-r from-[#C8AE7D]/10 to-[#E8E2D6]/10 backdrop-blur-sm border border-[#C8AE7D]/20 rounded-2xl p-8 mb-8 max-w-2xl mx-auto">
            <h4 class="text-2xl font-bold mb-4">Resumo do seu pedido</h4>
            <div class="space-y-2 text-[#E8E2D6] mb-6">
              <div v-if="selectedPairs.first.color && selectedPairs.first.size">
                1º par: {{ selectedPairs.first.color.name }} - Tamanho {{ selectedPairs.first.size }}
              </div>
              <div v-if="selectedPairs.second.color && selectedPairs.second.size">
                2º par: {{ selectedPairs.second.color.name }} - Tamanho {{ selectedPairs.second.size }}
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
    </section>
    
    <!-- Galeria Premium -->
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
                 src="https://majestad.com.br/wp-content/uploads/2025/02/DSC03016.avif"
                 alt="Salto Majestad Preto Ônix - Vista Principal"
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
                 src="https://majestad.com.br/wp-content/uploads/2025/02/DSC03084.avif"
                 alt="Salto Majestad Branco Pérola"
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
         <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
           <div class="group cursor-pointer">
             <div class="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#C8AE7D]/10 to-[#E8E2D6]/10 aspect-square">
               <img 
                 src="https://majestad.com.br/wp-content/uploads/2025/02/DSC03016.avif"
                 alt="Detalhe do salto"
                 class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                 loading="lazy"
               >
               <div class="absolute inset-0 bg-[#0B0B0C]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
             </div>
           </div>
           
           <div class="group cursor-pointer">
             <div class="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#C8AE7D]/10 to-[#E8E2D6]/10 aspect-square">
               <img 
                 src="https://majestad.com.br/wp-content/uploads/2025/02/DSC03084.avif"
                 alt="Vista lateral"
                 class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                 loading="lazy"
               >
               <div class="absolute inset-0 bg-[#0B0B0C]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
             </div>
           </div>
           
           <div class="group cursor-pointer">
             <div class="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#C8AE7D]/10 to-[#E8E2D6]/10 aspect-square">
               <img 
                 src="https://majestad.com.br/wp-content/uploads/2025/02/DSC03016.avif"
                 alt="Detalhe da palmilha"
                 class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                 loading="lazy"
               >
               <div class="absolute inset-0 bg-[#0B0B0C]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
             </div>
           </div>
           
           <div class="group cursor-pointer">
             <div class="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#C8AE7D]/10 to-[#E8E2D6]/10 aspect-square">
               <img 
                 src="https://majestad.com.br/wp-content/uploads/2025/02/DSC03084.avif"
                 alt="Vista traseira"
                 class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                 loading="lazy"
               >
               <div class="absolute inset-0 bg-[#0B0B0C]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
             </div>
           </div>
         </div>
         
         <!-- Características Visuais -->
         <div class="mt-16 grid md:grid-cols-3 gap-8 text-center">
           <div class="group">
             <div class="w-16 h-16 bg-gradient-to-r from-[#C8AE7D] to-[#E8E2D6] rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
               <svg class="w-8 h-8 text-[#0B0B0C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                 <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
               </svg>
             </div>
             <h3 class="text-lg font-semibold mb-2">Design Minimalista</h3>
             <p class="text-[#E8E2D6] text-sm">Linhas limpas e elegantes</p>
           </div>
           
           <div class="group">
             <div class="w-16 h-16 bg-gradient-to-r from-[#C8AE7D] to-[#E8E2D6] rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
               <svg class="w-8 h-8 text-[#0B0B0C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path>
               </svg>
             </div>
             <h3 class="text-lg font-semibold mb-2">Acabamento Premium</h3>
             <p class="text-[#E8E2D6] text-sm">Materiais de alta qualidade</p>
           </div>
           
           <div class="group">
             <div class="w-16 h-16 bg-gradient-to-r from-[#C8AE7D] to-[#E8E2D6] rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
               <svg class="w-8 h-8 text-[#0B0B0C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z"></path>
               </svg>
             </div>
             <h3 class="text-lg font-semibold mb-2">Versatilidade</h3>
             <p class="text-[#E8E2D6] text-sm">Para todas as ocasiões</p>
           </div>
         </div>
       </div>
     </section>
    
    <!-- Por que Majestad -->
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
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
              </svg>
            </div>
            <h3 class="text-2xl font-bold mb-4">Conforto Superior</h3>
            <p class="text-[#E8E2D6] leading-relaxed">
              Palmilha anatômica e materiais premium garantem conforto inigualável durante todo o dia
            </p>
          </div>
          
          <div class="text-center group">
            <div class="w-20 h-20 bg-gradient-to-r from-[#C8AE7D] to-[#E8E2D6] rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
              <svg class="w-10 h-10 text-[#0B0B0C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <h3 class="text-2xl font-bold mb-4">Estilo Atemporal</h3>
            <p class="text-[#E8E2D6] leading-relaxed">
              Design clássico e elegante que transcende tendências e acompanha você por anos
            </p>
          </div>
          
          <div class="text-center group">
            <div class="w-20 h-20 bg-gradient-to-r from-[#C8AE7D] to-[#E8E2D6] rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
              <svg class="w-10 h-10 text-[#0B0B0C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <h3 class="text-2xl font-bold mb-4">Acabamento Impecável</h3>
            <p class="text-[#E8E2D6] leading-relaxed">
              Cada detalhe cuidadosamente trabalhado com materiais de alta qualidade e certificado de autenticidade
            </p>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Unboxing de Luxo -->
    <section class="py-20 px-4">
      <div class="max-w-6xl mx-auto">
        <div class="bg-gradient-to-r from-[#C8AE7D]/10 to-[#E8E2D6]/10 backdrop-blur-sm border border-[#C8AE7D]/20 rounded-3xl p-12">
          <div class="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 class="text-4xl md:text-5xl font-serif font-bold mb-6">
                Experiência de <span class="text-[#C8AE7D]">luxo</span> completa
              </h2>
              <p class="text-xl text-[#E8E2D6] mb-8 leading-relaxed">
                Desde o momento que você abre a caixa, cada detalhe foi pensado para proporcionar uma experiência única e sofisticada.
              </p>
              
              <div class="space-y-4">
                <div class="flex items-center gap-4">
                  <div class="w-3 h-3 bg-[#C8AE7D] rounded-full"></div>
                  <span class="text-lg">Embalagem sofisticada e sustentável</span>
                </div>
                <div class="flex items-center gap-4">
                  <div class="w-3 h-3 bg-[#C8AE7D] rounded-full"></div>
                  <span class="text-lg">Certificado de autenticidade exclusivo</span>
                </div>
                <div class="flex items-center gap-4">
                  <div class="w-3 h-3 bg-[#C8AE7D] rounded-full"></div>
                  <span class="text-lg">Saquinho de proteção premium</span>
                </div>
              </div>
            </div>
            
            <div class="relative">
              <div class="aspect-square bg-gradient-to-br from-[#C8AE7D]/20 to-[#E8E2D6]/20 rounded-3xl flex items-center justify-center">
                <svg class="w-32 h-32 text-[#C8AE7D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M9 9h6"></path>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Prova Social -->
    <section class="py-20 px-4">
      <div class="max-w-6xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-4xl md:text-5xl font-serif font-bold mb-6">
            O que nossas <span class="text-[#C8AE7D]">clientes</span> dizem
          </h2>
          
          <div class="flex items-center justify-center gap-4 mb-8">
            <div class="flex gap-1">
              <svg v-for="i in 5" :key="i" class="w-8 h-8 text-[#C8AE7D]" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
              </svg>
            </div>
            <span class="text-2xl font-bold">4,9/5</span>
          </div>
          
          <p class="text-xl text-[#C8AE7D] font-semibold mb-12">98% das clientes recomendam</p>
        </div>
        
        <div class="grid md:grid-cols-3 gap-8">
          <div class="bg-gradient-to-r from-[#C8AE7D]/5 to-[#E8E2D6]/5 backdrop-blur-sm border border-[#C8AE7D]/20 rounded-2xl p-8">
            <div class="flex gap-1 mb-4">
              <svg v-for="i in 5" :key="i" class="w-5 h-5 text-[#C8AE7D]" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
              </svg>
            </div>
            <p class="text-[#E8E2D6] mb-6 leading-relaxed">
              "Simplesmente perfeito! O conforto é incrível e o design é elegante. Uso o dia todo sem cansar os pés."
            </p>
            <div class="font-semibold text-[#C8AE7D]">Marina S.</div>
            <div class="text-sm text-[#E8E2D6]">São Paulo, SP</div>
          </div>
          
          <div class="bg-gradient-to-r from-[#C8AE7D]/5 to-[#E8E2D6]/5 backdrop-blur-sm border border-[#C8AE7D]/20 rounded-2xl p-8">
            <div class="flex gap-1 mb-4">
              <svg v-for="i in 5" :key="i" class="w-5 h-5 text-[#C8AE7D]" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
              </svg>
            </div>
            <p class="text-[#E8E2D6] mb-6 leading-relaxed">
              "Qualidade excepcional! A embalagem é linda e o sapato supera todas as expectativas. Recomendo!"
            </p>
            <div class="font-semibold text-[#C8AE7D]">Ana Clara R.</div>
            <div class="text-sm text-[#E8E2D6]">Rio de Janeiro, RJ</div>
          </div>
          
          <div class="bg-gradient-to-r from-[#C8AE7D]/5 to-[#E8E2D6]/5 backdrop-blur-sm border border-[#C8AE7D]/20 rounded-2xl p-8">
            <div class="flex gap-1 mb-4">
              <svg v-for="i in 5" :key="i" class="w-5 h-5 text-[#C8AE7D]" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
              </svg>
            </div>
            <p class="text-[#E8E2D6] mb-6 leading-relaxed">
              "Estilo atemporal e sofisticação em cada detalhe. Meu salto favorito para todas as ocasiões!"
            </p>
            <div class="font-semibold text-[#C8AE7D]">Beatriz M.</div>
            <div class="text-sm text-[#E8E2D6]">Belo Horizonte, MG</div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- FAQ -->
    <section class="py-20 px-4">
      <div class="max-w-4xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-4xl md:text-5xl font-serif font-bold mb-6">
            Dúvidas <span class="text-[#C8AE7D]">frequentes</span>
          </h2>
        </div>
        
        <div class="space-y-4">
          <div 
            v-for="(faq, index) in faqs" 
            :key="index"
            class="bg-gradient-to-r from-[#C8AE7D]/5 to-[#E8E2D6]/5 backdrop-blur-sm border border-[#C8AE7D]/20 rounded-2xl overflow-hidden"
          >
            <button 
              @click="toggleFaq(index)"
              class="w-full p-6 text-left flex justify-between items-center hover:bg-[#C8AE7D]/10 transition-colors duration-300"
            >
              <span class="text-lg font-semibold">{{ faq.question }}</span>
              <svg 
                :class="['w-6 h-6 transition-transform duration-300', openFaq === index ? 'rotate-180' : '']"
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>
            <div 
              v-if="openFaq === index"
              class="px-6 pb-6 text-[#E8E2D6] leading-relaxed"
            >
              {{ faq.answer }}
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- CTA Flutuante Mobile -->
    <div class="fixed bottom-0 left-0 right-0 z-50 md:hidden">
      <div class="bg-gradient-to-r from-[#C8AE7D] to-[#E8E2D6] p-4 shadow-2xl">
        <div class="flex items-center justify-between text-[#0B0B0C]">
          <div>
            <div class="font-bold text-lg">2 pares por R$ 349,90</div>
            <div class="text-sm opacity-80">Economia de R$ 525,90</div>
          </div>
          <button 
            @click="scrollToSelector"
            class="bg-[#0B0B0C] text-[#C8AE7D] px-6 py-3 rounded-full font-semibold hover:scale-105 transition-transform duration-300"
          >
            Garantir
          </button>
        </div>
      </div>
    </div>
    
    <!-- WhatsApp Flutuante -->
    <a 
      href="https://wa.me/5511999999999?text=Olá! Tenho interesse no combo 2 pares por R$ 349,90"
      target="_blank"
      class="fixed bottom-6 right-6 z-50 bg-green-500 text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform duration-300"
    >
      <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"></path>
      </svg>
    </a>
  </div>
</template>
