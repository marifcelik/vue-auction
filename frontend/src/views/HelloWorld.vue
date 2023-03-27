<script setup>
import store from '../store';

async function healthcheck() {
  const data = await fetch('http://localhost:5048/auth/check', {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' }
  });
  if (data.ok) {
    const jj = await data.json();
    console.log(jj);
  }
}
</script>

<template>
  <button @click="healthcheck">health check</button>

  <div class="card">
    <button type="button" class="btn" @click="store.increment()">
      count is {{ store.count }}
    </button>
    <button type="button" class="btn" @click="store.decrement()">çıkar</button>
  </div>
</template>

<style></style>
