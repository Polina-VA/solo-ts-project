//.middleware/removeHeader.js

const removeHeader = (req, res, next) => {
    res.removeHeader('X-Powered-By');
    // Удаление заголовка `X-Powered-By`
    next();
  };
  
  module.exports = removeHeader;