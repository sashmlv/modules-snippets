'use strict';

const test = require( 'ava' ),
   path = require( 'path' ),
   shell = require( 'shelljs' ),
   TMP = path.resolve( `${ __dirname }/tmp` ),
   { exists } = require( '../dist/node' );

test.before( t => {

   shell.rm( '-rf', TMP );
   shell.mkdir( '-p', TMP );
});

test.serial.after( t => shell.rm( '-rf', TMP ));

test( 'exists', async t => {

   shell.mkdir( '-p', TMP );
   t.deepEqual( await exists( TMP ), true );

   shell.rm( '-rf', TMP );
   t.deepEqual( await exists( TMP ), false );
});
