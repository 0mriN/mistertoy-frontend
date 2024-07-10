
import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "../mistertoy-backend/public",
    emptyOutDir: true,
  },
})