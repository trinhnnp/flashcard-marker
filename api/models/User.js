/*
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */
var bcrypt = require('bcrypt');

module.exports = {

  attributes: {
		username: {
			type: 'string',
			required: true,
			unique: true,
		},
		password: {
			type: 'string',
			required: true,
			// minLength: 6,
		},
		screen_name: {
			type: 'string',
			required: true,
			unique: true,
		},
		role: {
			type: 'boolean',
			required: true
		},
		toJSON: function() {
	      var obj = this.toObject();
	      delete obj.password;
	      return obj;
	    },	
  },
  // beforeCreate: function(user, cb) {
  //       bcrypt.genSalt(10, function(err, salt) {
  //           bcrypt.hash(user.password, salt, function(err, hash) {
  //               if (err) {
  //                   console.log(err);
  //                   cb(err);
  //               } else {
  //                   user.password = hash;
  //                   cb();
  //               }
  //           });
  //       });
  //  },
   signup: function (inputs, cb) {
    // Create a user
    User.create({
      username: inputs.username,
      screen_name: inputs.screen_name,
      // TODO: But encrypt the password first
      password: inputs.password,
      role: inputs.role,
      reg_datetime: Date(),
    })
    .exec(cb);
  },



  /**
   * Check validness of a login using the provided inputs.
   * But encrypt the password first.
   *
   * @param  {Object}   inputs
   * @param  {Function} cb
   */

  attemptLogin: function (inputs, cb) {
    // Create a user
    User.findOne({
      username: inputs.username,
      // TODO: But encrypt the password first
      password: inputs.password
    })
    .exec(cb);
  }
};

