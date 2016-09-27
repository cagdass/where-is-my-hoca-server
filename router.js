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
        var ip = req.headers['x-forwarded-for'] ||
            req.connection.remoteAddress ||
            req.socket.remoteAddress ||
            req.connection.socket.remoteAddress;
        console.log(`Finding all professors. Request from ${ip} Time ${Date()}`);
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
        var ip = req.headers['x-forwarded-for'] ||
            req.connection.remoteAddress ||
            req.socket.remoteAddress ||
            req.connection.socket.remoteAddress;
        console.log(`Finding all classrooms. Request from ${ip} Time ${Date()}`);
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

    // Get the classes of a professor
    // professors/professor?name=" + instructor
    router.get('/professors/professor', function(req, res){
        var name = req.query.name;
        var instructor = {"instructor": name};
        var ip = req.headers['x-forwarded-for'] ||
            req.connection.remoteAddress ||
            req.socket.remoteAddress ||
            req.connection.socket.remoteAddress;
        console.log(`Finding professor with name ${name}. Request from ${ip} Time ${Date()}`);
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
        var ip = req.headers['x-forwarded-for'] ||
            req.connection.remoteAddress ||
            req.socket.remoteAddress ||
            req.connection.socket.remoteAddress;
        console.log(`Finding department ${param}. Request from ${ip} Time ${Date()}`);
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

    router.post('/electives', function(req, res){
        var ip = req.headers['x-forwarded-for'] ||
            req.connection.remoteAddress ||
            req.socket.remoteAddress ||
            req.connection.socket.remoteAddress;

        var departments = req.body.departments;
        var hours = req.body.hours;

        service_instance.find_electives(departments, hours)
        .then(function(result){
            if(result == null) {
                res.status(404).send(result);
            }
            else {
                res.status(200).send(result);
            }
        })
        .catch(function(error){
            console.error(error);
        });

        console.log(`Finding elective classes, departments: ${departments}, hours: ${hours}. Request from ${ip} Time ${Date()}`);
    });

    router.post('/empty_classrooms', function(req, res){
        var ip = req.headers['x-forwarded-for'] ||
            req.connection.remoteAddress ||
            req.socket.remoteAddress ||
            req.connection.socket.remoteAddress;

        var classroom = req.body.classroom;
        var hours = req.body.hours;

        console.log(`Finding empty classrooms, regex: ${classroom}, hours: ${hours}. Request from ${ip} Time ${Date()}`);

        service_instance.find_empty_classrooms(classroom, hours)
        .then(function(result){
            if(result == null) {
                res.status(404).send(result);
            }
            else {
                res.status(200).send(result);
            }
        })
        .catch(function(error){
            console.error(error);
        });
    });

    router.get('/classrooms', function(req, res){
        var ip = req.headers['x-forwarded-for'] ||
            req.connection.remoteAddress ||
            req.socket.remoteAddress ||
            req.connection.socket.remoteAddress;
        console.log(`Finding all classrooms. Request from ${ip} Time ${Date()}`);
       service_instance.find_distinct_classrooms()
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

    router.get('/classrooms/classroom', function(req, res){
        var param = req.query.classroom;
        var ip = req.headers['x-forwarded-for'] ||
            req.connection.remoteAddress ||
            req.socket.remoteAddress ||
            req.connection.socket.remoteAddress;
        console.log(`Finding classroom ${param}. Request from ${ip} Time ${Date()}`);
        service_instance.find_classes_at_classroom(param)
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

    router.get('/departments', function(req, res){
        var ip = req.headers['x-forwarded-for'] ||
            req.connection.remoteAddress ||
            req.socket.remoteAddress ||
            req.connection.socket.remoteAddress;
        console.log(`Finding all departments. Request from ${ip} Time ${Date()}`);
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
        var ip = req.headers['x-forwarded-for'] ||
            req.connection.remoteAddress ||
            req.socket.remoteAddress ||
            req.connection.socket.remoteAddress;
        console.log(`Finding ${param} building. Request from ${ip} Time ${Date()}`);
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
        var ip = req.headers['x-forwarded-for'] ||
            req.connection.remoteAddress ||
            req.socket.remoteAddress ||
            req.connection.socket.remoteAddress;
        console.log(`Finding all buildings. Request from ${ip}. Time ${Date()}`);
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
