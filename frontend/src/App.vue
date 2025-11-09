<template>
  <div class="h-screen w-screen flex flex-col overflow-hidden bg-white text-gray-darkest font-sans">
    <Navbar />
    <main class="flex-1 overflow-auto">
      <RouterView />
    </main>
    <div class="mt-auto">
      <footer class="bg-primary-dark text-white text-center py-6 text-xl tracking-wide">
      <hr class="border-gray-300" />
      <p>GCCM - Gestão de Contratos de Crediário da Maria © 2025</p>
      </footer>
    </div>
  </div>
</template>

<script setup lang="ts">
import Navbar from "./components/Navbar.vue";
</script>
