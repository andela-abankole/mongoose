// get mongoose user, role and document model, mongoose lib and controller file
var mongoose   = require('mongoose'),
    docManager = require('./documentManager.js'),
    Role       = require('./models/role.model'),
    User       = require('./models/user.model'),
    Document   = require('./models/document.model');

describe('Document Management System', function() {
  describe('Mongoose', function() {
    
    afterEach(function() {
      User.remove({}, function(err) {}).then(function() {
        Document.remove({}, function(err) {}).then(function() {
          Role.remove({}, function(err) {}).then(function() {
          });
        });
      });
    });

    describe('Case for User', function() {

        var first    = 'Essie', 
            last     = 'Foster',
            password = 'U)bo5uwgSp',
            email    = 'ufezen@ragok.com',
            username = 'naddacvek',
            role     = 'user';

        docManager.createUser(first, last, email, username, password, role).then(function() {
        });

      it('should verify that User is unique', function() {
        User.findOne({ username : 'naddacvek' }).then(function(user) {
          expect(user.length).toEqual(1);
        });
      });

      it('should define a Role for `user`', function() {
        User.findOne({ username : 'naddacvek' }).then(function(user) {
          expect(user.role).toBeDefined();
        });
      });

      it('should create both first and last names for `user`', function() {
        User.findOne({ username : 'naddacvek' }).then(function(user) {
          expect(user.name.last).toEqual('Foster');
          expect(user.name.first).toEqual('Essie');
        });
      });

      it('should return all `users` when `getAllUsers()` is executed', function() {
        docManager.createUser(first, last, email, username, password, role).then(function() {
          docManager.getAllUsers().then(function(users) {
            expect(users).toBeDefined();
            expect(users).toBeGreaterThan(1);
          });
        });
      });
    });

    describe('Case for Role', function() {

      beforeEach(function() {
        Role.remove({}, function() {}).then(function() {
          docManager.createRole('Moderator').then(function() {
          }).then(function() {
            docManager.createRole('Admin').then(function() {
            });
          });
        });
      });

      it('should verify that Role has a unique title ', function() {
        Role.find({ title : 'Admin' }).then(function(role) {
          expect(role.length).toEqual(1);
        });
      });

      it('should return all `roles` when `getAllRoles()` is executed', function() {
        docManager.getAllRoles().then(function(roles) {
          expect(roles.length).toEqual(2);
        });
      });
    });

    describe('Case for Document', function() {

      beforeEach(function() {
        Document.remove({}, function() {}).then(function() {
          Role.remove({}, function() {}).then(function() {
            docManager.createDocument('Hello World', 'reader', 'this is a little content').then(function() {
              docManager.createDocument('Hello World2', 'reader', 'this is a little content').then(function() {
                docManager.createDocument('Hello World3', 'reader', 'this is a little content').then(function() {
                });
              });
            });
          });
        });
      });

      it('should verify that document has a published date define', function() {
        Document.find().then(function(docs) {
          expect(docs[0].dateCreated).toBeDefined();
        });
      });

      it('should return all `documents`, limit by a specified number, when `getAllDocuments()` is executed', function() {
        docManager.getAllDocuments(2).then(function(docs) {
          expect(docs.length).toEqual(2);
        });
      });

      it('should return all documents in order of published dates, starting from the most recent when `getAllDocuments()` is executed', function() {
        docManager.getAllDocuments().then(function(docs) {
          expect(docs.length).toEqual(3);
          expect(docs[0].dateCreated).toBeDefined();
          expect(docs[1].dateCreated).toBeDefined();
          expect(docs[2].dateCreated).toBeDefined();
        });
      });
    });

    describe('Case for Search', function() {

      beforeEach(function() {
        Document.remove({}, function() {}).then(function() {
          Role.remove({}, function() {}).then(function() {
            docManager.createDocument('Hello World', 'reader', 'this is a little content').then(function() {
              docManager.createDocument('Hello World2', 'reader', 'this is a little content2').then(function() {
              });
            });
          });
        });
      });

      it('should verify all documents, limited by a specified number and ordered by published date, accessed by a specified role, and returned when `getAllDocumentsByRole()` is executed', function() {
        docManager.getAllDocumentsByRole('reader', 2).then(function(docs) {
          expect(docs).toBeDefined();
          expect(docs.length).toEqual(2);
          expect(docs[0].description).toEqual('this is a little content');
          expect(docs[1].description).toEqual('this is a little content2');
          expect(docs[0].permission.title).toEqual('reader');
          expect(docs[1].permission.title).toEqual('reader');
        });
      });

      it('should verify all documents, limited by a specified number, that were published on a certain date, and returned when `getAllDocumentsByDate()` is executed', function() {
        var date         = new Date(),
            currentDate  = date.getDate(),
            currentMonth = date.getMonth(),
            currentYear  = date.getFullYear(),
            dateCreated  = currentDate + '/' + currentMonth + '/' + currentYear;

        docManager.getAllDocumentsByDate(dateCreated, 2).then(function(docs) {
            expect(docs).toBeDefined();
            expect(docs.length).toEqual(2);
            expect(docs[0].description).toEqual('this is a little content');
            expect(docs[1].description).toEqual('this is a little content2');
            expect(docs[0].permission.title).toEqual('reader');
            expect(docs[1].permission.title).toEqual('reader');
          });
      });
    });
  });
});