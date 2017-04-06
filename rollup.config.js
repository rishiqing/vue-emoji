import resolve  from 'rollup-plugin-node-resolve';
import babel    from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import uglify   from 'rollup-plugin-uglify';
import vue      from 'rollup-plugin-vue';

const isProd = process.env.NODE_ENV === 'prod';

export default {
  entry: 'src/index.vue',
  dest: 'dist/vue-emoji.js',
  format: 'umd',
  moduleName: 'VueEmoji',
  sourceMap: !isProd,
  plugins: [
    resolve({
      jsnext: true,
      main: true,
      browser: true,
      extensions: ['.js', '.json']
    }),
    vue({
      css: __dirname + '/dist/vue-emoji.css',
      scss: {
        outputStyle: 'compressed',
      }
    }),
    babel({
      exclude: 'node_modules/**'
    }),
    commonjs(),
    (isProd && uglify())
  ]
}
