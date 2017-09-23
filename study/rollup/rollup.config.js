// rollup.config.js
import json from 'rollup-plugin-json';
import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';

export default {
  entry: 'src/main.js',
  format: 'cjs',
  sourceMap: true,
  plugins: [
    json(),
    resolve(),
    babel({
      exclude: 'node_modules/**' // 仅仅转译我们的源码
    })],
  dest: 'bundle.js' // 相当于 --output
};