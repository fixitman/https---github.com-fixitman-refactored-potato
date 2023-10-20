//the majority of this file came from simple-csrf
//I made some adjustments to the original code to better fit my needs


var crypto = require('crypto');
var scmp = require('scmp');

module.exports = 
  function simpleCsrf(req, res, next) {

    // This won't work without sessions
    if(!req.session){
      var error = new Error('Session not set up yet')
      error.status=500;
      return next(error);
    }

    // Get/generate token
    var token = req.session.simpleCsrfToken;
    if (!token) {
      token = crypto.randomBytes(32).toString('hex');
      req.session.simpleCsrfToken = token;
    }
    
    // Expose to developer
    req.csrfToken = token;
    res.locals.csrfToken = token;

    // Validate
    // auth/login doesn't need to be checked
    if (req.method != 'GET' && req.method != 'HEAD' && req.method != 'OPTIONS' && req.path != '/auth/login') {
      var submittedToken = (req.body?._csrf_token) || (req.headers['x-csrf-token']);
      if (!scmp(submittedToken, token)) {
        var error = new Error('Invalid CSRF token.');
        error.status = 403;
        return next(error);
      }
    }
    
    next();
  };
