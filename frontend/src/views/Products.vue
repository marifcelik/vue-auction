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
  console.log(data.value);
});
</script>

<template>
  <div
    class="grid justify-center grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-7 w-9/12 mt-20 m-auto"
  >
    <ProductCard v-for="prod in data" v-bind="prod" />
  </div>
</template>
