import { reactive, watchEffect } from 'vue'

const store = reactive({
  count: 5,
  increment() { this.count++ },
  decrement() { this.count-- },
  userId: localStorage.getItem('userId')
})

watchEffect(() => localStorage.setItem('userId', store.userId))

export default store
