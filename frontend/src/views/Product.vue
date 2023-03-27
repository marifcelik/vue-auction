<script setup>
import { onBeforeMount, onUnmounted, ref } from 'vue';
import { SERVER } from '../config';
import store from '../store';

const data = ref({});
const price = ref('');
const props = defineProps(['id']);

const ws = new WebSocket(`${SERVER.replace('http', 'ws')}/?prod=${props.id}`);

ws.onopen = () => console.log('bağlandı');

ws.onmessage = (ev) => {
  try {
    const data = JSON.parse(ev.data);
    alert(JSON.stringify(data));
  } catch (err) {
    console.log(ev.data);
  }
};

ws.onclose = () => console.log(ws.url);

onUnmounted(() => {
  if (ws?.OPEN) ws.close();
});

onBeforeMount(async () => {
  data.value = await fetch(`${SERVER}/product/${props.id}`, {
    credentials: 'include'
  }).then((res) => res.json());
  console.log(data.value);
});

async function handleBid() {
  const bid = {
    type: 'bid',
    data: {
      userId: store.userId,
      productId: props.id,
      price: price.value
    }
  };
  const req = await fetch(`${SERVER}/bid/create`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(bid.data)
  });
  const res = await req.json();
  console.log(res);
}
</script>

<template>
  <div class="p-12">
    <div class="card bg-base-200 shadow-xl w-96">
      <figure class="h-1/2">
        <img
          :src="`${SERVER}/img/${data.image}`"
          :alt="`${data.name} resmi`"
          class="h-full w-full object-cover"
        />
      </figure>
      <div class="card-body">
        <h2 class="card-title">{{ data.name }}</h2>
        <h3></h3>
        <p>{{ data.details }}</p>
        <div class="card-actions flex justify-between items-end mt-7">
          <h2 class="text-xl font-bold">son teklif :</h2>
          <h2 class="text-3xl font-bold text-accent">{{ (99999).toLocaleString('tr-TR') }} ₺</h2>
        </div>
      </div>
    </div>
  </div>
</template>
