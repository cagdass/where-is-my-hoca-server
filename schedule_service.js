var mongo_service = require('./mongo_connection');
var Promise = require("bluebird");
var classroom_collection = 'semester20162classrooms';
var elective_collection = 'semester20162electives';

/*
  Database service for the server application.
 */

function schedule_service(db){
  var service = this;
  var validate = require('validate.js')

  // Find all professors.
  service.find_professors = function(){
    // console.log("Finding all professors.")
    return Promise.try(function(){
      return mongo_service.getCollection()
      .then(function(collection){
        return collection.distinct("instructor");
      })
    })
  };

  // Find classes taught at a given classroom.
  service.find_classes_at_classroom = function(location){
    // console.log("Finding classes taught at " + location);
    return Promise.try(function(){
      return mongo_service.getCollection()
      .then(function(collection){
        return collection.find({"lectures.location": location}).toArray();
      })
    })
  };

  // Find all classrooms.
  service.find_distinct_classrooms = function(){
    // console.log("Finding all classrooms.");
    return Promise.try(function(){
      return mongo_service.getCollection()
      .then(function(collection){
        return collection.distinct("lectures.location");
      })
    })
  };

  // Find all classes from a professor.
  service.find_classes_from_instructor = function(professor){
    var name = professor.instructor.replace("%20", " ");
    // console.log(`Finding classes of ${name}.`);
    return Promise.try(function(){
      return mongo_service.getCollection()
      .then(function(collection){
        // return collection.find({"instructor": {"$regex": "Davenport"}}).toArray();
        return collection.find({"instructor": {"$regex": "^" + name + "$"}}).toArray();
      })
    })
  };

  // Find all classes of a department.
  service.find_classes_from_department = function(departmentCode){
    // console.log(`Finding classes from department ${departmentCode.departmentCode}.`);
    return Promise.try(function(){
      return mongo_service.getCollection()
      .then(function(collection){
        return collection.find(departmentCode).toArray()
      })
    })
  };

  // Find distinct departments
  service.find_distinct_departments = function(){
    // console.log("Finding distinct departments.");
    return Promise.try(function(){
      return mongo_service.getCollection()
      .then(function(collection){
        return collection.distinct("departmentCode")
      })
    })
  };

  // Find all buildings.
  service.find_distinct_buildings = function(){
    // console.log("Finding distinct buildings.");
    return Promise.try(function(){
      return mongo_service.getCollection()
      .then(function(collection){
        return collection.distinct("lectures.building");
      })
    })
  };

  // Find classrooms at a building.
  service.find_classrooms_at_building = function(building){
    // console.log(`Finding classrooms at building ${building}.`);
    return Promise.try(function(){
      return mongo_service.getCollection()
      .then(function(collection){
        return collection.find({"lectures.building": building}, {"lectures.location": 1}).toArray();
      })
    })
  };

  // Find classes that are in this building.
  service.find_classroom = function(classroom){
    // console.log(`Finding building ${JSON.stringify(classroom)}.`);
    return Promise.try(function(){
      return mongo_service.getCollection()
      .then(function(collection){
        return collection.find(classroom).toArray()
      })
    })
  };

  // Find empty classrooms at a given time.
  service.find_empty_classrooms = function(building, hours){
    console.log(building);
    console.log(hours);

    return Promise.try(function(){
      return mongo_service.getClassroomCollection()
      .then(function(classroom_collection){
        return classroom_collection.find({'location': {'$regex': '^' + building}, 'hours': {'$nin': hours}}, {'location': 1, '_id': 0}).toArray()
      })
    })
  };

  // Find elective courses by department and hours
  service.find_electives = function(departments, hours) {
    console.log(departments);
    console.log(hours);

    return Promise.try(function(){
      return mongo_service.getElectiveCollection()
      .then(function(elective_collection){
        if(departments.length > 0) {
          return elective_collection.find({'departmentCode': {'$in': departments}, 'hours': {'$not': {'$elemMatch': {'$nin': hours}}}}).toArray();
        }
        else {
          return elective_collection.find({'hours': {'$not': {'$elemMatch': {'$nin': hours}}}}).toArray();
        }
      })
    })
  }
}

module.exports = schedule_service;
