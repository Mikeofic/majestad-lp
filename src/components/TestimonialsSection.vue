<template>
  <!-- Prova Social -->
  <section class="py-20 px-4 bg-gradient-to-b from-[#0B0B0C] to-[#1a1a1a]">
    <div class="max-w-6xl mx-auto">
      <div class="text-center mb-16">
        <h2 class="text-4xl md:text-5xl font-serif font-bold mb-6">
          Quem já usa, <span class="text-[#C8AE7D]">aprova</span>
        </h2>
        
        <!-- Estatísticas -->
        <div class="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-8 mb-12">
          <div class="text-center">
            <div class="flex items-center justify-center mb-2">
              <div class="flex text-yellow-400 text-xl sm:text-2xl">
                <span v-for="i in 5" :key="i">★</span>
              </div>
              <span class="ml-2 text-2xl sm:text-3xl font-bold text-[#C8AE7D]">4.9</span>
            </div>
            <p class="text-[#E8E2D6] text-sm sm:text-base">Avaliação média</p>
          </div>
          
          <div class="hidden sm:block w-px h-16 bg-[#2A2A2A]"></div>
          <div class="block sm:hidden w-16 h-px bg-[#2A2A2A]"></div>
          
          <div class="text-center">
            <div class="text-2xl sm:text-3xl font-bold text-[#C8AE7D] mb-2">98%</div>
            <p class="text-[#E8E2D6] text-sm sm:text-base">Recomendam</p>
          </div>
          
          <div class="hidden sm:block w-px h-16 bg-[#2A2A2A]"></div>
          <div class="block sm:hidden w-16 h-px bg-[#2A2A2A]"></div>
          
          <div class="text-center">
            <div class="text-2xl sm:text-3xl font-bold text-[#C8AE7D] mb-2">2.847</div>
            <p class="text-[#E8E2D6] text-sm sm:text-base">Clientes satisfeitas</p>
          </div>
        </div>
      </div>
      
      <!-- Carrossel de Depoimentos -->
      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-16">
        <div v-for="(testimonial, index) in testimonials" :key="index" class="bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl p-4 sm:p-6">
          <div class="flex items-center mb-4">
            <div class="flex text-yellow-400 text-base sm:text-lg mr-3">
              <span v-for="i in 5" :key="i">★</span>
            </div>
            <span class="text-[#C8AE7D] font-semibold text-sm sm:text-base">5.0</span>
          </div>
          
          <p class="text-[#E8E2D6] mb-4 sm:mb-6 leading-relaxed italic text-sm sm:text-base">
            "{{ testimonial.text }}"
          </p>
          
          <div class="flex items-center">
            <div class="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-[#C8AE7D] to-[#E8E2D6] rounded-full flex items-center justify-center mr-3 sm:mr-4">
              <span class="text-[#0B0B0C] font-bold text-base sm:text-lg">{{ testimonial.name.charAt(0) }}</span>
            </div>
            <div>
              <div class="font-semibold text-sm sm:text-base">{{ testimonial.name }}</div>
              <div class="text-xs sm:text-sm text-[#E8E2D6]">Cliente verificada</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
interface Testimonial {
  id: number
  name: string
  rating: number
  text: string
  verified: boolean
}

const props = defineProps<{ testimonials: Testimonial[] }>()
</script>