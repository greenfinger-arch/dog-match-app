import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite' // 1. 여기에 추가!

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(), 
    tailwindcss() // 2. 여기에 추가! (쉼표로 구분해 주세요)
  ],
})