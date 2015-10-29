// get mongoose and an instance of Schema
var mongoose  = require('mongoose'),
    Schema    = mongoose.Schema;

/** [userSchema] @type {Schema} */
var userSchema = new Schema (
  {
    name : {
      first : {
        type     : String,
        trim     : true,
        required : 'firstname is required',
        index    : true
      },
      last : {
        type     : String,
        trim     : true,
        required : 'lastname is required',
        index    : true
      }
    },
    username : {
      type     : String,
      required : 'username is required',
      unique   : true,
      index    : true,
      trim     : true,
    },
    email : {
      type      : String,
      trim      : true,
      unique    : true,
      lowercase : true,
      required  : 'email address is required',
      match     : [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'email is incorrect, please match example@gmail.com']
    },
    password : {
      type      : String,
      required  : 'password is required',
      minlength : [5, 'password is shorter than the minimum allowed length 5']
    }, 
    role : {
      type : Schema.Types.ObjectId,
      ref  : 'Role'
    }
  }
);


/**
 * [exports Compile a 'User' model using the userSchema as the structure.
 *          Mongoose also creates a MongoDB collection called 'User' for these documents.
 *          ]
 * @type {[Model]}
 */
module.exports = mongoose.model('User', userSchema);
