/**
 * Mongoose data models
 */
module.exports = function(config, mongoose) {
  var crypto = require('crypto');
  var Schema = mongoose.Schema;

  var UserSchema = new Schema({
    id: Schema.ObjectId,
    name: {
      first_name: String,
      last_name: String,
    },
    email: {type: String, index: true},
    password: String,
  });

  var User = mongoose.model('users', UserSchema);

  /**
   * Get the hashed password for a raw password
   */
  var hashPassword = function(password) {
    var passHash = crypto.createHash('sha256');
    passHash.update(config.get('security').salt + password);

    return passHash.digest('hex');
  };

  var models = {
    User: User,

    /**
     * Register a new user
     */
    register: function(data, callback) {
      var user = new User({
        name: {
          first_name: data.name.first_name,
          last_name:  data.name.last_name
        },
        email: data.email,
        password: hashPassword(data.password)
      });

      user.save(callback);
    },

    /**
     * Login with given user credentials
     */
    login: function(email, password, callback) {
      // Find the user with given email & password, excluding password from fields list
      User.findOne({email: email, password: hashPassword(password)}, {password: 0}, function(error, user) {
        callback(user);
      });
    },

    /**
     * User account udpate
     */
    update: function(user, callback) {
      if (user.password.length > 0) {
        user.password = hashPassword(user.password);
      }

      User.update({_id: user._id}, update, callback);
    }
  };

  return models;
}
