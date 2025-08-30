// Service Worker para cache de recursos estáticos
const CACHE_NAME = 'majestad-v4';
const STATIC_CACHE = 'majestad-static-v4';
const DYNAMIC_CACHE = 'majestad-dynamic-v4';

// Recursos para cache imediato
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/12.png',
  '/sandalia-hero.webp',
  '/DSC03016.webp',
  '/26.png',
  '/1.webp',
  '/DSC02989.webp',
  '/DSC03084.webp',
  '/DSC03095.webp',
  '/DSC03116.webp'
];

// Recursos para cache dinâmico
const CACHE_STRATEGIES = {
  images: {
    extensions: ['.webp', '.png', '.jpg', '.jpeg', '.svg'],
    strategy: 'cache-first',
    maxAge: 365 * 24 * 60 * 60 * 1000, // 1 ano
    maxEntries: 150
  },
  assets: {
    extensions: ['.js', '.css', '.woff2', '.woff'],
    strategy: 'cache-first',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 dias
    maxEntries: 50
  },
  api: {
    patterns: ['/api/', 'yampi.com'],
    strategy: 'network-first',
    maxAge: 5 * 60 * 1000, // 5 minutos
    maxEntries: 20
  }
};

// Instalação do Service Worker
self.addEventListener('install', (event) => {
  console.log('[SW] Installing...');
  
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        console.log('[SW] Caching static assets');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => {
        console.log('[SW] Static assets cached successfully');
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('[SW] Failed to cache static assets:', error);
      })
  );
});

// Ativação do Service Worker
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating...');
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
              console.log('[SW] Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('[SW] Activated successfully');
        return self.clients.claim();
      })
  );
});

// Interceptação de requisições
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Ignorar requisições não-GET
  if (request.method !== 'GET') {
    return;
  }
  
  // Ignorar requisições de extensões do browser
  if (url.protocol === 'chrome-extension:' || url.protocol === 'moz-extension:') {
    return;
  }
  
  event.respondWith(handleRequest(request));
});

// Função principal para lidar com requisições
async function handleRequest(request) {
  const url = new URL(request.url);
  const extension = getFileExtension(url.pathname);
  
  try {
    // Estratégia para imagens
    if (CACHE_STRATEGIES.images.extensions.includes(extension)) {
      return await cacheFirst(request, DYNAMIC_CACHE);
    }
    
    // Estratégia para assets (JS, CSS, fonts)
    if (CACHE_STRATEGIES.assets.extensions.includes(extension)) {
      return await cacheFirst(request, DYNAMIC_CACHE);
    }
    
    // Estratégia para APIs
    if (CACHE_STRATEGIES.api.patterns.some(pattern => url.href.includes(pattern))) {
      return await networkFirst(request, DYNAMIC_CACHE);
    }
    
    // Estratégia para HTML (páginas)
    if (request.headers.get('accept')?.includes('text/html')) {
      return await networkFirst(request, DYNAMIC_CACHE);
    }
    
    // Fallback: tentar rede primeiro
    return await networkFirst(request, DYNAMIC_CACHE);
    
  } catch (error) {
    console.error('[SW] Error handling request:', error);
    return fetch(request);
  }
}

// Estratégia Cache First
async function cacheFirst(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cachedResponse = await cache.match(request);
  
  if (cachedResponse) {
    return cachedResponse;
  }
  
  // Não está em cache, buscar da rede
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      await updateCache(cache, request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    console.error('[SW] Network request failed:', error);
    throw error;
  }
}

// Estratégia Network First
async function networkFirst(request, cacheName) {
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(cacheName);
      await updateCache(cache, request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    console.log('[SW] Network failed, trying cache');
    const cache = await caches.open(cacheName);
    const cachedResponse = await cache.match(request);
    
    if (cachedResponse) {
      return cachedResponse;
    }
    
    throw error;
  }
}

// Atualizar cache
async function updateCache(cache, request, response) {
  await cache.put(request, response);
  await cleanupCache(cache);
}

// Limpeza de cache
async function cleanupCache(cache) {
  const keys = await cache.keys();
  const maxEntries = 100;
  
  if (keys.length > maxEntries) {
    const entriesToDelete = keys.slice(0, keys.length - maxEntries);
    await Promise.all(entriesToDelete.map(key => cache.delete(key)));
  }
}

// Utilitários
function getFileExtension(pathname) {
  const lastDot = pathname.lastIndexOf('.');
  return lastDot !== -1 ? pathname.slice(lastDot) : '';
}

// Mensagens do cliente
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});