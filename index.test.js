'use strict';

const test = require( 'ava' ),
   snippets = require( './index' );

test( 'snippets', t => {

   t.deepEqual( snippets.getClass([]), 'array' );
});
