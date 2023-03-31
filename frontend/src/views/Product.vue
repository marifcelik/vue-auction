<script setup>
import { onBeforeMount, onUnmounted, reactive, ref } from 'vue';
import { nanoid } from 'nanoid'
import { SERVER } from '../config';
import store from '../store';

const newBid = reactive({});
const data = ref({});
const bids = ref([]);
const props = defineProps(['id']);

const ws = new WebSocket(`${SERVER.replace('http', 'ws')}/?prod=${props.id}`);

ws.onmessage = (ev) => {
  try {
    const data = JSON.parse(ev.data);
    bids.value.push(data);
    bids.value.sort((a, b) => b.price - a.price);
  } catch (err) {
    console.log(ev.data);
  }
};

onUnmounted(() => {
  if (ws?.OPEN) ws.close();
});

onBeforeMount(async () => {
  data.value = await fetch(`${SERVER}/product/${props.id}`, {
    credentials: 'include'
  }).then((res) => res.json());

  const fetchedBids = await fetch(`${SERVER}/bid/get/p/${props.id}`, {
    credentials: 'include'
  }).then((res) => res.json());

  bids.value = fetchedBids.result;
});

async function handleBid() {
  if (!(store.countdown > 0))
    return store.toast('Açık arttırma sona ermiştir.', 'warning');

  if (!newBid.price || isNaN(parseInt(newBid.price)))
    return store.toast('Lütfen geçerli bir teklif girin.', 'warning');

  newBid.id = nanoid();
  const bid = {
    type: 'bid',
    data: {
      id: newBid.id,
      userId: store.userId,
      productId: props.id,
      price: newBid.price
    }
  };
  const req = await fetch(`${SERVER}/bid/create`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(bid.data)
  });
  if (req.ok) {
    await req.json();
    newBid.price = '';
    newBid._id = '';
  }
}
</script>

<template>
  <div class="md:grid md:grid-cols-[1fr_3fr] justify-center w-full mt-20 mx-auto sm:block sm:flex-col xl:w-4/5">
    <div class="card bg-base-200 shadow-xl w-80 h-[28rem] mx-auto mb-10 md:sticky md:top-32 md:left-10 xl:left-32 lg:w-96 lg:h-[40rem]">
      <figure class="h-[20rem]">
        <img :src="`${SERVER}/img/${data.image}`" :alt="`${data.name} resmi`" class="h-full w-full object-cover" />
      </figure>
      <div class="card-body">
        <h2 class="card-title">{{ data.name }}</h2>
        <p>{{ data.details }}</p>
        <div class="card-actions flex justify-between items-end mt-7">
          <h2 class="text-xl font-bold">son teklif :</h2>
          <h2 v-if="bids[0]" class="text-3xl font-bold text-accent">
            {{ parseInt(bids[0]?.price).toLocaleString('tr-TR') }} ₺
          </h2>
          <h2 v-else class="font-bold">henüz teklif yapılmadı</h2>
        </div>
      </div>
    </div>

    <div class="flex flex-col items-center w-4/5 max-w-xl mx-auto">
      <form @submit.prevent="handleBid" class="flex mb-4 w-full mx-auto">
        <input inputmode="numeric" class="input input-bordered input-info w-full" v-model="newBid.price" />
        <button class="btn btn-info ml-3" type="submit">Teklif Ver</button>
      </form>
      <ul class="w-full mx-auto" v-auto-animate>
        <li v-for="bid in bids" :key="bid._id ?? bid.id">
          <h1 class="text-2xl">{{ parseInt(bid.price).toLocaleString('tr-TR') }} ₺</h1>
          <h2>{{ bid.username ?? bid?.userId?.username }}</h2>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped lang="postcss">
ul li {
  @apply alert bg-violet-600 border text-white px-5 my-3 mx-auto first:bg-emerald-500;
}
</style>
