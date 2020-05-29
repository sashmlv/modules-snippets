'use strict';

const Webpack = require( 'webpack' ),
   path = require( 'path' ),
   DIST = path.resolve( `${ __dirname }/../dist` );

module.exports = {

   target: 'node',
   mode: 'production',
   stats: {

      all: false,
      colors: true,
      errors: true,
      errorDetails: true,
      warnings: true,
      builtAt: true,
   },
   entry: {

      index: './index',
   },
   output: {

      path: DIST,
      filename: '[name].js',
      libraryTarget: 'umd',
   },
   plugins: [

      new Webpack.ProgressPlugin(),
   ].filter( v => v )
};
