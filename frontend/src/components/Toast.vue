<script setup>
import store from '../store';

const types = {
  warning: 'alert-warning',
  error: 'alert-error'
};
</script>

<template>
  <div v-show="store.toastShow" class="toast toast-top toast-end mt-24">
    <div class="alert" :class="types[store.toastType]">
      <div>
        <span>{{ store.toastMsg }}</span>
      </div>
    </div>
  </div>
</template>
