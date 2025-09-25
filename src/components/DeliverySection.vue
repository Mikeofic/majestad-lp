<template>
  <!-- Entrega, Prazos e Frete -->
  <section id="delivery" class="py-20 px-4 bg-gradient-to-b from-[#1a1a1a] to-[#0B0B0C]">
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
          <p class="text-3xl font-bold mb-2">5-8 dias</p>
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
              <span class="text-[#E8E2D6]">R$ 20</span>
            </div>
            <div class="flex justify-between items-center py-3">
              <span class="text-[#E8E2D6]">Entrega expressa</span>
              <span class="text-[#E8E2D6]">R$ 40</span>
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
</template>

<script setup lang="ts">
// Se necessário, futuramente podemos receber dados dinâmicos via props.
</script>