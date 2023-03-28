<script setup>
import { onBeforeMount, ref } from 'vue';
import ProductCard from '../components/ProductCard.vue';
import { SERVER } from '../config';

const data = ref([]);

onBeforeMount(async () => {
  const req = await fetch(`${SERVER}/product`, {
    credentials: 'include'
  });
  data.value = await req.json();
});
</script>

<template>
  <div class="grid justify-center grid-cols-1 gap-7 w-3/4 mt-20 m-auto sm:grid-cols-2 lg:max-w-3xl xl:grid-cols-3 xl:w-3/4 xl:max-w-6xl">
    <ProductCard v-for="prod in data" v-bind="prod" />
  </div>
</template>
