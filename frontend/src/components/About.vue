<script setup>
import { ref } from 'vue';

const user = ref('')
const password = ref('')

async function handleSubmit() {
    console.log('current url:', document.location.pathname)
    const logIn = await fetch('http://localhost:5048/auth/login', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: user.value, password: password.value })
    })
    if (logIn.ok) {
        console.log('login ok')
        console.log(logIn)
        const jj = await logIn.json()
        console.group(jj)
    }
}
</script>

<template>
    about page
    <form @submit.prevent="handleSubmit">
        <label for="user">username</label>
        <input v-model="user" type="text" name="user" id="user"><br>
        <label for="password">password</label>
        <input v-model="password" type="text" name="user" id="user"><br>
        <button type="submit">giriş yap</button>
    </form>
</template>