<script setup>
import { RouterView } from 'vue-router';
import Navbar from './components/Navbar.vue';
import Footer from './components/Footer.vue';
import Toast from './components/Toast.vue';
</script>

<template>
  <Navbar />
  <Toast />
  <Suspense>
    <RouterView />
  </Suspense>
  <Teleport to="body">
    <Footer />
  </Teleport>
</template>
