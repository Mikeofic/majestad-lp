<template>
  <!-- Guia de Tamanhos -->
  <section id="size-guide" class="py-20 px-4 bg-gradient-to-b from-[#1a1a1a] to-[#0B0B0C]">
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
</template>

<script setup lang="ts">
// Se necessário, futuramente podemos receber uma tabela de tamanhos via props.
</script>