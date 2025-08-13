<template>
  <div 
    v-if="showBanner" 
    class="fixed bottom-0 left-0 right-0 bg-gray-900/95 backdrop-blur-sm text-white text-sm py-3 px-4 z-50 border-t border-gray-700"
  >
    <div class="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
      <div class="flex-1">
        <p class="leading-relaxed">
          🍪 Este site utiliza cookies para melhorar sua experiência de navegação e para fins analíticos. 
          <button 
            @click="showDetails = !showDetails" 
            class="text-blue-300 hover:text-blue-200 underline transition-colors"
          >
            {{ showDetails ? 'Ocultar detalhes' : 'Saiba mais' }}
          </button>
        </p>
        
        <div v-if="showDetails" class="mt-2 text-xs text-gray-300 leading-relaxed">
          <p class="mb-1">
            <strong>Cookies essenciais:</strong> Necessários para o funcionamento básico do site.
          </p>
          <p class="mb-1">
            <strong>Cookies analíticos:</strong> Google Analytics para entender como você usa nosso site.
          </p>
          <p>
            Você pode gerenciar suas preferências a qualquer momento. 
            <a href="#" @click.prevent="openPrivacyPolicy" class="text-blue-300 hover:text-blue-200 underline">
              Política de Privacidade
            </a>
          </p>
        </div>
      </div>
      
      <div class="flex gap-2 flex-shrink-0">
        <button 
          @click="acceptAll" 
          class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
        >
          Aceitar todos
        </button>
        <button 
          @click="acceptEssential" 
          class="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
        >
          Apenas essenciais
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const showBanner = ref(false)
const showDetails = ref(false)

// Verifica se o usuário já deu consentimento
const checkConsent = () => {
  const consent = localStorage.getItem('lgpd-consent')
  return consent !== null
}

// Salva o consentimento no localStorage
const saveConsent = (type: 'all' | 'essential') => {
  const consentData = {
    type,
    timestamp: new Date().toISOString(),
    version: '1.0'
  }
  localStorage.setItem('lgpd-consent', JSON.stringify(consentData))
  
  // Dispara evento customizado para outros componentes
  window.dispatchEvent(new CustomEvent('lgpd-consent', { 
    detail: { type, accepted: true } 
  }))
}

// Aceitar todos os cookies
const acceptAll = () => {
  saveConsent('all')
  showBanner.value = false
  
  // Habilita Google Analytics se não estiver habilitado
  if (typeof window.gtag !== 'undefined') {
    window.gtag('consent', 'update', {
      analytics_storage: 'granted',
      ad_storage: 'granted'
    })
  }
}

// Aceitar apenas cookies essenciais
const acceptEssential = () => {
  saveConsent('essential')
  showBanner.value = false
  
  // Mantém Google Analytics desabilitado
  if (typeof window.gtag !== 'undefined') {
    window.gtag('consent', 'update', {
      analytics_storage: 'denied',
      ad_storage: 'denied'
    })
  }
}

// Abrir política de privacidade (placeholder)
const openPrivacyPolicy = () => {
  // Aqui você pode implementar a abertura da política de privacidade
  // Por exemplo, abrir um modal ou redirecionar para uma página
  alert('Implementar: Abrir política de privacidade')
}

// Inicializa o banner
onMounted(() => {
  // Mostra o banner apenas se o usuário não deu consentimento
  if (!checkConsent()) {
    // Pequeno delay para não aparecer imediatamente
    setTimeout(() => {
      showBanner.value = true
    }, 1000)
  } else {
    // Se já deu consentimento, configura o Google Analytics baseado na escolha
    const consent = JSON.parse(localStorage.getItem('lgpd-consent') || '{}')
    if (consent.type === 'all' && typeof window.gtag !== 'undefined') {
      window.gtag('consent', 'update', {
        analytics_storage: 'granted',
        ad_storage: 'granted'
      })
    }
  }
})

// Função para resetar consentimento (útil para desenvolvimento)
const resetConsent = () => {
  localStorage.removeItem('lgpd-consent')
  showBanner.value = true
}

// Expõe função para outros componentes
defineExpose({
  resetConsent
})
</script>

<style scoped>
/* Animação suave para o banner */
.fixed {
  animation: slideUp 0.3s ease-out;
}

@keyframes slideUp {
  from {
    transform: translateY(100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
</style>