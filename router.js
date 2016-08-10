/*
    Router for the server application. Append routes to localhost:3000.
    Path '/professors' => localhost:3000/professors
 */

module.exports = (function() {
    'use strict';

    var express = require('express');
    var bodyParser = require('body-parser')
    var schedule_service = require('./schedule_service')
    var service_instance = new schedule_service();
    var router = require('express').Router();

    router.use(bodyParser.json());

    router.get('/professors', function(req, res){
        service_instance.find_professors()
        .then(function(result) {
            if(result == null){
                res.status(404).send(result)
            }
            else{
                res.status(200).send(result)
            }
        })
        .catch(function(error){
            console.error(error)
        })
    });

    router.get('/building', function(req, res){
        service_instance.find_classrooms()
        .then(function(result){
            if(result == null){
                res.status(404).send(result)
            }
            else{
                res.status(200).send(result)
            }
        })
        .catch(function(error){
            console.error(error)
        })
    });

    router.get('/building/building', function(req, res){
        var location = req.query.location;
        var loc = {location};
        service_instance.find_classes_at_classroom(loc)
        .then(function(result){
            if(result == null){
                res.status(404).send(result)
            }
            else{
                res.status(200).send(result)
            }
        })
        .catch(function(error){
            console.error(error)
        })
    });

    // Get the classes of a professor
    // professors/professor?name=" + instructor
    router.get('/professors/professor', function(req, res){
        var name = req.query.name;
        var instructor = {"instructor": name};
        service_instance.find_classes_from_instructor(instructor)
        .then(function(result) {
            if (result == null) {
                res.status(404).send(result)
            }
            else {
                res.status(200).send(result)
            }
        })
        .catch(function(error){
            console.error(error);
        })
    });

    // departments/department?departmentCode=" + departmentCode
    router.get('/departments/department', function(req, res){
      var param = req.query.departmentCode;
      var department = {"departmentCode" : param};
      service_instance.find_classes_from_department(department)
      .then(function(result){
        if(result == null){
          res.status(404).send(result)
        }
        else{
          res.status(200).send(result)
        }
      })
      .catch(function(error){
        console.error(error);
      })
    });

    router.get('/departments', function(req, res){
      service_instance.find_distinct_departments()
      .then(function(result){
        if(result == null){
          res.status(404).send(result);
        }
        else{
          res.status(200).send(result);
        }
      })
      .catch(function(error){
        console.error(error);
      })
    });

    router.get('/buildings/building', function(req, res){
        var param = req.query.building;
        service_instance.find_classrooms_at_building(param)
        .then(function(result){
            if(result == null){
                res.status(404).send(result);
            }
            else{
                res.status(200).send(result);
            }
        })
        .catch(function(error){
            console.error(error);
        })
    });

    router.get('/buildings', function(req, res){
        service_instance.find_distinct_buildings()
        .then(function(result){
            if(result == null){
                res.status(404).send(result);
            }
            else{
                res.status(200).send(result);
            }
        })
        .catch(function(error){
            console.error(error);
        })
    });

    return router;
})();
