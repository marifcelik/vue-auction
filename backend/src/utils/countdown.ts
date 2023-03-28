import { COUNTDOWN } from '../config'

let countdown = Number(COUNTDOWN)

const timer = setInterval(() => {
  if (countdown > 0)
    countdown--
  else
    clearInterval(timer)
}, 1000)

export const remainingTime = () => countdown