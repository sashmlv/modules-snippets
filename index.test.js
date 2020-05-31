'use strict';

const test = require( 'ava' ),
   snippets = require( './index' );

test( 'getClass', t => {

   t.deepEqual( snippets.getClass([]), 'array' );
});

test( 'deepFreeze', t => {

   const abc = {

      a: 0,
      b: {

         c: 0,
      },
      c: [ 0 ],
   };

   snippets.deepFreeze( abc );

   t.throws( _=> abc.a = 1 );
   t.throws( _=> abc.b.c = 2 );
   t.throws( _=> abc.c[ 0 ] = 3 );
   t.deepEqual( abc, { a: 0, b: { c: 0 }, c: [ 0 ]});
});