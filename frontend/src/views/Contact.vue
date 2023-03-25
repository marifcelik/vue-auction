<script setup>
import { onUnmounted } from 'vue';
import store from '../store';

let {  ws, messages } = store;

onUnmounted(() => {
  if (ws?.OPEN)
    ws.close();
  store.messages = [];
});

ws = new WebSocket('ws://localhost:5048/deneme/?prod=2');

ws.onopen = () => {
  console.log('ws opened');
};

ws.onmessage = (event) => {
  messages.push(event.data);
  console.log(event.data);
};

ws.onclose = () => (ws = undefined);

function listClients() {
  ws.send(JSON.stringify({
    type: 'list'
  }))
}
</script>

<template>
  connection is {{ ws ? 'found' : 'none' }} <br />
  <button v-if="ws" @click="listClients">list clients</button> <br />
  messages: <br />
  <p>{{ messages }}</p>
</template>
