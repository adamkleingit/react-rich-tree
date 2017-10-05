import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import uglify from 'rollup-plugin-uglify';

export default {
  format: 'umd',
  moduleName: 'react-tree',
  plugins: [
    nodeResolve({ jsnext: true, main: true, module: true }),
    commonjs({
      namedExports: {
        'lodash': [ 'first', 'last', 'compact', 'find', 'isString', 'isFunction', 'includes', 'forEach', 'capitalize', 'reduce' ],
        'mobx-react': [ 'observer' ],
        '@shopify/draggable': [ 'Draggable' ]
      }    
    }),
    uglify()
  ],
  sourceMap: true,
  external: [
    'react',
    'react-dom',
    'prop-types'
  ]
};
