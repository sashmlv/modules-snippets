'use strict';

const test = require( 'ava' ),
   path = require( 'path' ),
   shell = require( 'shelljs' ),
   TMP = path.resolve( `${ __dirname }/tmp` ),
   snippets = require( './index' );

test.before( t => {

   shell.rm( '-rf', TMP );
   shell.mkdir( '-p', TMP );
});

test.serial.after( t => shell.rm( '-rf', TMP ));

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

test( 'exists', async t => {

   shell.mkdir( '-p', TMP );
   t.deepEqual( await snippets.exists( TMP ), true );

   shell.rm( '-rf', TMP );
   t.deepEqual( await snippets.exists( TMP ), false );
});


