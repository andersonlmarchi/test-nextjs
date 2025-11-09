<template>
  <div class="min-h-full w-full p-6">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-3xl font-bold">Contratos</h1>
      <button
        @click="showUpload = true"
        class="bg-primary text-white px-6 py-3 rounded hover:bg-primary-dark"
      >
        Upload JSON
      </button>
    </div>

    <table class="w-full border-collapse bg-white shadow rounded" border="1">
      <thead>
        <tr class="bg-gray-light text-left text-lg">
          <th class="p-4 border">ID</th>
          <th class="p-4 border">Número</th>
          <th class="p-4 border">Valor Total</th>
          <th class="p-4 border">Data</th>
          <th class="p-4 border">Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="c in contracts" :key="c.id" class="hover:bg-gray-light">
          <td class="p-4 border">{{ c.id }}</td>
          <td class="p-4 border">{{ c.contractNumber }}</td>
          <td class="p-4 border">R$ {{ new Intl.NumberFormat('pt-BR', { style: 'decimal', minimumFractionDigits: 2 }).format(c.totalValue) }}</td>
          <td class="p-4 border">{{ new Intl.DateTimeFormat('pt-BR', { timeZone: 'America/Sao_Paulo' }).format(new Date(c.contractDate)) }}</td>
          <td class="p-4 border">
            <RouterLink
              :to="`/contracts/${c.id}`"
              class="text-primary hover:underline"
            >
              Visualizar
            </RouterLink>
          </td>
        </tr>
      </tbody>
    </table>

    <UploadModal v-if="showUpload" @close="showUpload = false" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import UploadModal from "../components/UploadModal.vue";

const contracts = ref<any[]>([]);
const showUpload = ref(false);

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";
const CONTRACT_URL = `${API_BASE_URL}/contracts`;

async function loadContracts() {
  const res = await fetch(CONTRACT_URL);
  contracts.value = await res.json();
}

onMounted(loadContracts);
</script>
