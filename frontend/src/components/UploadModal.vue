<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
    <div class="bg-white p-10 rounded-lg shadow-xl w-1/2">
      <h2 class="text-2xl font-bold mb-6">Upload JSON</h2>
      <input type="file" @change="handleFile" accept="application/json" />

      <div class="mt-8 flex justify-end gap-4">
        <button
          @click="$emit('close')"
          class="px-6 py-3 bg-gray-300 text-lg rounded"
        >
          Cancelar
        </button>
        <button
          @click="sendFile"
          class="px-6 py-3 bg-primary text-white text-lg rounded hover:bg-primary-dark"
        >
          Enviar
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";
const UPLOAD_URL = `${API_BASE_URL}/contracts/upload`;
const file = ref<File | null>(null);

function handleFile(event: Event) {
  const target = event.target as HTMLInputElement;
  file.value = target.files?.[0] || null;
}

async function sendFile() {
  if (!file.value) return;

  const formData = new FormData();
  formData.append("file", file.value);

  const res = await fetch(UPLOAD_URL, {
    method: "POST",
    body: formData,
  });

  if (res.ok) {
    alert("Arquivo enviado e processado com sucesso!");
    setTimeout(() => {
      window.location.href = "/";
    }, 0);
  } else {
    alert("Erro no upload");
  }
}
</script>
