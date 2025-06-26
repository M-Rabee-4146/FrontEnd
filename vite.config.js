import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import flowbiteReact from "flowbite-react/plugin/vite";

export default defineConfig({
  plugins: [tailwindcss({ theme: {
    extend: {
      fontFamily: {
        font1: ['Font-aquarium'],
        font2: ['Font-dustron'],
      },
    },
  },
}), react(), flowbiteReact()],
})