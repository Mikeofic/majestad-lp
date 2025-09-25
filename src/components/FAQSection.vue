<template>
  <!-- FAQ Enxuto -->
  <section id="faq" class="py-20 px-4 bg-gradient-to-b from-[#1a1a1a] to-[#0B0B0C]">
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
        <div 
          v-for="(item, index) in faqs" 
          :key="index" 
          class="bg-[#C8AE7D]/10 border border-[#C8AE7D]/20 rounded-3xl p-6"
        >
          <button 
            @click="toggleFaq(index)"
            class="w-full text-left flex justify-between items-center"
          >
            <h3 class="text-xl font-bold text-[#E8E2D6] pr-4">{{ item.question }}</h3>
            <svg 
              :class="openIndex === index ? 'rotate-180' : ''"
              class="w-6 h-6 text-[#C8AE7D] transition-transform duration-300 flex-shrink-0"
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </button>
          <div 
            v-show="openIndex === index"
            class="mt-4 text-[#E8E2D6] leading-relaxed"
          >
            <slot name="answer" :item="item">
              <span v-html="item.answer"></span>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface FaqItem {
  question: string
  answer: string
}

const props = defineProps<{ faqs: FaqItem[] }>()
const emit = defineEmits<{
  (e: 'faq-toggle', payload: { question: string; action: 'open' | 'close'; index: number }): void
}>()

const openIndex = ref<number | null>(null)

const toggleFaq = (index: number) => {
  const wasOpen = openIndex.value === index
  openIndex.value = wasOpen ? null : index
  const action: 'open' | 'close' = wasOpen ? 'close' : 'open'
  emit('faq-toggle', { question: props.faqs[index].question, action, index })
}
</script>