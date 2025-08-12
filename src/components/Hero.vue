<script setup lang="ts">
// Nenhuma lógica específica necessária para este componente
</script>

<template>
  <section class="relative bg-gradient-to-r from-primary-50 to-primary-100 py-20">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <!-- Content -->
        <div class="space-y-8">
          <div class="space-y-4">
            <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 font-serif leading-tight">
              Bem-vindo à
              <span class="text-primary-600">Majestad</span>
            </h1>
            <p class="text-xl text-gray-600 leading-relaxed">
              Descubra produtos únicos e de alta qualidade selecionados especialmente para você. 
              Uma experiência de compra excepcional te aguarda.
            </p>
          </div>
          
          <div class="flex flex-col sm:flex-row gap-4">
            <button class="btn-primary text-lg px-8 py-3 flex items-center justify-center gap-2">
              Explorar Produtos
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </button>
            <button class="btn-secondary text-lg px-8 py-3 flex items-center justify-center gap-2">
              Ver Ofertas
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </button>
          </div>
          
          <!-- Features -->
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8">
            <div class="flex items-center space-x-3">
              <div class="flex-shrink-0">
                <svg class="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <div>
                <h3 class="font-semibold text-gray-900">Qualidade Garantida</h3>
                <p class="text-sm text-gray-600">Produtos selecionados</p>
              </div>
            </div>
            
            <div class="flex items-center space-x-3">
              <div class="flex-shrink-0">
                <svg class="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <div>
                <h3 class="font-semibold text-gray-900">Entrega Rápida</h3>
                <p class="text-sm text-gray-600">Em todo o Brasil</p>
              </div>
            </div>
            
            <div class="flex items-center space-x-3">
              <div class="flex-shrink-0">
                <svg class="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                </svg>
              </div>
              <div>
                <h3 class="font-semibold text-gray-900">Compra Segura</h3>
                <p class="text-sm text-gray-600">100% protegida</p>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Image/Visual -->
        <div class="relative">
          <div class="aspect-w-4 aspect-h-3 rounded-2xl overflow-hidden bg-gradient-to-br from-[#C8AE7D]/10 to-[#E8E2D6]/10 flex items-center justify-center">
            <!-- Imagem da sandália -->
            <img 
              src="/sandalia-hero.svg" 
              alt="Sandália Majestad" 
              class="w-80 h-80 object-contain drop-shadow-2xl transform hover:scale-105 transition-transform duration-500"
            />
          </div>
          
          <!-- Floating elements -->
          <div class="absolute -top-4 -right-4 bg-white rounded-full p-4 shadow-lg">
            <svg class="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
            </svg>
          </div>
          
          <div class="absolute -bottom-4 -left-4 bg-white rounded-full p-4 shadow-lg">
            <svg class="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path>
            </svg>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Background decoration -->
    <div class="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
      <div class="absolute top-10 left-10 w-20 h-20 bg-primary-200 rounded-full opacity-50"></div>
      <div class="absolute bottom-10 right-10 w-32 h-32 bg-primary-300 rounded-full opacity-30"></div>
      <div class="absolute top-1/2 left-1/4 w-16 h-16 bg-primary-400 rounded-full opacity-20"></div>
    </div>
  </section>
</template>