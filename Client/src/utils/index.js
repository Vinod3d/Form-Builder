export const baseUrl = import.meta.env.VITE_API_MODE  === 'production'
? import.meta.env.VITE_API_URL
: 'http://localhost:3000';