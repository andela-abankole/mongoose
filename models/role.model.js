// get mongoose and an instance of Schema
var mongoose  = require('mongoose'),
    Schema    = mongoose.Schema;

/** [roleSchema] @type {Schema} */
var roleSchema = new Schema (
  {
    title : {
      type     : String,
      trim     : true,
      unique   : true,
      reqiured : 'document title is required',
      index    : true
    },
    user : {
      type : Schema.Types.ObjectId,
      ref  : 'User'
    }
  }
);

/**
 * [exports Compile a 'Role' model using the roleSchema as the structure.
 *          Mongoose also creates a MongoDB collection called 'Role' for these documents.
 *          ]
 * @type {[Model]}
 */
module.exports = mongoose.model('Role', roleSchema)
