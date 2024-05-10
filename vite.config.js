import { defineConfig } from 'vite';
import path from 'path';
import dts from 'vite-plugin-dts';
import ts from 'typescript';
import { getBabelOutputPlugin } from '@rollup/plugin-babel';
import { createVuePlugin } from 'vite-plugin-vue2';

module.exports = defineConfig({
    plugins: [
        createVuePlugin(),
        dts({
            rollupTypes: true,
            compilerOptions: {
                moduleResolution: ts.ModuleResolutionKind.NodeNext,
            },
        }),
    ],
    build: {
        minify: 'esbuild',
        lib: {
            entry: path.resolve(__dirname, 'lib/index.ts'),
            name: 'vue2-teleport-next',
            fileName: 'vue2-teleport-next',
            formats: ['cjs', 'es', 'umd'],
        },
        rollupOptions: {
            external: ['vue'],
            output: {
                globals: {
                    vue: 'Vue',
                },
                dir: 'dist',
            },
            plugins: [
                getBabelOutputPlugin({
                    allowAllFormats: true,
                    presets: [
                        [
                            '@babel/preset-env',
                            {
                                useBuiltIns: false, // Default：false
                                // Exclude transforms that make all code slower
                                exclude: ['transform-typeof-symbol'],
                                // https://babeljs.io/docs/en/babel-preset-env#modules
                                modules: false,
                            },
                        ],
                    ],
                }),
            ],
        },
    },
});
