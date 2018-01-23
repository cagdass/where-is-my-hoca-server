var mongo = require('mongodb').MongoClient;
var default_url = 'mongodb://cgds.me:27017/offerings';
var default_collection = 'semester20172';
var default_classrooms = 'semester20172classrooms';
var default_electives = 'semester20172electives';

var mongoPromise = mongo.connect(default_url)
.catch(function(error){
  console.error(error);
  throw error
});

var mongo_service = {
  connect: function(url){
    url = url || default_url;
    return mongo.connect(url)
    .catch(function(error){
      console.error(error);
      throw error
    })
  },
  getCollection: function(collection_name) {
    return mongoPromise
    .then(function(db){
        var collection = db.collection(default_collection);
        return collection;
    });
  },
  getClassroomCollection: function(collection_name) {
      return mongoPromise
      .then(function(db) {
          var collection = db.collection(default_classrooms);
          return collection;
    });
  },
  getElectiveCollection: function(collection_name) {
      return mongoPromise
      .then(function(db) {
          var collection = db.collection(default_electives);
          return collection;
      })
  }
};

module.exports = mongo_service;
