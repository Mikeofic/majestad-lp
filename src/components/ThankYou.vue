<template>
  <div class="min-h-screen bg-gradient-to-br from-[#0B0B0C] via-[#1a1a1a] to-[#0B0B0C] flex items-center justify-center px-4 py-8">
    <div class="max-w-2xl mx-auto text-center">
      <!-- Ícone de Sucesso -->
      <div class="mb-8">
        <div class="w-24 h-24 bg-gradient-to-r from-[#C8AE7D] to-[#E8E2D6] rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
          <svg class="w-12 h-12 text-[#0B0B0C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
      </div>

      <!-- Título Principal -->
      <h1 class="text-4xl md:text-5xl font-serif font-bold mb-6 text-[#E8E2D6]">
        Obrigado pela sua <span class="text-[#C8AE7D]">Compra!</span>
      </h1>

      <!-- Subtítulo -->
      <p class="text-xl text-[#E8E2D6]/80 mb-8 leading-relaxed">
        Seu pedido foi confirmado com sucesso. Em breve você receberá um e-mail com todos os detalhes.
      </p>

      <!-- Card de Informações -->
      <div class="bg-gradient-to-br from-[#C8AE7D]/10 to-[#E8E2D6]/10 backdrop-blur-sm border border-[#C8AE7D]/20 rounded-2xl p-8 mb-8">
        <h2 class="text-2xl font-bold text-[#C8AE7D] mb-6">O que acontece agora?</h2>
        
        <div class="grid md:grid-cols-3 gap-6">
          <!-- Passo 1 -->
          <div class="text-center">
            <div class="w-16 h-16 bg-[#C8AE7D] rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-[#0B0B0C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
              </svg>
            </div>
            <h3 class="font-bold text-[#E8E2D6] mb-2">Confirmação por E-mail</h3>
            <p class="text-sm text-[#E8E2D6]/70">Você receberá um e-mail com os detalhes do seu pedido em alguns minutos</p>
          </div>

          <!-- Passo 2 -->
          <div class="text-center">
            <div class="w-16 h-16 bg-[#C8AE7D] rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-[#0B0B0C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
              </svg>
            </div>
            <h3 class="font-bold text-[#E8E2D6] mb-2">Preparação</h3>
            <p class="text-sm text-[#E8E2D6]/70">Seu Majestad será cuidadosamente embalado em nossa caixa premium</p>
          </div>

          <!-- Passo 3 -->
          <div class="text-center">
            <div class="w-16 h-16 bg-[#C8AE7D] rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-[#0B0B0C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <h3 class="font-bold text-[#E8E2D6] mb-2">Rastreamento</h3>
            <p class="text-sm text-[#E8E2D6]/70">Código de rastreamento será enviado para acompanhar a entrega</p>
          </div>
        </div>
      </div>

      <!-- Informações de Entrega -->
      <div class="bg-gradient-to-br from-[#C8AE7D]/5 to-[#E8E2D6]/5 border border-[#C8AE7D]/20 rounded-xl p-6 mb-8">
        <h3 class="text-lg font-bold text-[#C8AE7D] mb-4">📦 Prazo de Entrega</h3>
        <div class="grid md:grid-cols-3 gap-4 text-sm">
          <div class="text-center">
            <div class="font-semibold text-[#E8E2D6]">Sudeste</div>
            <div class="text-[#E8E2D6]/70">2-4 dias úteis</div>
          </div>
          <div class="text-center">
            <div class="font-semibold text-[#E8E2D6]">Sul</div>
            <div class="text-[#E8E2D6]/70">3-6 dias úteis</div>
          </div>
          <div class="text-center">
            <div class="font-semibold text-[#E8E2D6]">Demais Regiões</div>
            <div class="text-[#E8E2D6]/70">5-8 dias úteis</div>
          </div>
        </div>
      </div>

      <!-- Botões de Ação -->
      <div class="flex flex-col sm:flex-row gap-4 justify-center mb-8">
        <a 
          href="https://majestad.com.br" 
          class="bg-gradient-to-r from-[#C8AE7D] to-[#E8E2D6] text-[#0B0B0C] px-8 py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center"
        >
          Voltar ao Site
        </a>
        <a 
          href="https://wa.me/5511999999999" 
          target="_blank"
          class="border border-[#C8AE7D] text-[#C8AE7D] px-8 py-3 rounded-full font-semibold hover:bg-[#C8AE7D] hover:text-[#0B0B0C] transition-all duration-300 flex items-center justify-center"
        >
          <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.109"/>
          </svg>
          Falar no WhatsApp
        </a>
      </div>

      <!-- Garantias -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
        <div class="flex flex-col items-center">
          <svg class="w-8 h-8 text-[#C8AE7D] mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
          </svg>
          <span class="text-xs text-[#E8E2D6]">Compra Segura</span>
        </div>
        <div class="flex flex-col items-center">
          <svg class="w-8 h-8 text-[#C8AE7D] mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
          </svg>
          <span class="text-xs text-[#E8E2D6]">1ª Troca Grátis</span>
        </div>
        <div class="flex flex-col items-center">
          <svg class="w-8 h-8 text-[#C8AE7D] mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
          </svg>
          <span class="text-xs text-[#E8E2D6]">Embalagem Premium</span>
        </div>
        <div class="flex flex-col items-center">
          <svg class="w-8 h-8 text-[#C8AE7D] mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <span class="text-xs text-[#E8E2D6]">Rastreamento</span>
        </div>
      </div>

      <!-- Footer -->
      <div class="mt-12 pt-8 border-t border-[#C8AE7D]/20">
        <p class="text-sm text-[#E8E2D6]/60">
          Dúvidas? Entre em contato conosco pelo WhatsApp ou e-mail
        </p>
        <div class="flex justify-center space-x-6 mt-4">
          <a href="mailto:contato@majestad.com.br" class="text-[#C8AE7D] hover:text-[#E8E2D6] transition-colors text-sm">
            contato@majestad.com.br
          </a>
          <a href="https://wa.me/5511999999999" target="_blank" class="text-[#C8AE7D] hover:text-[#E8E2D6] transition-colors text-sm">
            WhatsApp
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

// Declarações para Google Analytics e Facebook Pixel
declare global {
  interface Window {
    gtag: (...args: any[]) => void
    fbq: (...args: any[]) => void
  }
}

// Declaração para Facebook Pixel global
declare const fbq: (...args: any[]) => void

// Analytics tracking para página de obrigado
onMounted(() => {
  // Google Analytics - Purchase event
  if (typeof gtag !== 'undefined') {
    gtag('event', 'purchase', {
      event_category: 'ecommerce',
      transaction_id: new Date().getTime().toString(),
      currency: 'BRL'
    })
  }
  
  // Facebook Pixel - Purchase event
  if (typeof fbq !== 'undefined') {
    fbq('track', 'Purchase')
  }
})
</script>

<style scoped>
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: .8;
  }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
</style>