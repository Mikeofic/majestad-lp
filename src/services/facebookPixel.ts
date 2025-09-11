// Facebook Pixel Service - Gerencia eventos personalizados do Meta Pixel

// Tipos para eventos do Facebook Pixel
interface PixelEventData {
  [key: string]: any
}

interface ProductData {
  content_ids: string[]
  content_name?: string
  content_category?: string
  content_type?: string
  value?: number
  currency?: string
  num_items?: number
}

// Declaração global para fbq
declare global {
  interface Window {
    fbq: (...args: any[]) => void
  }
}

class FacebookPixelService {
  private isInitialized = false

  constructor() {
    this.checkInitialization()
  }

  private checkInitialization() {
    if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
      this.isInitialized = true
    }
  }

  // Verifica se o pixel está disponível
  private isPixelAvailable(): boolean {
    return typeof window !== 'undefined' && typeof window.fbq === 'function'
  }

  // Envia evento personalizado
  private trackEvent(eventName: string, eventData?: PixelEventData) {
    if (!this.isPixelAvailable()) {
      console.log('FB Pixel não disponível:', eventName, eventData)
      return
    }

    try {
      if (eventData) {
        window.fbq('track', eventName, eventData)
      } else {
        window.fbq('track', eventName)
      }
      console.log('FB Pixel evento enviado:', eventName, eventData)
    } catch (error) {
      console.error('Erro ao enviar evento FB Pixel:', error)
    }
  }

  // Eventos padrão do Facebook
  trackPageView() {
    this.trackEvent('PageView')
  }

  trackViewContent(productData?: ProductData) {
    this.trackEvent('ViewContent', productData)
  }

  trackAddToCart(productData: ProductData) {
    this.trackEvent('AddToCart', productData)
  }

  trackInitiateCheckout(productData?: ProductData) {
    this.trackEvent('InitiateCheckout', productData)
  }

  trackPurchase(purchaseData: {
    value: number
    currency: string
    content_ids: string[]
    content_type?: string
    num_items?: number
  }) {
    this.trackEvent('Purchase', purchaseData)
  }

  trackLead(leadData?: {
    content_name?: string
    content_category?: string
    value?: number
    currency?: string
  }) {
    this.trackEvent('Lead', leadData)
  }

  // Eventos personalizados para botões e interações
  trackButtonClick(buttonName: string, section: string, additionalData?: PixelEventData) {
    const eventData = {
      button_name: buttonName,
      section: section,
      ...additionalData
    }
    this.trackEvent('ButtonClick', eventData)
  }

  trackCTAClick(ctaName: string, location: string, value?: number) {
    const eventData: PixelEventData = {
      cta_name: ctaName,
      location: location
    }
    if (value) {
      eventData.value = value
      eventData.currency = 'BRL'
    }
    this.trackEvent('CTAClick', eventData)
  }

  trackColorSelection(color: string, productId?: string) {
    this.trackEvent('ColorSelection', {
      color: color,
      product_id: productId
    })
  }

  trackSizeSelection(size: string, productId?: string) {
    this.trackEvent('SizeSelection', {
      size: size,
      product_id: productId
    })
  }

  trackFormStart(formName: string) {
    this.trackEvent('FormStart', {
      form_name: formName
    })
  }

  trackFormComplete(formName: string, value?: number) {
    const eventData: PixelEventData = {
      form_name: formName
    }
    if (value) {
      eventData.value = value
      eventData.currency = 'BRL'
    }
    this.trackEvent('FormComplete', eventData)
  }

  trackVideoPlay(videoName: string, duration?: number) {
    this.trackEvent('VideoPlay', {
      video_name: videoName,
      duration: duration
    })
  }

  trackScrollDepth(percentage: number) {
    this.trackEvent('ScrollDepth', {
      percentage: percentage
    })
  }

  trackTimeOnPage(seconds: number) {
    this.trackEvent('TimeOnPage', {
      seconds: seconds
    })
  }

  trackExitIntent() {
    this.trackEvent('ExitIntent')
  }

  trackPopupView(popupName: string) {
    this.trackEvent('PopupView', {
      popup_name: popupName
    })
  }

  trackPopupClose(popupName: string) {
    this.trackEvent('PopupClose', {
      popup_name: popupName
    })
  }

  // Evento personalizado genérico
  trackCustomEvent(eventName: string, eventData?: PixelEventData) {
    this.trackEvent(eventName, eventData)
  }

  // Método para definir parâmetros de usuário
  setUserData(userData: {
    email?: string
    phone?: string
    firstName?: string
    lastName?: string
    city?: string
    state?: string
    country?: string
    zipCode?: string
  }) {
    if (!this.isPixelAvailable()) {
      console.log('FB Pixel não disponível para setUserData')
      return
    }

    try {
      // Hash dos dados sensíveis é feito automaticamente pelo pixel
      window.fbq('setUserData', userData)
      console.log('FB Pixel userData definido')
    } catch (error) {
      console.error('Erro ao definir userData FB Pixel:', error)
    }
  }
}

// Instância singleton
export const facebookPixel = new FacebookPixelService()

// Tipos exportados
export type { PixelEventData, ProductData }