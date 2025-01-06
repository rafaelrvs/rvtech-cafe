import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,  // Torna o servidor acessível na rede local
    port: 3000,  // Define a porta, pode alterar se necessário
    
  }
})
