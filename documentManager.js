// get mongoose user and Document model and config file
var User     = require('./models/user.model'),
    Role     = require('./models/role.model'),
    Document = require('./models/document.model');

/** @type {Object} [exports methods to be used] */
module.exports = {

  /**
   * [createUser check if role exist,
   *             create a role if it does not exist,
   *             create a user with role]
   * @param     {[String]}          first    [contain first name]
   * @param     {[String]}          last     [contain last name]
   * @param     {[String]}          email    [contain emal address]
   * @param     {[String]}          username [contain username]
   * @param     {[String]}          password [contain password]
   * @param     {[String]}          role     [contain role]
   * @return    {[Object]}                   [return the user full info with _id and _v]
   */
  createUser  : function(first, last, email, username, password, role) {
    return Role.findOne({ title: role }).then(function(role) {
            if (!role || role  === ({} || [])) {
              return Role.create({ title: role });
            } 
            else {
              return role;
            }
          }).then(function(role) {
            return User.create({
              name : { 
                first : first,
                last  : last
              },
              email    : email,
              username : username,
              password : password,
              role     : role 
            }).then(function(user) {
              return user;
            });
          });
  },

  /**
   * [getAllUsers fetch all users from the database]
   * @return    {[Object]}      [return all the user in database]
   */
  getAllUsers : function() {
    return User.find({}).then(function(response) {
              return response;
            });
  },

  /**
   * [createRole create a role]
   * @param     {[Srting]}     title [contain role ]
   * @return    {[Object]}           [return the role]
   */
  createRole  : function(title) {
    return Role.create({ title : title }, function(role) {
              return role;
            })
  },

  /**
   * [getAllRoles fetch all role in database]
   * @return    {[Object]}    [return all role in database]
   */
  getAllRoles : function() {
    return Role.find({}).then(function(response) {
                    return response;
                  })
  },

  /**
   * [createDocument check if role exist,
   *                 create a role if it does not exist,
   *                 create a document with role.
   *                 ]
   * @param     {[String]}      title   [contain document title]
   * @param     {[String]}      role    [contain role]
   * @param     {[String]}      content [contain document content]
   * @return    {[Object]}              [return the document full info with _id and _v]
   */
  createDocument  : function(title, role, content) {
    var date         = new Date(),
        currentDate  = date.getDate(),
        currentMonth = date.getMonth(),
        currentYear  = date.getFullYear(),
        dateCreated  = currentDate + '/' + currentMonth + '/' + currentYear;

      return Role.findOne({ title: role }).then(function(role) {
                if (!role || role === {} || role === []) {
                  return Role.create({ title: role });
                } 
                else {
                  return role;
                }
              }).then(function(role) {
                return Document.create({
                  title        : title,
                  permission   : role,
                  description  : content,
                  dateCreated  : dateCreated,
                  lastModified : dateCreated
                }).then(function(doc) {
                  return doc;
                });
              });
  },

  /**
   * [getAllDocuments fetch all documents from the database]
   * @return    {[Object]}      [return all the document in database]
   */
  getAllDocuments : function(limit) {
    return Document.find({}).limit(limit)
            .then(function(response) {
              return response;
            });
  },

  /**
   * [getAllDocumentsByRole find by role,
   *                         then find by role ID,
   *                         sort by dateCreated in descending order,
   *                         limit to the number of limit specified,
   *                         populate the permission field with user Info]
   * @param     {[String]}      role  [contain role]
   * @param     {[String]}      limit [contain limit specified]
   * @return    {[Object]}              [return documents by the number of limit]
   */
  getAllDocumentsByRole : function(role, limit) {
    return Role.find({ title : role }).then(function(role) {
              return Document.find({ permission : role[0]._id })
                      .sort({ dateCreated : -1 })
                      .limit(limit)
                      .populate('permission')
                      .then(function(response) {
                        return response;
                      });
            });
  },

  /**
   * [getAllDocumentsByDate find by dateCreated,
   *                        sort by dateCreated in descending order,
   *                        limit to the number of limit specified,
   *                        populate the permission field with user Info]
   * @param     {[String]}        date  [contain date specified]
   * @param     {[String]}        limit [ontain limit specified]
   * @return    {[Object]}              [return documents by date specified]
   */
  getAllDocumentsByDate : function(date, limit) {
    return Document.find({ dateCreated : date })
            .sort({ dateCreated : -1 })
            .limit(limit)
            .populate('permission')
            .then(function(response) {
              return response;
            });
  }
};