// vite.config.js
import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  // Cấu hình cho server phát triển
  server: {
    port: 3000, // Bạn có thể thay đổi port nếu cần
  },
  // Cấu hình cho build
  build: {
    outDir: "dist", // Thư mục đầu ra cho build
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"), // Tệp đầu vào chính
        login: resolve(__dirname, "login/index.html"), // Tệp đầu vào login
        register: resolve(__dirname, "/register/index.html"),
        // register: resolve(__dirname, "register", "index.html"),
      },
    },
  },
});