<script setup>
import { RouterLink } from 'vue-router'
import store from '../store';
</script>

<template>
  <nav class="navbar px-20 border-b-2 border-base-300">
    <div class="flex-1">
      <RouterLink :to="{ name: 'index' }" class="btn btn-ghost no-animation h-20 normal-case text-xl">
        <img src="/icon.png" alt="logo" class="h-full">
        <h2>uphammer</h2>
      </RouterLink>
    </div>
    <div class="flex-none">
      <ul class="menu menu-horizontal px-1">
        <template v-if="!store.isLoggedIn">
          <li>
            <RouterLink :to="{ name: 'register' }">Kayıt Ol</RouterLink>
          </li>
          <li>
            <RouterLink :to="{ name: 'login' }">Giriş Yap</RouterLink>
          </li>
        </template>
        <template v-else>
          <li>
            <RouterLink :to="{ name: 'products' }">Ürünler</RouterLink>
          </li>
          <li>
            <RouterLink :to="{ name: 'logout' }">Çıkış Yap</RouterLink>
          </li>
        </template>
      </ul>
    </div>
  </nav>
</template>

<style scoped lang="postcss">
ul li {
  @apply mx-2
}
</style>