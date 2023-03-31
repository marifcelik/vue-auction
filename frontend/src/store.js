import { reactive, watchEffect } from 'vue'

const store = reactive({
  userId: localStorage.getItem('userId') ?? '',
  username: localStorage.getItem('username') ?? '',
  countdown: 0,
  toastShow: false,
  toastType: '',
  toastMsg: '',
  toast(message, type = 'info') {
    this.toastType = type
    this.toastMsg = message
    this.toastShow = true

    setTimeout(() => {
      this.toastType = ''
      this.toastMsg = ''
      this.toastShow = false
    }, 3500)
  },
  theme: localStorage.getItem('theme')
})

watchEffect(() => {
  localStorage.setItem('userId', store.userId)
  localStorage.setItem('username', store.username)
  localStorage.setItem('theme', store.theme)
})

let timer = {
  id: undefined,
  setTimer() {
    this.id = setInterval(() => {
      if (store.countdown !== 0)
        store.countdown--
      else {
        clearInterval(this.id)
        this.id = undefined
      }
    }, 1000)
  }
};

export { timer }
export default store
