'use strict';

const fs = require( 'fs' ),
   util = require( 'util' ),
   path = require( 'path' ),
   access = util.promisify( fs.access );

class Snippets {

   /**
    * Get variable class
    * @param {*} - any
    * @return {string} class
    **/
   getClass( obj ) {

      return {}.toString.call( obj ).slice( 8, -1 ).toLowerCase();
   }

   /**
    * Check file exists
    * @param {string} filePath
    * @param {boolean} tryFix
    * @return {boolean} Return file exists
    **/
   async exists( filePath, tryFix ) {

      try {

         if( tryFix ){

            filePath = path.resolve( filePath );
         }

         await access( filePath, fs.constants.F_OK );

         return true;
      }
      catch( e ) {

         if( e.code === 'ENOENT' ) {

            return false;
         }

         throw e;
      };
   };

   /**
    * Get datetime string
    * TODO: write test
    * @param {object} params
    * @param {string} params.datetime
    * @param {string} params.separator
    * @return {string}
    **/
   getDatetimeStr( params ) {

      const { datetime, separator = ' ' } = params,
         date = datetime ? new Date( datetime ) : new Date();

      return ( '0' + date.getDate()).slice( -2 ) + '.' +
         ( '0' + ( date.getMonth() + 1 )).slice( -2 ) + '.' +
         ( '0' + date.getFullYear()).slice( -2 ) + separator +
         ( '0' + date.getHours()).slice( -2 ) + ':' +
         ( '0' + date.getMinutes()).slice( -2 ) + ':' +
         ( '0' + date.getSeconds()).slice( -2 );
   }

   /**
    * Creates a deep clone of an object
    * TODO: write test
    * https://github.com/30-seconds/30-seconds-of-code#deepclone
    * @param { object } obj
    * @return { object }
    */
   deepClone( obj ) {

      if( obj === null ) {
         return null;
      };

      let clone = Object.assign({}, obj );

      Object.keys( clone ).forEach(
         key => ( clone[ key ] = typeof obj[ key ] === 'object' ? this.deepClone( obj[ key ]) : obj[ key ])
      );

      return Array.isArray( obj ) && obj.length ?
         ( clone.length = obj.length ) && Array.from( clone ) :
         Array.isArray( obj ) ?
         Array.from( obj ) :
         clone;
   };

   /**
    * Deep freezes an object
    * https://github.com/30-seconds/30-seconds-of-code
    * @param { object } obj
    * @return { object } Return frozen object
    */
   deepFreeze( obj ) {

      if( obj === null || typeof obj !== 'object' ) {

         return obj;
      };

      Object.keys( obj ).forEach( prop => {

         if( obj[ prop ] !== null && typeof obj[ prop ] === 'object' && ! Object.isFrozen( obj[ prop ])) {

            this.deepFreeze( obj[ prop ]);
         };
      });

      return Object.freeze( obj );
   };
}

module.exports = new Snippets();
