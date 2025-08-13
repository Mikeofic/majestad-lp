// Analytics Service - Gerencia todos os eventos de tracking
// Compatível com Google Analytics 4 via Google Tag Manager

// Tipos para eventos de analytics
interface AnalyticsEvent {
  event: string
  [key: string]: any
}

interface ProductEvent {
  item_id: string
  item_name: string
  item_category: string
  item_variant?: string
  price: number
  quantity: number
}

interface PurchaseEvent {
  transaction_id: string
  value: number
  currency: string
  items: ProductEvent[]
}

// Declaração global para dataLayer
declare global {
  interface Window {
    dataLayer: any[]
    gtag: (...args: any[]) => void
  }
}

class AnalyticsService {
  private isInitialized = false

  constructor() {
    this.initializeDataLayer()
  }

  private initializeDataLayer() {
    if (typeof window !== 'undefined') {
      window.dataLayer = window.dataLayer || []
      this.isInitialized = true
    }
  }

  // Método genérico para enviar eventos
  private sendEvent(eventData: AnalyticsEvent) {
    if (!this.isInitialized || typeof window === 'undefined') {
      console.warn('Analytics não inicializado')
      return
    }

    try {
      window.dataLayer.push(eventData)
      console.log('Evento enviado:', eventData)
    } catch (error) {
      console.error('Erro ao enviar evento:', error)
    }
  }

  // Eventos de produto
  trackColorSelection(pairNumber: number, colorId: string, colorName: string) {
    this.sendEvent({
      event: 'select_color',
      pair_number: pairNumber,
      color_id: colorId,
      color_name: colorName,
      event_category: 'product_interaction',
      event_label: `Par ${pairNumber} - ${colorName}`
    })
  }

  trackSizeSelection(pairNumber: number, size: number, colorId: string) {
    this.sendEvent({
      event: 'select_size',
      pair_number: pairNumber,
      size: size,
      color_id: colorId,
      event_category: 'product_interaction',
      event_label: `Par ${pairNumber} - Tamanho ${size}`
    })
  }

  trackModeChange(mode: 'single' | 'combo', previousMode?: string) {
    this.sendEvent({
      event: 'change_purchase_mode',
      mode: mode,
      previous_mode: previousMode,
      event_category: 'user_interaction',
      event_label: `Modo: ${mode}`
    })
  }

  // Eventos de conversão
  trackAddToCart(items: ProductEvent[], value: number, mode: 'single' | 'combo') {
    this.sendEvent({
      event: 'add_to_cart',
      currency: 'BRL',
      value: value,
      purchase_mode: mode,
      items: items,
      event_category: 'ecommerce',
      event_label: `Carrinho - ${mode} - R$ ${value}`
    })
  }

  trackPurchase(purchaseData: PurchaseEvent, mode: 'single' | 'combo') {
    this.sendEvent({
      event: 'purchase',
      transaction_id: purchaseData.transaction_id,
      value: purchaseData.value,
      currency: purchaseData.currency,
      purchase_mode: mode,
      items: purchaseData.items,
      event_category: 'ecommerce',
      event_label: `Compra - ${mode} - R$ ${purchaseData.value}`
    })
  }

  // Eventos de engajamento
  trackScrollDepth(percentage: number) {
    this.sendEvent({
      event: 'scroll_depth',
      scroll_percentage: percentage,
      event_category: 'engagement',
      event_label: `Scroll ${percentage}%`
    })
  }

  trackTimeOnPage(seconds: number) {
    this.sendEvent({
      event: 'time_on_page',
      time_seconds: seconds,
      event_category: 'engagement',
      event_label: `${Math.floor(seconds / 60)}min ${seconds % 60}s`
    })
  }

  // Eventos de CTA
  trackCTAClick(ctaName: string, location: string, value?: number) {
    this.sendEvent({
      event: 'cta_click',
      cta_name: ctaName,
      cta_location: location,
      value: value,
      event_category: 'user_interaction',
      event_label: `${ctaName} - ${location}`
    })
  }

  trackButtonClick(buttonName: string, section: string) {
    this.sendEvent({
      event: 'button_click',
      button_name: buttonName,
      section: section,
      event_category: 'user_interaction',
      event_label: `${buttonName} - ${section}`
    })
  }

  // Eventos de FAQ
  trackFAQInteraction(question: string, action: 'open' | 'close') {
    this.sendEvent({
      event: 'faq_interaction',
      question: question,
      action: action,
      event_category: 'user_interaction',
      event_label: `FAQ ${action} - ${question}`
    })
  }

  // Eventos de galeria
  trackImageView(imageName: string, imageIndex: number) {
    this.sendEvent({
      event: 'image_view',
      image_name: imageName,
      image_index: imageIndex,
      event_category: 'content_interaction',
      event_label: `Imagem ${imageIndex} - ${imageName}`
    })
  }

  // Eventos de erro
  trackError(errorType: string, errorMessage: string, location: string) {
    this.sendEvent({
      event: 'error',
      error_type: errorType,
      error_message: errorMessage,
      error_location: location,
      event_category: 'error',
      event_label: `${errorType} - ${location}`
    })
  }

  // Eventos de formulário
  trackFormInteraction(formName: string, action: 'start' | 'complete' | 'abandon', field?: string) {
    this.sendEvent({
      event: 'form_interaction',
      form_name: formName,
      action: action,
      field: field,
      event_category: 'form',
      event_label: `${formName} - ${action}`
    })
  }

  // Método para configurar dados do usuário (GDPR compliant)
  setUserProperties(properties: { [key: string]: any }) {
    this.sendEvent({
      event: 'set_user_properties',
      user_properties: properties
    })
  }

  // Método para configurar dados customizados
  setCustomDimensions(dimensions: { [key: string]: any }) {
    this.sendEvent({
      event: 'set_custom_dimensions',
      custom_dimensions: dimensions
    })
  }
}

// Instância singleton
export const analytics = new AnalyticsService()

// Exportar tipos para uso em outros arquivos
export type { ProductEvent, PurchaseEvent, AnalyticsEvent }