/**
 * Admin
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 *
 */

module.exports = {

  attributes: {
  	
  	username: "STRING",
  	password : "STRING",
  	email : "STRING"
    
  },

  beforeCreate: function(values, next) {
  	var bcrypt = require('bcrypt');
    bcrypt.hash(values.password, 10, function(err, hash) {
      if(err) return next(err);
      values.password = hash;
      next();
    });
  }

};
