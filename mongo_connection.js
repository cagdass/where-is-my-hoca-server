var mongo = require('mongodb').MongoClient;
var default_url = 'mongodb://127.0.0.1:27017/offerings';
var default_collection = 'semester20161';
var default_classrooms = 'semester20161classrooms';
var default_electives = 'semester20161electives';

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
  getCollection: function(collection_name = default_collection) {
    return mongoPromise
    .then(function(db){
        var collection = db.collection(collection_name);
        return collection;
    });
  },
  getClassroomCollection: function(collection_name = default_classrooms) {
      return mongoPromise
      .then(function(db) {
          var collection = db.collection(collection_name);
          return collection;
    });
  },
  getElectiveCollection: function(collection_name = default_electives) {
      return mongoPromise
      .then(function(db) {
          var collection = db.collection(collection_name);
          return collection;
      })
  }
};

module.exports = mongo_service;
