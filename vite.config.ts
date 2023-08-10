import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import tsconfigPaths from "vite-tsconfig-paths"
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(), 
        tsconfigPaths(),
        svgr({          
            // exclude public folder
            exclude: "/*.svg",
        })
    ],
    base: "/learn-react-from-hook/",
    server: {
        port: 3000
    }
})
