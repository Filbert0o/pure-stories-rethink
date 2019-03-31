// import mongoose from 'mongoose';
// const Schema = mongoose.Schema;

// // Create Schema
// const AuthorSchema = new Schema({
//   name: {
//     type: String,
//     required: true
//   },
//   gender: {
//     type: String
//   },
//   birthdate: {
//     type: Date
//   },
//   description: {
//     type: String
//   },
//   avatar: {
//     type: String
//   }
// }, {timestamps: true});

// export default mongoose.model('authors', AuthorSchema);

"use strict";
var rethinkdb = require('rethinkdb');
var db = require('./db');
var async = require('async');

class authors {
  addNewAuthors(authorData, callback) {
    async.waterfall([
      function (callback) {
        var authorObject = new db();
        authorObject.connectToDb(function (err, connection) {
          if (err) {
            return callback(true, "Error connecting to database");
          }
          callback(null, connection);
        });
      },
      function (connection, callback) {
        rethinkdb.table('author').insert({
          "name": authorData.name,
          "gender": authorData.gender,
          "birthdate": authorData.birthdate,
          "description": authorData.description,
          "avatar": authorData.avatar
        }).run(connection, function (err, result) {
          connection.close();
          if (err) {
            return callback(true, "Error happens while adding new authors");
          }
          callback(null, result);
        });
      }
    ], function (err, data) {
      callback(err === null ? false : true, data);
    });
  }

  addAuthorData(authorData, callback) {
    async.waterfall([
      function (callback) {
        var authorObject = new db();
        authorObject.connectToDb(function (err, connection) {
          if (err) {
            return callback(true, "Error connecting to database");
          }
          callback(null, connection);
        });
      },
      function (connection, callback) {
        rethinkdb.table('author').get(authorData.id).run(connection, function (err, result) {
          if (err) {
            return callback(true, "Error fetching authors to database");
          }
          // for (var authorCounter = 0; authorCounter < result.authors.length; authorCounter++) {
          //   if (result.authors[authorCounter].option === authorData.option) {
          //     result.authors[authorCounter].vote += 1;
          //     break;
          //   }
          // }
          rethinkdb.table('author').get(authorData.id).update(result).run(connection, function (err, result) {
            connection.close();
            if (err) {
              return callback(true, "Error updating the vote");
            }
            callback(null, result);
          });
        });
      }
    ], function (err, data) {
      callback(err === null ? false : true, data);
    });
  }

  getAllAuthors(callback) {
    async.waterfall([
      function (callback) {
        var authorObject = new db();
        authorObject.connectToDb(function (err, connection) {
          if (err) {
            return callback(true, "Error connecting to database");
          }
          callback(null, connection);
        });
      },
      function (connection, callback) {
        rethinkdb.table('author').run(connection, function (err, cursor) {
          connection.close();
          if (err) {
            return callback(true, "Error fetching authors to database");
          }
          cursor.toArray(function (err, result) {
            if (err) {
              return callback(true, "Error reading cursor");
            }
            callback(null, result)
          });
        });
      }
    ], function (err, data) {
      callback(err === null ? false : true, data);
    });
  }
}

module.exports = authors;