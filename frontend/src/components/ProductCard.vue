<script setup>
import { RouterLink } from 'vue-router';
import { SERVER } from '../config';

const props = defineProps({
  id: Number,
  image: String,
  name: String,
  details: String,
  price: Number
});
</script>

<template>
  <div class="card bg-base-200 shadow-xl">
    <figure class="h-1/2">
      <img
        :src="`${SERVER}/img/${image}`"
        :alt="`${name} resmi`"
        class="h-full w-full object-cover"
      />
    </figure>
    <div class="card-body">
      <h2 class="card-title">{{ name }}</h2>
      <h3></h3>
      <p>{{ details }}</p>
      <div class="card-actions justify-end">
        <RouterLink :to="{ name: 'product', params: { id } }" class="btn btn-primary mt-7"
          >Teklif Ver</RouterLink
        >
      </div>
    </div>
  </div>
</template>
