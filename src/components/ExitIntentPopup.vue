<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <div
        v-if="showPopup"
        class="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
        @click.self="closePopup"
      >
        <div class="relative max-w-md w-full bg-gradient-to-br from-[#1A1A1A] to-[#0B0B0C] border border-[#C8AE7D]/30 rounded-2xl shadow-2xl overflow-hidden">
          <!-- Close Button -->
          <button
            @click="closePopup"
            class="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-[#C8AE7D]/10 hover:bg-[#C8AE7D]/20 transition-colors duration-200 group"
          >
            <svg class="w-4 h-4 text-[#E8E2D6] group-hover:text-[#C8AE7D] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>

          <!-- Header with Urgency -->
          <div class="bg-gradient-to-r from-red-600 to-red-500 px-6 py-3">
            <div class="flex items-center justify-center space-x-2">
              <svg class="w-5 h-5 text-white animate-pulse" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path>
              </svg>
              <span class="text-white font-bold text-sm uppercase tracking-wide">OFERTA LIMITADA</span>
            </div>
          </div>

          <!-- Content -->
          <div class="p-6">
            <!-- Main Message -->
            <div class="text-center mb-6">
              <h2 class="text-2xl font-bold text-[#E8E2D6] mb-2">
                🚨 Espere! Não perca esta oportunidade!
              </h2>
              <p class="text-[#E8E2D6]/80 text-sm leading-relaxed">
                Você está prestes a perder nossa <strong class="text-[#C8AE7D]">oferta exclusiva</strong> com desconto especial!
              </p>
            </div>

            <!-- Timer -->
            <div class="bg-gradient-to-r from-[#C8AE7D]/10 to-[#E8E2D6]/10 border border-[#C8AE7D]/30 rounded-xl p-4 mb-6">
              <div class="text-center">
                <p class="text-[#E8E2D6]/70 text-xs uppercase tracking-wide mb-2">Esta oferta expira em:</p>
                <div class="flex justify-center space-x-2 text-[#C8AE7D] font-bold">
                  <div class="bg-[#C8AE7D]/20 rounded-lg px-3 py-2 min-w-[50px]">
                    <div class="text-xl">{{ timeLeft.hours.toString().padStart(2, '0') }}</div>
                    <div class="text-xs text-[#E8E2D6]/60">HORAS</div>
                  </div>
                  <div class="flex items-center text-2xl">:</div>
                  <div class="bg-[#C8AE7D]/20 rounded-lg px-3 py-2 min-w-[50px]">
                    <div class="text-xl">{{ timeLeft.minutes.toString().padStart(2, '0') }}</div>
                    <div class="text-xs text-[#E8E2D6]/60">MIN</div>
                  </div>
                  <div class="flex items-center text-2xl">:</div>
                  <div class="bg-[#C8AE7D]/20 rounded-lg px-3 py-2 min-w-[50px]">
                    <div class="text-xl">{{ timeLeft.seconds.toString().padStart(2, '0') }}</div>
                    <div class="text-xs text-[#E8E2D6]/60">SEG</div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Offer Details -->
            <div class="bg-[#C8AE7D]/5 border border-[#C8AE7D]/20 rounded-lg p-4 mb-6">
              <div class="flex items-center justify-between mb-2">
                <span class="text-[#E8E2D6] font-medium">Combo 2 Pares</span>
                <span class="text-[#E8E2D6]/60 line-through text-sm">R$ 1.074</span>
              </div>
              <div class="flex items-center justify-between mb-2">
                <span class="text-green-400 font-bold text-lg">Preço Especial:</span>
                <span class="text-[#C8AE7D] font-bold text-2xl">R$ 897</span>
              </div>
              <div class="text-center">
                <span class="bg-green-500 text-white px-2 py-1 rounded text-xs font-bold">ECONOMIZE R$ 177</span>
              </div>
            </div>

            <!-- CTA Buttons -->
            <div class="space-y-3">
              <button
                @click="stayAndBuy"
                class="w-full bg-gradient-to-r from-[#C8AE7D] to-[#E8E2D6] text-[#0B0B0C] font-bold py-4 px-6 rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01"></path>
                </svg>
                <span>SIM! QUERO APROVEITAR A OFERTA</span>
              </button>
              
              <button
                @click="closePopup"
                class="w-full text-[#E8E2D6]/60 hover:text-[#E8E2D6] text-sm py-2 transition-colors duration-200"
              >
                Não, obrigado. Prefiro pagar mais caro depois.
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, reactive } from 'vue'

