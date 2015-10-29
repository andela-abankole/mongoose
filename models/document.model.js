// get mongoose and an instance of Schema
var mongoose  = require('mongoose'),
    Schema    = mongoose.Schema;

/** @type {Schema} [description] */
var documentSchema = new Schema (
  {
    title : {
      type     : String,
      trim     : true,
      unique   : true,
      required : 'document title is required'
    },
    permission : {
      type : Schema.Types.ObjectId,
      ref  : 'Role'
    },
    description : String,
    dateCreated : String,
    lastModified : String
  }
);

/**
 * [exports Compile a 'Document' model using the documentSchema as the structure.
 *          Mongoose also creates a MongoDB collection called 'Document' for these documents.
 *          ]
 * @type {[Model]}
 */
module.exports = mongoose.model('Document', documentSchema)
