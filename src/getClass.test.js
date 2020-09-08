'use strict';

const test = require( 'ava' ),
   { getClass } = require( '../dist/node' );

test( 'getClass', t => {

   t.deepEqual( getClass([]), 'array' );
});
