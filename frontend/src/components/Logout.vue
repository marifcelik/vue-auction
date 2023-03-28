<script setup>
import { useRouter } from 'vue-router';
import { SERVER } from '../config';
import store from '../store';

const router = useRouter();

const req = await fetch(`${SERVER}/auth/logout`, {
  method: 'POST',
  credentials: 'include',
  headers: { 'Content-Type': 'application/json' }
});
if (req.ok) {
  await req.json();
  store.userId = '';
  store.username = '';
  router.push({ name: 'index' });
}
</script>

<template></template>
