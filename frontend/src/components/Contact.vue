<script setup>
import { onMounted, onUnmounted } from 'vue';
import store from '../store';

const { count, ws } = store
console.log(count)

onUnmounted(() => {
  ws.close()
  store.messages = []
})

if (!ws) {
  ws = new WebSocket('ws://localhost:5048/deneme/?prod=2')
  ws.onopen = () => {
    console.log('ws opened')
  }

  ws.onmessage = (event) => {
    store.messages.push(event.data)
    console.log(event.data)
  }

  ws.onclose = () => ws = undefined
}

function listClients() {
  console.log(ws.onmessage.toString())
  ws.send(JSON.stringify({
    type: 'list'
  }))
}
</script>

<template>
  connection is {{ ws ? 'found' : 'none' }} <br>
  <button v-if="ws" @click="listClients">list clients</button> <br>
  messages: <br>
  <p>{{ store.messages }}</p>
</template>