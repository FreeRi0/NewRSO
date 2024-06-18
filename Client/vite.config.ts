import { fileURLToPath, URL } from 'url';
import { defineConfig, type Alias } from 'vite';
import vue from '@vitejs/plugin-vue';

const getAliasObject = (findName: string, path: string): Alias => {
    return {
        find: findName,
        replacement: fileURLToPath(new URL(path, import.meta.url)),
    };
};

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    root: './src/app',
    server: {
        port: 8080,
        proxy: {
            "/api": {
                //changeOrigin: true,
                target: "http://127.0.0.1:8000",
                changeOrigin: true,
                secure: false,
            },
            "https://api.vk.com/method/auth.getProfileInfoBySilentToken": {
                //changeOrigin: true,
                target: "http://127.0.0.1:8000",
                changeOrigin: true,
                secure: false,
            }
        }
    },
    resolve: {
        alias: [
            getAliasObject('@', './src'),
            getAliasObject('@app', './src/app'),
            getAliasObject('@processes', './src/processes'),
            getAliasObject('@layouts', './src/layouts'),
            getAliasObject('@pages', './src/pages'),
            getAliasObject('@widgets', './src/widgets'),
            getAliasObject('@features', './src/features'),
            getAliasObject('@entities', './src/entities'),
            getAliasObject('@shared', './src/shared'),
            getAliasObject('@services', './src/services'),
        ],
    },

    css: {
        preprocessorOptions: {
            scss: {
                additionalData: "@import '@app/css/variables.scss';",
            },
        },
    },
    // build: {
    //     rollupOptions: {
    //       output: {
    //         entryFileNames: [name] + hash + .js,
    //         chunkFileNames: [name] + hash + .js,
    //         assetFileNames: [name] + hash + .[ext]
    //       }
    //     }
    //   },
      build: {
        rollupOptions: {
          output: {
            assetFileNames: (assetInfo) => {
              let extType = assetInfo.name.split('.').at(1);
              if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
                extType = 'img';
              }
              return `assets/${extType}/[name]-[hash][extname]`;
            },
            chunkFileNames: 'assets/js/[name]-[hash].js',
            entryFileNames: 'assets/js/[name]-[hash].js',
          },
        },
      },
});
