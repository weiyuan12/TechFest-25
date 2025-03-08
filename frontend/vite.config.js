import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import { mtConfig } from "@material-tailwind/react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), mtConfig],
  server:{
    host:true,
    port:5173
  }
  
})
