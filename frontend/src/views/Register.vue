<script setup>
import { reactive, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useVuelidate } from '@vuelidate/core';
import { required, minLength, sameAs, email } from '@vuelidate/validators';
import store from '../store';
import { SERVER } from '../config';

const router = useRouter();
const formData = reactive({
  name: '',
  surname: '',
  username: '',
  password: '',
  confirmpassword: ''
});
const rules = computed(() => ({
  name: { required },
  surname: { required },
  username: { required, notContainSpace: (value) => !value.includes(' ') },
  email: { required, email },
  password: { required, minLength: minLength(6) },
  confirmpassword: { required, sameAs: sameAs(formData.password) }
}));
const v$ = useVuelidate(rules, formData);

async function validateForm() {
  const result = await v$.value.$validate();
  if (result) handleSubmit();
}

async function handleSubmit() {
  const user = JSON.parse(JSON.stringify(formData));
  delete user.confirmpassword;

  const req = await fetch(`${SERVER}/user/create`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(user)
  });
  const res = await req.json();
  if (req.ok && res.result._id) {
    store.userId = res.result._id;
    store.username = res.result.username;
    router.push('/');
  } else if (res.err?.code === 11000) {
    const type = Object.keys(res.err?.keyPattern)[0] === 'username' ? 'kullanıcı adı' : 'e mail';
    store.toast(`Bu ${type} daha önceden kullanılmış, lütfen başka bir ${type} kullanın`, 'error');
  }
}
</script>

<template>
  <div class="card w-[32rem] bg-base-200 mx-auto my-32 items-center max-[450px]:w-11/12">
    <div class="card-body items-center max-[450px]:!px-0">
      <h2 class="card-title">Kayıt Ol</h2>
      <form @submit.prevent="handleSubmit" class="form-control mt-3">
        <div class="form-item">
          <div class="mr-5">
            <label class="label" for="name">Ad</label>
            <input v-model="formData.name" class="form-input" type="text" name="name" id="name" />
            <label v-if="v$.name.$error" class="label">
              <span class="error-label">Ad boş geçilemez</span>
            </label>
          </div>

          <div>
            <label class="label" for="surname">Soyad</label>
            <input v-model="formData.surname" class="form-input" type="text" name="surname" id="surname" />
            <label v-if="v$.surname.$error" class="label">
              <span class="error-label">Soyad Boş geçilemez</span>
            </label>
          </div>
        </div>

        <div class="form-item">
          <div class="w-full">
            <label for="email" class="label">E-mail</label>
            <input v-model="formData.email" class="form-input" type="email" name="email" id="email" />
            <label v-if="v$.email.$error" class="label">
              <span v-if="v$.email.$errors[0].$validator === 'email'" class="error-label">Lütfen geçerli bir e-mail adresi girin</span>
              <span v-else class="error-label">E-mail boş geçilemez</span>
            </label>
          </div>
        </div>

        <div class="form-item">
          <div class="w-full">
            <label for="username" class="label">Kullanıcı Adı</label>
            <input v-model="formData.username" class="form-input" type="username" name="username" id="username" />
            <label v-if="v$.username.$error" class="label">
              <span v-if="v$.username.$errors[0].$validator === 'notContainSpace'" class="error-label">Kullanıcı adı boşluk içeremez</span>
              <span v-else class="error-label">Kullanıcı adı boş geçilemez</span>
            </label>
          </div>
        </div>

        <div class="form-item">
          <div class="mr-5">
            <label class="label" for="password">Şifre</label>
            <input v-model="formData.password" class="form-input" type="password" name="password" id="password" />
            <label v-if="v$.password.$error" class="label">
              <span class="error-label">Lütfen en az 6 haneden oluşan bir şifre girin</span>
            </label>
          </div>

          <div>
            <label class="label" for="confirmpassword">Şifre Tekrar</label>
            <input v-model="formData.confirmpassword" class="form-input" type="password" name="confirmpassword" id="confirmpassword" />
            <label v-if="v$.confirmpassword.$error" class="label">
              <span v-if="v$.confirmpassword.$errors[0].$validator === 'sameAs'" class="error-label">Şifreler uyuşmuyor</span>
              <span v-else class="error-label">Lütfen şifrenizi onaylayın</span>
            </label>
          </div>
        </div>

        <div class="card-actions justify-center mt-7">
          <button type="submit" @click.prevent="validateForm" class="btn btn-primary mr-2">
            Kayıt Ol
          </button>
          <RouterLink :to="{ name: 'login' }" class="btn btn-outline">Giriş Yap</RouterLink>
        </div>
      </form>
    </div>
  </div>
</template>

<style lang="postcss">
.form-item {
  @apply flex px-7 mb-5;
}

.form-input {
  @apply input input-bordered input-primary w-full;
}

.error-label {
  @apply label-text-alt text-red-600;
}
</style>
