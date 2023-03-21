<script setup>
import store from '../store';

defineProps({
  msg: String,
});

async function healthcheck() {
  const data = await fetch('http://localhost:5048/auth/check', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include'
  })
  if (data.ok) {
    const jj = await data.json()
    console.log(jj)
  }

}
</script>

<template>
  <button @click="healthcheck">health check</button>
  <h1>{{ msg }}</h1>

  <div class="card">
    <button type="button" @click="store.increment()">count is {{ store.count }}</button>
    <button type="button" @click="store.decrement()">çıkar</button>
    <p>
      Edit
      <code>components/HelloWorld.vue</code> to test HMR
    </p>
  </div>

  <p>
    Check out
    <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank">create-vue</a>, the official Vue + Vite starter
  </p>
  <p>
    Install
    <a href="https://github.com/vuejs/language-tools" target="_blank">Volar</a>
    in your IDE for a better DX
  </p>
  <p class="read-the-docs">Click on the Vite and Vue logos to learn more</p>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
