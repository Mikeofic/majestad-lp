<script setup lang="ts">
import { ref } from 'vue'

// Props
interface Props {
  cartCount: number
}

defineProps<Props>()

// Emits
defineEmits<{
  toggleCart: []
}>()

// Estado local
const isMenuOpen = ref(false)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}
</script>

<template>
  <header class="bg-white shadow-sm border-b border-gray-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- Logo -->
        <div class="flex items-center">
          <h1 class="text-2xl font-bold text-primary-600 font-serif">
            Majestad
          </h1>
        </div>
        
        <!-- Navigation Desktop -->
        <nav class="hidden md:flex space-x-8">
          <a href="#" class="text-gray-700 hover:text-primary-600 font-medium transition-colors">
            Início
          </a>
          <a href="#" class="text-gray-700 hover:text-primary-600 font-medium transition-colors">
            Produtos
          </a>
          <a href="#" class="text-gray-700 hover:text-primary-600 font-medium transition-colors">
            Categorias
          </a>
          <a href="#" class="text-gray-700 hover:text-primary-600 font-medium transition-colors">
            Sobre
          </a>
          <a href="#" class="text-gray-700 hover:text-primary-600 font-medium transition-colors">
            Contato
          </a>
        </nav>
        
        <!-- Actions -->
        <div class="flex items-center space-x-4">
          <!-- Search -->
          <button class="text-gray-600 hover:text-primary-600 transition-colors">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </button>
          
          <!-- User Account -->
          <button class="text-gray-600 hover:text-primary-600 transition-colors">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
            </svg>
          </button>
          
          <!-- Cart -->
          <button 
            @click="$emit('toggleCart')"
            class="relative text-gray-600 hover:text-primary-600 transition-colors"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01"></path>
            </svg>
            <span 
              v-if="cartCount > 0"
              class="absolute -top-2 -right-2 bg-primary-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center"
            >
              {{ cartCount }}
            </span>
          </button>
          
          <!-- Mobile menu button -->
          <button 
            @click="toggleMenu"
            class="md:hidden text-gray-600 hover:text-primary-600 transition-colors"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
      </div>
      
      <!-- Mobile Navigation -->
      <div v-if="isMenuOpen" class="md:hidden border-t border-gray-200 py-4">
        <nav class="flex flex-col space-y-2">
          <a href="#" class="text-gray-700 hover:text-primary-600 font-medium py-2 transition-colors">
            Início
          </a>
          <a href="#" class="text-gray-700 hover:text-primary-600 font-medium py-2 transition-colors">
            Produtos
          </a>
          <a href="#" class="text-gray-700 hover:text-primary-600 font-medium py-2 transition-colors">
            Categorias
          </a>
          <a href="#" class="text-gray-700 hover:text-primary-600 font-medium py-2 transition-colors">
            Sobre
          </a>
          <a href="#" class="text-gray-700 hover:text-primary-600 font-medium py-2 transition-colors">
            Contato
          </a>
        </nav>
      </div>
    </div>
  </header>
</template>