// Props
interface Props {
  enabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  enabled: true
})

// State
const showPopup = ref(false)
const hasShown = ref(false)
const timerInterval = ref<ReturnType<typeof setInterval> | null>(null)

// Timer state (4 hours = 4 * 60 * 60 = 14400 seconds)
const timeLeft = reactive({
  hours: 4,
  minutes: 0,
  seconds: 0
})

// Exit intent detection
let exitIntentTriggered = false

const handleMouseLeave = (e: MouseEvent) => {
  // Detect if mouse is leaving from the top of the page
  if (e.clientY <= 0 && !exitIntentTriggered && !hasShown.value && props.enabled) {
    exitIntentTriggered = true
    showExitIntent()
  }
}

const showExitIntent = () => {
  if (!hasShown.value) {
    showPopup.value = true
    hasShown.value = true
    startTimer()
  }
}

const closePopup = () => {
  showPopup.value = false
  if (timerInterval.value) {
    clearInterval(timerInterval.value)
    timerInterval.value = null
  }
}

const stayAndBuy = () => {
  closePopup()
  // Scroll to the selector section
  const element = document.getElementById('selector')
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}

const startTimer = () => {
  // Get stored end time or create new one
  const storedEndTime = localStorage.getItem('offerEndTime')
  let endTime: number
  
  if (storedEndTime) {
    endTime = parseInt(storedEndTime)
  } else {
    // Set end time to 4 hours from now
    endTime = Date.now() + (4 * 60 * 60 * 1000)
    localStorage.setItem('offerEndTime', endTime.toString())
  }
  
  const updateTimer = () => {
    const now = Date.now()
    const remaining = Math.max(0, endTime - now)
    
    if (remaining === 0) {
      // Timer expired
      timeLeft.hours = 0
      timeLeft.minutes = 0
      timeLeft.seconds = 0
      if (timerInterval.value) {
        clearInterval(timerInterval.value)
        timerInterval.value = null
      }
      return
    }
    
    const totalSeconds = Math.floor(remaining / 1000)
    timeLeft.hours = Math.floor(totalSeconds / 3600)
    timeLeft.minutes = Math.floor((totalSeconds % 3600) / 60)
    timeLeft.seconds = totalSeconds % 60
  }
  
  // Update immediately
  updateTimer()
  
  // Update every second
  timerInterval.value = setInterval(updateTimer, 1000)
}

// Mobile exit intent (scroll to top quickly)
let lastScrollY = 0
const handleScroll = () => {
  const currentScrollY = window.scrollY
  
  // If user scrolls up quickly from a position > 100px
  if (currentScrollY < lastScrollY && currentScrollY < 100 && lastScrollY > 200) {
    if (!exitIntentTriggered && !hasShown.value && props.enabled) {
      exitIntentTriggered = true
      showExitIntent()
    }
  }
  
  lastScrollY = currentScrollY
}

// Lifecycle
onMounted(() => {
  if (props.enabled) {
    // Desktop exit intent
    document.addEventListener('mouseleave', handleMouseLeave)
    
    // Mobile exit intent
    window.addEventListener('scroll', handleScroll, { passive: true })
    
    // Also show after 30 seconds if not triggered
    setTimeout(() => {
      if (!hasShown.value && props.enabled) {
        showExitIntent()
      }
    }, 30000)
  }
})

onUnmounted(() => {
  document.removeEventListener('mouseleave', handleMouseLeave)
  window.removeEventListener('scroll', handleScroll)
  
  if (timerInterval.value) {
    clearInterval(timerInterval.value)
  }
})
</script>

<style scoped>
/* Additional animations */
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
</style>