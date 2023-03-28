<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <h1 class="text-7xl mt-40 ml-20">Hoş Geldiniz!</h1>
  <br />
  <p class="text-4xl my-5 ml-20">Açık artırma dünyasına adım atın.</p>
  <RouterLink :to="{ name: 'products' }" class="link link-info text-lg ml-20">Ürünlere göz at</RouterLink>
</template>
