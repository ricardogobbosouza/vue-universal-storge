
import typescript from 'rollup-plugin-typescript';
import buble from 'rollup-plugin-buble';

export default {
  input: './src/index.ts',
  output: [
    { file: './dist/vue-universal-storage.js', format: 'esm' },
    { file: './dist/vue-universal-storage.common.js', format: 'cjs' }
  ],
  plugins: [
    typescript(),
    buble()
  ],
};
