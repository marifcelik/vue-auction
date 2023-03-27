<script setup>
import { reactive } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useVuelidate } from '@vuelidate/core';
import { required, minLength, sameAs } from '@vuelidate/validators';
import store from '../store';

const router = useRouter();
const route = useRoute();
const formData = reactive({
  name: '',
  surname: '',
  username: '',
  password: '',
  comfirmpassword: ''
});
const rules = {
  name: { required },
  surname: { required },
  username: { required },
  password: { required, minLength: minLength(6) },
  confirmpassword: { sameAs: sameAs('password') }
};
const v$ = useVuelidate(rules, formData);

async function handleSubmit() {
  const result = await v$.value.$validate();
  console.log(result);
  // TODO: catch errors
  if (result) {
    const logIn = await fetch('http://localhost:5048/auth/login', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: formData.username, password: formData.password })
    });
    if (logIn.ok) {
      const res = await logIn.json();
      store.isLoggedIn = res.msg === 'ok';
    } else store.isLoggedIn = false;
    router.push({ name: route.query?.redirect ?? 'index' });
  }
}
</script>

<template>
  <!-- TODO: edit register page -->
  <div class="card w-[24rem] bg-base-100 dark:bg-neutral text-neutral-content mx-auto my-32">
    <div class="card-body items-center !px-0">
      <h2 class="card-title">Giriş Yap</h2>
      <form @submit.prevent="handleSubmit">
        <label class="label" for="name">Ad</label>
        <input
          v-model="formData.name"
          class="input input-bordered input-primary w-full max-w-xs my-3"
          type="text"
          name="name"
          id="name"
        />
        <label v-if="v$.name.$error" class="label">
          <span class="label-text-alt text-red-600">Lütfen geçerli ad girin</span>
        </label><br />

        <label class="label" for="surname">Soyad</label>
        <input
          v-model="formData.surname"
          class="input input-bordered input-primary w-full max-w-xs my-3"
          type="text"
          name="surname"
          id="surname"
        />
        <label v-if="v$.surname.$error" class="label">
          <span class="label-text-alt text-red-600">Lütfen geçerli soyad girin</span>
        </label><br />

        <label for="username">Kullanıcı Adı</label>
        <input
          v-model="formData.username"
          class="input input-bordered input-primary w-full max-w-xs my-3"
          type="username"
          name="username"
          id="username"
        />
        <label v-if="v$.username.$error" class="label">
          <span class="label-text-alt text-red-600">Kullanıcı adı boşluk içeremez</span>
        </label>

        <label for="password">Şifre</label>
        <input
          v-model="formData.password"
          class="input input-bordered input-primary w-full max-w-xs my-3"
          type="password"
          name="password"
          id="password"
        />
        <label v-if="v$.password.$error" class="label">
          <span class="label-text-alt text-red-600">Lütfen en az 6 haneli bir şifre girin</span>
        </label>

        <label for="confirmpassword">Şifre Tekrar</label>
        <input
          v-model="formData.confirmpassword"
          class="input input-bordered input-primary w-full max-w-xs my-3"
          type="confirmpassword"
          name="confirmpassword"
          id="confirmpassword"
        />
        <label v-if="v$.confirmpassword.$error" class="label">
          <span class="label-text-alt text-red-600">Şifreler aynı değil</span>
        </label>

        <div class="card-actions justify-center mt-7">
          <button type="submit" class="btn btn-primary">Giriş Yap</button>
          <RouterLink :to="{ name: 'register' }" class="btn btn-ghost">Kayıt Ol</RouterLink>
        </div>
      </form>
    </div>
  </div>
</template>
