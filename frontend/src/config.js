const host = import.meta.env.VITE_HOST ?? 'http://localhost'
const port = import.meta.env.VITE_PORT ?? '5048'

export const SERVER = `${host}:${port}`
export default { SERVER }