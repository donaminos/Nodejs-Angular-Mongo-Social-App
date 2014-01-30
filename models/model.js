/**
 * Mongoose data models
 */
module.exports = function(mongoose) {
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

  var models = {
    User: mongoose.model('Users', UserSchema)
  };

  return models;
}
