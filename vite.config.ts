import path from "path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import solidPlugin from "vite-plugin-solid";

export default defineConfig({
  plugins: [solidPlugin(), dts({ insertTypesEntry: true })],
  server: {
    port: 3000,
  },
  build: {
    target: "esnext",
    lib: {
      entry: path.resolve(__dirname, "src/lib.ts"),
      name: "solid-presence-signal",
      fileName: (format) => `lib.${format}.js`,
    },
    rollupOptions: {
      external: ["solid-js"],
    },
  },
});
