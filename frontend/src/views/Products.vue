<script setup>
import { onBeforeMount } from 'vue'
import Product from '../components/Product.vue';

let data;

onBeforeMount(() => {
  async function dataFetch() {
    const req = await fetch('http://localhost:5048/products', {
      credentials: 'include'
    })
    data = await req.json()
    console.log(data)
  }

  dataFetch()
})
</script>

<template>
  <div class="grid grid-cols-4 gap-7 w-9/12 mt-20 m-auto">
    <Product v-for="prod in data" v-bind="prod" />
  </div>
</template>