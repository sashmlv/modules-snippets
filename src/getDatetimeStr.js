/**
 * Get datetime string
 * @param {object} params
 * @param {string} params.datetime
 * @param {string} params.separator
 * @return {string}
 **/
function getDatetimeStr( params ) {

   const { datetime, separator = ' ' } = params,
      date = datetime ? new Date( datetime ) : new Date();

   return ( '0' + date.getDate()).slice( -2 ) + '.' +
      ( '0' + ( date.getMonth() + 1 )).slice( -2 ) + '.' +
      ( '0' + date.getFullYear()).slice( -2 ) + separator +
      ( '0' + date.getHours()).slice( -2 ) + ':' +
      ( '0' + date.getMinutes()).slice( -2 ) + ':' +
      ( '0' + date.getSeconds()).slice( -2 );
};

export {

   getDatetimeStr as default,
   getDatetimeStr,
};