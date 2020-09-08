/**
 * Get variable class
 * @param {*} - any
 * @return {string} class
 **/
function getClass( obj ) {

   return {}.toString.call( obj ).slice( 8, -1 ).toLowerCase();
};

export {

   getClass as default,
   getClass,
};
