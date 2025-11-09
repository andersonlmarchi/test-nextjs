<template>
  <div class="min-h-full w-full p-6">
    <h1 class="text-3xl font-bold mb-6">Contrato #{{ contract?.id }}</h1>

    <div v-if="contract">
      <p class="text-lg"><strong>Número:</strong> {{ contract.contractNumber }}</p>
      <p class="text-lg">
        <strong>Data:</strong>
        {{ new Intl.DateTimeFormat('pt-BR', { timeZone: 'America/Sao_Paulo' }).format(new Date(contract.contractDate)) }}
      </p>
      <p class="text-lg">
        <strong>Valor Total:</strong>
        R$ {{ new Intl.NumberFormat('pt-BR', { style: 'decimal', minimumFractionDigits: 2 }).format(contract.totalValue) }}
      </p>
    </div>

    <h2 class="text-2xl font-semibold mt-10 mb-4">Parcelas</h2>
    <table class="w-full border-collapse bg-white shadow rounded" border="1">
      <thead>
        <tr class="bg-gray-light text-left text-lg">
          <th class="p-4 border">#</th>
          <th class="p-4 border">Vencimento</th>
          <th class="p-4 border">Valor</th>
          <th class="p-4 border">Pago</th>
          <th class="p-4 border">Saldo Aberto</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="i in installments" :key="i.id" class="hover:bg-gray-light">
          <td class="p-4 border">{{ i.id }}</td>
          <td class="p-4 border">{{ new Intl.DateTimeFormat('pt-BR', { timeZone: 'America/Sao_Paulo' }).format(new Date(i.dueDate)) }}</td>
          <td class="p-4 border">R$ {{ new Intl.NumberFormat('pt-BR', { style: 'decimal', minimumFractionDigits: 2 }).format(i.dueAmount) }}</td>
          <td class="p-4 border">R$ {{ new Intl.NumberFormat('pt-BR', { style: 'decimal', minimumFractionDigits: 2 }).format(i.totalPaid) }}</td>
          <td class="p-4 border">R$ {{ new Intl.NumberFormat('pt-BR', { style: 'decimal', minimumFractionDigits: 2 }).format(i.openBalance) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const contract = ref<any>(null);
const installments = ref<any[]>([]);

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";
const CONTRACT_URL = `${API_BASE_URL}/contracts/${route.params.id}`;

async function loadContract() {
  const res = await fetch(CONTRACT_URL);
  contract.value = await res.json();

  installments.value = contract.value?.installments || [];
}

onMounted(loadContract);
</script>
