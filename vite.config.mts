// Builds the React Native app for the browser with react-native-web.
// The phone build (Metro, index.js) does not use this file.
import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';

const shim = (file: string) => path.resolve(__dirname, 'web/shims', file);

// Metro allows `require('./image.png')`; browsers need an import instead.
function requireImages(): Plugin {
    return {
        name: 'require-images',
        enforce: 'pre',
        transform(code, id) {
            if (!id.includes('/src/') || !/\.[jt]sx?$/.test(id)) return;
            const imports: string[] = [];
            const out = code.replace(
                /require\((['"])([^'"]+\.(?:png|jpe?g|gif|webp))\1\)/g,
                (_m, _q, file) => {
                    const name = `__image${imports.length}`;
                    imports.push(`import ${name} from ${JSON.stringify(file)};`);
                    return `{ uri: ${name} }`;
                },
            );
            return imports.length ? `${imports.join('\n')}\n${out}` : undefined;
        },
    };
}

export default defineConfig({
    plugins: [requireImages(), react()],
    resolve: {
        alias: [
            { find: /^react-native$/, replacement: shim('react-native.ts') },
            { find: /^react-native-linear-gradient$/, replacement: shim('LinearGradient.tsx') },
            { find: /^@react-native-vector-icons\/ionicons$/, replacement: shim('Ionicons.tsx') },
            { find: /^@react-native-community\/datetimepicker$/, replacement: shim('DateTimePicker.tsx') },
        ],
        extensions: ['.web.tsx', '.web.ts', '.web.jsx', '.web.js', '.tsx', '.ts', '.jsx', '.js', '.mjs', '.json'],
    },
    define: {
        __DEV__: JSON.stringify(false),
        global: 'globalThis',
    },
});
