import { reactive } from 'vue'

const store = reactive({
  count: 5,
  increment() { this.count++ },
  decrement() { this.count-- },
  userId: '',
  ws: undefined,
  messages: []
})

export default store
