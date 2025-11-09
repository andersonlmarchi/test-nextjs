<template>
  <div class="h-full w-full  bg-white-dark flex flex-col">
    <div class="flex-1 p-8 overflow-auto">
      <h1 class="text-4xl font-extrabold text-primary mb-10">Dashboard da Maria</h1>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div class="p-8 rounded-xl shadow bg-white border border-gray-light">
          <p class="text-5xl font-bold text-primary mt-4">Número de Contratos: {{ totalContracts }}</p>
        </div>

        <div class="p-8 rounded-xl shadow bg-white border border-gray-light">
          <p class="text-5xl font-bold text-secondary mt-4">Valor Total dos Contratos: R$ {{ new Intl.NumberFormat('pt-BR', { style: 'decimal', minimumFractionDigits: 2 }).format(totalValue) }}</p>
        </div>
        
        <div class="p-8 rounded-xl shadow bg-white border border-gray-light">
          <p class="text-5xl font-bold text-primary mt-4">Valor Total em Aberto: R$ {{ new Intl.NumberFormat('pt-BR', { style: 'decimal', minimumFractionDigits: 2 }).format(totalOpenValue) }}</p>
        </div>
        
        <div class="p-8 rounded-xl shadow bg-white border border-gray-light">
          <p class="text-5xl font-bold text-primary mt-4">Mês com maior valor em aberto: {{ monthMostOpen }}</p>
        </div>
        
        <div class="p-8 rounded-xl shadow bg-white border border-gray-light">
          <p class="text-5xl font-bold text-primary mt-4">Valor Total em Aberto no mês: R$ {{ new Intl.NumberFormat('pt-BR', { style: 'decimal', minimumFractionDigits: 2 }).format(monthMostOpenValue) }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

const totalContracts = ref(0);
const totalValue = ref(0);
const totalOpenValue = ref(0);
const monthMostOpen = ref('N/A');
const monthMostOpenValue = ref(0);

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";
const CONTRACT_DATA_URL = `${API_BASE_URL}/contracts/data/list`;

onMounted(async () => {
  try {
    const res = await fetch(CONTRACT_DATA_URL);
    const data = await res.json();

    totalContracts.value = data.totalContracts;
    totalValue.value = data.totalValue;
    totalOpenValue.value = data.totalOpenValue;
    monthMostOpen.value = data.monthMostOpen;
    monthMostOpenValue.value = data.monthMostOpenValue;
  } catch {
    alert("Erro ao carregar contratos.");
  }
});
</script>
