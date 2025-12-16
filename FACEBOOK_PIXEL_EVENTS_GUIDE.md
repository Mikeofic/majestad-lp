# Guia de Eventos Personalizados do Facebook Pixel

Este guia explica como implementar e usar eventos personalizados do Facebook Pixel em botões e elementos clicáveis do seu site.

## 📋 Índice

1. [Configuração Inicial](#configuração-inicial)
2. [Serviço Facebook Pixel](#serviço-facebook-pixel)
3. [Eventos Padrão](#eventos-padrão)
4. [Eventos Personalizados](#eventos-personalizados)
5. [Implementação em Componentes](#implementação-em-componentes)
6. [Exemplos Práticos](#exemplos-práticos)
7. [Monitoramento e Debug](#monitoramento-e-debug)
8. [Boas Práticas](#boas-práticas)

## 🚀 Configuração Inicial

### 1. Verificar o Facebook Pixel

O Facebook Pixel já está configurado no `index.html`:

```html
<!-- Meta Pixel Code -->
<script>
  // Only load Facebook Pixel in production
  if (location.hostname !== 'localhost' && location.hostname !== '127.0.0.1') {
    !function(f,b,e,v,n,t,s)
    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)}(window, document,'script',
    'https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', '566357459745780');
    fbq('track', 'PageView');
  } else {
    // Mock fbq for development
    window.fbq = function() { console.log('FB Pixel (dev):', arguments); };
  }
</script>
```

### 2. Importar o Serviço

Em qualquer componente Vue, importe o serviço:

```typescript
import { facebookPixel } from '../services/facebookPixel'
```

## 🛠️ Serviço Facebook Pixel

O serviço `facebookPixel.ts` fornece métodos para todos os tipos de eventos:

### Estrutura do Serviço

```typescript
class FacebookPixelService {
  // Eventos padrão do Facebook
  trackPageView()
  trackViewContent(productData)
  trackAddToCart(productData)
  trackInitiateCheckout(productData)
  trackPurchase(purchaseData)
  trackLead(leadData)
  
  // Eventos personalizados para interações
  trackButtonClick(buttonName, section, additionalData)
  trackCTAClick(ctaName, location, value)
  trackColorSelection(color, productId)
  trackSizeSelection(size, productId)
  trackFormStart(formName)
  trackFormComplete(formName, value)
  trackVideoPlay(videoName, duration)
  trackScrollDepth(percentage)
  trackTimeOnPage(seconds)
  trackExitIntent()
  trackPopupView(popupName)
  trackPopupClose(popupName)
  
  // Evento personalizado genérico
  trackCustomEvent(eventName, eventData)
}
```

## 📊 Eventos Padrão

### 1. Visualização de Produto

```typescript
const handleProductView = (product) => {
  facebookPixel.trackViewContent({
    content_ids: [product.id.toString()],
    content_name: product.name,
    content_category: product.category,
    content_type: 'product',
    value: product.price,
    currency: 'BRL'
  })
}
```

### 2. Adicionar ao Carrinho

```typescript
const handleAddToCart = (product) => {
  facebookPixel.trackAddToCart({
    content_ids: [product.id.toString()],
    content_name: product.name,
    content_category: product.category,
    content_type: 'product',
    value: product.price,
    currency: 'BRL',
    num_items: 1
  })
}
```

### 3. Iniciar Checkout

```typescript
const handleCheckout = (cartItems) => {
  facebookPixel.trackInitiateCheckout({
    content_ids: cartItems.map(item => item.id),
    content_type: 'product',
    value: cartItems.reduce((total, item) => total + item.price, 0),
    currency: 'BRL',
    num_items: cartItems.length
  })
}
```

### 4. Compra Finalizada

```typescript
const handlePurchase = (orderData) => {
  facebookPixel.trackPurchase({
    value: orderData.total,
    currency: 'BRL',
    content_ids: orderData.items.map(item => item.id),
    content_type: 'product',
    num_items: orderData.items.length
  })
}
```

## 🎯 Eventos Personalizados

### 1. Cliques em Botões

```typescript
// Botão CTA principal
const handleCTAClick = () => {
  facebookPixel.trackCTAClick('Comprar Agora', 'hero_section', 494)
}

// Botão genérico
const handleButtonClick = () => {
  facebookPixel.trackButtonClick('Ver Mais Produtos', 'product_section')
}
```

### 2. Seleções de Produto

```typescript
// Seleção de cor
const handleColorSelect = (color, productId) => {
  facebookPixel.trackColorSelection(color, productId)
}

// Seleção de tamanho
const handleSizeSelect = (size, productId) => {
  facebookPixel.trackSizeSelection(size, productId)
}
```

### 3. Interações com Formulário

```typescript
// Início do preenchimento
const handleFormStart = () => {
  facebookPixel.trackFormStart('checkout_form')
}

// Formulário completo
const handleFormComplete = () => {
  facebookPixel.trackFormComplete('checkout_form', 494)
}
```

### 4. Eventos de Engajamento

```typescript
// Reprodução de vídeo
const handleVideoPlay = () => {
  facebookPixel.trackVideoPlay('product_demo', 120)
}

// Scroll da página
const handleScroll = (percentage) => {
  facebookPixel.trackScrollDepth(percentage)
}

// Tempo na página
const handleTimeOnPage = (seconds) => {
  facebookPixel.trackTimeOnPage(seconds)
}
```

## 💻 Implementação em Componentes

### Exemplo 1: Botão Hero

```vue
<script setup lang="ts">
import { facebookPixel } from '../services/facebookPixel'

const handleExploreProducts = () => {
  facebookPixel.trackCTAClick('Explorar Produtos', 'hero_section')
  // Navegação ou ação
}
</script>

<template>
  <button @click="handleExploreProducts" class="btn-primary">
    Explorar Produtos
  </button>
</template>
```

### Exemplo 2: Grid de Produtos

```vue
<script setup lang="ts">
import { facebookPixel } from '../services/facebookPixel'

const handleProductClick = (product) => {
  facebookPixel.trackViewContent({
    content_ids: [product.id.toString()],
    content_name: product.name,
    content_category: product.category,
    value: product.price,
    currency: 'BRL'
  })
}

const handleAddToCart = (product) => {
  facebookPixel.trackAddToCart({
    content_ids: [product.id.toString()],
    content_name: product.name,
    value: product.price,
    currency: 'BRL'
  })
}
</script>

<template>
  <div class="product-card" @click="handleProductClick(product)">
    <img :src="product.image" :alt="product.name">
    <h3>{{ product.name }}</h3>
    <p>R$ {{ product.price }}</p>
    <button @click.stop="handleAddToCart(product)">
      Adicionar ao Carrinho
    </button>
  </div>
</template>
```

### Exemplo 3: Página de Agradecimento

```vue
<script setup lang="ts">
import { onMounted } from 'vue'
import { facebookPixel } from '../services/facebookPixel'

const props = defineProps<{
  orderId: string
  orderValue: number
  items: Array<any>
}>()

onMounted(() => {
  // Track da conversão
  facebookPixel.trackPurchase({
    value: props.orderValue,
    currency: 'BRL',
    content_ids: props.items.map(item => item.id),
    content_type: 'product'
  })
  
  facebookPixel.trackLead({
    content_name: 'Compra Finalizada',
    value: props.orderValue,
    currency: 'BRL'
  })
})
</script>
```

## 🔍 Monitoramento e Debug

### 1. Console do Navegador

Em desenvolvimento, os eventos aparecem no console:

```
FB Pixel (dev): ['track', 'ButtonClick', {button_name: 'Explorar Produtos', section: 'hero_section'}]
```

### 2. Facebook Pixel Helper

Instale a extensão "Facebook Pixel Helper" no Chrome para monitorar eventos em tempo real.

### 3. Events Manager

Acesse o Facebook Events Manager para ver todos os eventos sendo recebidos:
- https://business.facebook.com/events_manager

### 4. Test Events

Use a ferramenta Test Events do Facebook para debug:
- https://developers.facebook.com/tools/debug/

## ✅ Boas Práticas

### 1. Nomenclatura Consistente

```typescript
// ✅ Bom
facebookPixel.trackCTAClick('Comprar Agora', 'hero_section')
facebookPixel.trackCTAClick('Adicionar Carrinho', 'product_grid')

// ❌ Evitar
facebookPixel.trackCTAClick('comprar-agora', 'Hero')
facebookPixel.trackCTAClick('Add Cart', 'products')
```

### 2. Dados Estruturados

```typescript
// ✅ Sempre inclua dados relevantes
facebookPixel.trackAddToCart({
  content_ids: ['product_123'],
  content_name: 'Salto Majestad Preto',
  content_category: 'calçados',
  value: 449,
  currency: 'BRL'
})
```

### 3. Tratamento de Erros

O serviço já trata erros automaticamente, mas você pode adicionar logs:

```typescript
const handleAction = () => {
  try {
    facebookPixel.trackCTAClick('Ação Importante', 'section')
    // Sua lógica aqui
  } catch (error) {
    console.error('Erro na ação:', error)
  }
}
```

### 4. Performance

- Os eventos são assíncronos e não bloqueiam a UI
- Em desenvolvimento, apenas logs são exibidos
- Em produção, eventos são enviados para o Facebook

## 📈 Eventos Recomendados para E-commerce

### Funil de Conversão

1. **PageView** - Visualização da página
2. **ViewContent** - Visualização de produto
3. **AddToCart** - Adicionar ao carrinho
4. **InitiateCheckout** - Iniciar checkout
5. **Purchase** - Compra finalizada
6. **Lead** - Conversão/Lead gerado

### Eventos de Engajamento

- **ButtonClick** - Cliques em botões importantes
- **CTAClick** - Cliques em CTAs
- **ScrollDepth** - Profundidade do scroll
- **TimeOnPage** - Tempo na página
- **VideoPlay** - Reprodução de vídeos
- **FormStart/Complete** - Interações com formulários

## 🎯 Conclusão

Com este sistema, você pode:

✅ **Rastrear todas as interações** importantes do usuário
✅ **Otimizar campanhas** do Facebook Ads com dados precisos
✅ **Criar audiências personalizadas** baseadas em comportamentos
✅ **Medir ROI** de forma mais precisa
✅ **Implementar facilmente** novos eventos conforme necessário

O Facebook Pixel agora está totalmente integrado ao seu site e pronto para capturar eventos personalizados de qualquer botão ou elemento clicável!