'use strict';

const test = require( 'ava' ),
   puppeteer = require( 'puppeteer' ),
   sinon = require( 'sinon' ),
   Server = require( 'server' ),
   server = new Server({
      main: {

         content: 'this text will be replaced by html content',
      },
      root: 'dist/web',
      frontendHost: 'localhost',
      frontendPort: 3000,
      log: false,
   });

let browser, page;

test.before( async t => {

   browser = await puppeteer.launch(),
   page = await browser.newPage();
   page.on( 'console', msg => console.log( msg.text()));
   page.on( 'pageerror', err => console.log( err ));
   server.listen();
});

test.after( async t => {

   await browser.close();
   server.close();
});

test( `web: deepFreeze`, async t => {

   const abc = {
      a: 0,
      b: {
         c: 0,
         d: {
            e: {
               f: 0,
            },
         },
      },
      c: [ 0 ],
   };

   const content = `
<!DOCTYPE html>
<html>
   <head>
   </head>
   <body>
      <script type = 'module'>
         import deepFreeze from './deepFreeze.js';
         (async _=> {

            window.abc = ${ JSON.stringify( abc )}
            window.test = [];

            abc.a = 123;

            deepFreeze( abc );

            try {

               abc.a = 1;
            }
            catch( err ) {

               window.test.push( err.message );
            }
            try {

               abc.b.c = 2;
            }
            catch( err ) {

               window.test.push( err.message );
            }
            try {

               abc.c[ 0 ] = 3;
            }
            catch( err ) {

               window.test.push( err.message );
            }
            try {

               abc.b.d.e.f = 4;
            }
            catch( err ) {

               window.test.push( err.message );
            }
         })();
      </script>
   </body>
</html>`;

   await page.goto( 'http://localhost:3000' );
   await page.setContent( content );

   const result = await page.evaluate( _=> ({ test: window.test, abc: window.abc }));
   t.deepEqual( undefined, result.test.find( v => ! v.includes( 'Cannot assign to read only property' )));
   t.deepEqual( result.abc, { a: 123, b: { c: 0, d: { e: { f: 0 }}}, c: [ 0 ]});
});
