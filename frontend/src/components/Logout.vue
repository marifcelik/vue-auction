<script setup>
import { useRouter } from 'vue-router'
import store from '../store';

const router = useRouter()

const req = await fetch('http://localhost:5048/auth/logout', {
  method: 'POST',
  credentials: 'include',
  headers: { 'Content-Type': 'application/json' }
});
if (req.ok) {
  await req.json();
  store.isLoggedIn = false
  router.push({ name: 'index' })
}
</script>

<template>
  
</template>
