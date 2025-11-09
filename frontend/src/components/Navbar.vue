<template>
    <nav class="bg-primary text-white shadow-lg">
        <div class="max-w-full flex justify-between items-center px-16 py-8"><h1>Gestão de Contratos de Crediário da Maria</h1></div>
        <hr class="border-gray-300" />
        <div class="text-4xl font-extrabold tracking-wide">
            <div class="flex gap-16 text-2xl font-semibold">
            <RouterLink to="/" class="hover:text-secondary transition">Totalizadores</RouterLink> | 
            <RouterLink to="/contracts" class="hover:text-secondary transition">Contratos</RouterLink> | 
            <RouterLink to="/about" class="hover:text-secondary transition">Sobre o GCCM</RouterLink>
            </div>
        </div>
        <hr class="border-gray-300" />
    </nav>
</template>

<script setup lang="ts">
</script>
