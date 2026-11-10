import { defineConfig, loadEnv, transformWithEsbuild } from "vite";
import react from "@vitejs/plugin-react";

function jsxInJs() {
  return {
    name: "jsx-in-js",
    async transform(code, id) {
      if (id.includes("node_modules") || !id.includes("/src/") || !id.endsWith(".js")) {
        return null;
      }
      return transformWithEsbuild(code, id, {
        loader: "jsx",
        jsx: "automatic",
      });
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const port = Number(env.PORT) || 3000;

  return {
    plugins: [jsxInJs(), react()],
    envPrefix: ["VITE_", "REACT_APP_"],
    server: { port, strictPort: true },
    preview: { port },
    build: {
      outDir: "build",
      sourcemap: env.GENERATE_SOURCEMAP === "true",
      chunkSizeWarningLimit: 1600,
    },
    optimizeDeps: {
      esbuildOptions: {
        loader: { ".js": "jsx" },
      },
    },
  };
});
