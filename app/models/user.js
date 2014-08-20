var db = require('../config');
// var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');
var bcrypt = Promise.promisifyAll(require('bcrypt-nodejs'));

var User = db.Model.extend({
  tableName: 'users',
  hasTimestamps: true,
  initialize: function(){
    this.on('creating', function(model, attrs, options) {
      var salt = bcrypt.genSaltSync(10);
      var hash = bcrypt.hashSync(model.get('password'), salt)
      model.set('salt', salt);
      model.set('password', hash);
    });
  },
  comparePassword: function(inputPassword, databasePassword) {
    // Compare input password with hashed password in db
    return bcrypt.compareAsync(inputPassword, databasePassword)
    .then(function(result) {
      console.log(result);
      return result;
    });
  }
});

module.exports = User;