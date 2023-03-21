<script setup>
import { ref } from 'vue';

const connection = ref(null)
const messages = ref([])

const ws = new WebSocket('ws://localhost:5048/')

ws.onopen = () => {
    console.log('ws opened')
}

ws.onmessage = (event) => {

}

</script>

<template>
    connection is {{ connection }}
    messages: <br>
    <ul>
        <li v-for="(msg, i) in messages" :key="i">{{ msg }}</li>
    </ul>
</template>