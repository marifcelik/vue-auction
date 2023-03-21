import { reactive } from 'vue'

const store = reactive({
  count: 5,
  increment() { this.count++ },
  decrement() { this.count-- },
  userId: ''
})

export default store
