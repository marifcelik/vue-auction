import { reactive, watchEffect } from 'vue'

const store = reactive({
  count: 5,
  increment() { this.count++ },
  decrement() { this.count-- },
  isLoggedIn: localStorage.getItem('isLoggedIn') === 'true',
  /** @type {WebSocket | undefined} */
  ws: undefined,
  messages: []
})

watchEffect(() => localStorage.setItem('isLoggedIn', store.isLoggedIn))

export default store
