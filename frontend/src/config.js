const host = import.meta.env.VITE_SERVER_HOST ?? 'https://localhost'
const port = import.meta.env.VITE_SERVER_PORT ?? '5048'

export const SERVER = `${host}:${port}`
export default { SERVER }