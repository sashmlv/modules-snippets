/**
 * Creates a deep clone of an object
 * https://github.com/30-seconds/30-seconds-of-code#deepclone
 * @param { object } obj
 * @return { object }
 */
function deepClone( obj ) {

   if( obj === null ) {
      return null;
   };

   let clone = Object.assign({}, obj );

   Object.keys( clone ).forEach(

      key => ( clone[ key ] = typeof obj[ key ] === 'object' ? deepClone( obj[ key ]) : obj[ key ])
   );

   return Array.isArray( obj ) && obj.length ?
      ( clone.length = obj.length ) && Array.from( clone ) :
      Array.isArray( obj ) ?
      Array.from( obj ) :
      clone;
};

export {

   deepClone as default,
   deepClone,
};