<script setup>
import { reactive } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useVuelidate } from '@vuelidate/core';
import { required, minLength } from '@vuelidate/validators';
import { SERVER } from '../config';
import store from '../store';

const router = useRouter();
const route = useRoute();
const formData = reactive({
  username: '',
  password: ''
});
const rules = {
  username: { required },
  password: { required, minLength: minLength(6) }
};
const v$ = useVuelidate(rules, formData);

async function validateForm() {
  const result = await v$.value.$validate();
  if (result) handleSubmit();
}

async function handleSubmit() {
  const logIn = await fetch(`${SERVER}/auth/login`, {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: formData.username, password: formData.password })
  });
  if (logIn.ok) {
    const res = await logIn.json();
    store.userId = res.result.id;
    store.username = res.result.username;
    router.push(route.query?.redirect ?? { name: 'index' });
  } else store.toast('Kullanıcı adı veya şifre hatalı', 'error');
}
</script>

<template>
  <div class="card w-[24rem] bg-base-200 mx-auto mt-32">
    <div class="card-body items-center">
      <h2 class="card-title">Giriş Yap</h2>
      <form @submit.prevent="handleSubmit" class="form-control mt-3">
        <label class="label" for="username">Kullanıcı Adı</label>
        <input
          v-model="formData.username"
          class="input input-bordered input-primary w-full my-3"
          type="text"
          name="username"
          id="username"
        />
        <label v-if="v$.username.$error" class="label">
          <span class="label-text-alt text-red-600">Lütfen geçerli bir kullanıcı adı girin</span>
        </label>

        <label class="label" for="password">Şifre</label>
        <input
          v-model="formData.password"
          class="input input-bordered input-primary w-full max-w-xs my-3"
          type="password"
          name="password"
          id="password"
        />
        <label v-if="v$.password.$error" class="label">
          <span class="label-text-alt text-red-600">Lütfen geçerli bir şifre girin</span>
        </label>

        <div class="card-actions justify-center mt-7">
          <button
            type="submit"
            @click.prevent="validateForm"
            class="btn btn-primary mr-2"
          >
            Giriş Yap
          </button>
          <RouterLink :to="{ name: 'register' }" class="btn btn-outline">Kayıt Ol</RouterLink>
        </div>
      </form>
    </div>
  </div>
</template>
