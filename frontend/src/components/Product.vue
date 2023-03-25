<script setup>
defineProps({
  image: String,
  name: String,
  details: String,
  price: Number,
})

console.log('render edildi')
</script>

<template>
  <div class="card bg-base-200 shadow-xl">
    <figure><img src="/prod1.webp" :alt="`${name} resmi`" /></figure>
    <div class="card-body">
      <h2 class="card-title">{{ name }}</h2>  
      <p>{{ details }}</p>
      <div class="card-actions justify-end">
        <button class="btn btn-primary">{{ price.toLocaleString('tr-TR') }} ₺</button>
      </div>
    </div>
  </div>
</template>