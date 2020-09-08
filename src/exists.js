import fs from 'fs';
import util from 'util';
import path from 'path';
const access = util.promisify( fs.access );

/**
 * Check file exists
 * @param {string} filePath
 * @param {boolean} tryFix
 * @return {boolean} Return file exists
 **/
async function exists( filePath, tryFix ) {

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

export {

   exists as default,
   exists,
};
