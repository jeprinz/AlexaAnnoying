import babel from 'rollup-plugin-babel';
import babelrc from 'babelrc-rollup';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

export default {
  entry: 'src/index.js',
  dest: 'dist/oneGiantAssFile.js',
  plugins: [
    babel(babelrc()),
    resolve({//https://github.com/rollup/rollup-plugin-node-resolve
      module: true, // Default: true
      jsnext: true,  // Default: false
      main: true,  // Default: true
      browser: false,  // Default: false
      extensions: [ '.js', '.json' ],  // Default: ['.js']
      preferBuiltins: false,  // Default: true
      jail: '/', // Default: '/'
      modulesOnly: false, // Default: false
      customResolveOptions: {
        moduleDirectory: 'node_modules'
      }
  }),
  commonjs({
    // non-CommonJS modules will be ignored, but you can also
    // specifically include/exclude files
    include: 'node_modules/**',  // Default: undefined
    exclude: [],  // Default: undefined
    // these values can also be regular expressions
    // include: /node_modules/

    // search for files other than .js files (must already
    // be transpiled by a previous plugin!)
    extensions: [ '.js', '.coffee' ],  // Default: [ '.js' ]

    // if true then uses of `global` won't be dealt with by this plugin
    ignoreGlobal: false,  // Default: false

    // if false then skip sourceMap generation for CommonJS modules
    sourceMap: false,  // Default: true

    // explicitly specify unresolvable named exports
    // (see below for more details)
    namedExports: {},  // Default: undefined

    // sometimes you have to leave require statements
    // unconverted. Pass an array containing the IDs
    // or a `id => boolean` function. Only use this
    // option if you know what you're doing!
    ignore: [ 'conditional-runtime-dependency' ]
  })
  ]
};
