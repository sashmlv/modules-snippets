/**
 * Deep freezes an object
 * https://github.com/30-seconds/30-seconds-of-code
 * @param { object } obj
 * @return { object } Return frozen object
 **/
function deepFreeze( obj ) {

   if( obj === null || typeof obj !== 'object' ) {

      return obj;
   };

   Object.keys( obj ).forEach( prop => {

      if( obj[ prop ] !== null && typeof obj[ prop ] === 'object' && ! Object.isFrozen( obj[ prop ])) {

         deepFreeze( obj[ prop ]);
      };
   });

   return Object.freeze( obj );
};

export {

   deepFreeze as default,
   deepFreeze,
};