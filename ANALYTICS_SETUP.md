# Configuração de Analytics - GTM e GA4

## Visão Geral

Este projeto foi configurado com Google Tag Manager (GTM) e Google Analytics 4 (GA4) para tracking completo de eventos e conversões.

## Configuração do Google Tag Manager

### Tags Configuradas
1. **Google Analytics 4** - Tag principal para envio de dados
2. **Enhanced Ecommerce** - Para eventos de e-commerce
3. **Custom Events** - Para eventos específicos do negócio

## Eventos Implementados

### 1. Eventos de Produto
- **Seleção de Cor**: `trackColorSelection(pairNumber, color, colorId)`
- **Seleção de Tamanho**: `trackSizeSelection(pairNumber, size, colorId)`

### 2. Eventos de Conversão
- **Adicionar ao Carrinho**: `trackAddToCart(items, value, currency)`
- **Compra**: `trackPurchase(transactionId, items, value, currency)`

### 3. Eventos de Engajamento
- **Profundidade de Scroll**: `trackScrollDepth(percentage)`
  - Marcos: 25%, 50%, 75%, 100%
- **Tempo na Página**: `trackTimeOnPage(seconds)`
  - Registrado a cada 30 segundos

### 4. Eventos de Interação
- **Mudança de Modo**: `trackModeChange(fromMode, toMode)`
  - Modos: 'single' e 'combo'
- **Clique em CTA**: `trackCTAClick(ctaName, location)`
- **Interação com FAQ**: `trackFAQInteraction(question, action)`

### 5. Eventos de Galeria
- **Visualização de Imagem**: `trackGalleryView(imageIndex, imageUrl)`
- **Zoom de Imagem**: `trackImageZoom(imageIndex)`

### 6. Eventos de Formulário
- **Envio de Formulário**: `trackFormSubmission(formName, success)`
- **Erro de Validação**: `trackFormError(formName, fieldName, errorType)`

### 7. Eventos de Erro
- **Erro de Sistema**: `trackError(errorType, errorMessage, location)`

## Estrutura do Serviço de Analytics

### Arquivo: `src/services/analytics.ts`

O serviço centraliza todo o gerenciamento de eventos e inclui:

- **Tipos TypeScript** para garantir consistência dos dados
- **Classe AnalyticsService** com métodos para cada tipo de evento
- **Integração com GTM** através do dataLayer
- **Propriedades de usuário** e dimensões customizadas

### Exemplo de Uso

```typescript
import { analytics } from '@/services/analytics'

// Tracking de seleção de cor
analytics.trackColorSelection(1, 'Preto', 'color-black')

// Tracking de adicionar ao carrinho
analytics.trackAddToCart([
  {
    item_id: 'sandalia-001',
    item_name: 'Sandália Majestad',
    item_category: 'Calçados',
    quantity: 2,
    price: 89.90
  }
], 179.80, 'BRL')
```

## Configuração no GTM Dashboard

### Variáveis Necessárias
1. **GA4 Configuration Tag** - ID de medição do GA4
2. **DataLayer Variables** - Para capturar dados dos eventos
3. **Custom Dimensions** - Para propriedades específicas do negócio

### Triggers Configurados
1. **Page View** - Carregamento de páginas
2. **Custom Events** - Eventos específicos enviados via dataLayer
3. **Scroll Tracking** - Profundidade de scroll
4. **Timer** - Tempo na página

### Tags Recomendadas
1. **GA4 Event Tag** - Para todos os eventos customizados
2. **Enhanced Ecommerce Tag** - Para eventos de e-commerce
3. **Conversion Tracking** - Para metas e conversões

## Métricas Importantes

### E-commerce
- Taxa de conversão por modo (single vs combo)
- Valor médio do pedido
- Produtos mais selecionados por cor/tamanho
- Abandono de carrinho

### Engajamento
- Tempo médio na página
- Profundidade de scroll
- Interações com FAQ
- Cliques em CTAs

### Comportamento
- Preferências de cor/tamanho
- Padrões de navegação
- Pontos de saída

## Manutenção

### Adicionando Novos Eventos
1. Definir o tipo do evento em `analytics.ts`
2. Criar método na classe `AnalyticsService`
3. Implementar a chamada no componente
4. Configurar tag correspondente no GTM

### Debugging
- Use o **GTM Preview Mode** para testar eventos
- Verifique o **GA4 DebugView** para validar dados
- Console do navegador mostra erros de dataLayer

## Compliance e Privacidade

- Todos os eventos respeitam as diretrizes de privacidade
- Nenhum dado pessoal identificável é coletado
- Configuração compatível com LGPD/GDPR
- Dados anonimizados por padrão

---

**Última atualização**: Janeiro 2025
**Versão**: 1.0
**Responsável**: Equipe de Desenvolvimento