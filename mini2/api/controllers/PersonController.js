/**
 * PersonController
 *
 * @description :: Server-side logic for managing People
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	homepage1: function(req, res) {

 		if (req.method == "POST") {

 			Person.create(req.body.Person).exec( function(err, model) {

 				return res.send("Successfully Created!");

 			});
 		}

 		else {

 			return res.view('person/create');
 		}
 	},
 	json: function(req, res) {

 		Person.find().exec( function(err, persons) {

 			return res.json(persons);

 		});
 	},
 	 index: function(req, res) {

 		Person.find().exec( function(err, persons) {

 			return res.view('person/index', {'persons': persons});

 		});
 	},
 	view: function (req, res) {

 		Person.findOne(req.params.id).exec( function(err, model) {

 			if (model != null)
 				return res.view('person/view', {'person': model});
 			else
 				return res.send("No such person");

 		});

 	},
 	 delete: function(req, res) {

 		Person.findOne(req.params.id).exec( function(err, model) {

 			if (model != null) {
 				model.destroy();
 				return res.send("Person Deleted");
 			} else {		
 				return res.send("Person not found");
 			}

 		});

 	},
 	 update: function(req, res) {

 		if (req.method == "GET") {

 			Person.findOne(req.params.id).exec( function(err, model) {

 				if (model == null) 
 					return res.send("No such person!");
 				else
 					return res.view('person/update', {'person': model});

 			});

 		} else {

 			Person.findOne(req.params.id).exec( function(err, model) {

 				model.name = req.body.Person.name;
 				model.age = req.body.Person.age;

 				model.save();
 				return res.send("Record updated");

 			});

 		}

 	},
 	search: function (req, res) {

 		Person.find()
 			.where({name: {contains: req.query.name}})
 			.where({age: {contains: req.query.age}})
 			.sort('name')
 			.exec( function (err, persons) {

 				return res.view('person/index', {'persons': persons});

 			})

 	},
 	 paginate: function (req, res) {

 		Person.find().paginate({page: req.query.page, limit: 2})
 			.exec( function(err, persons) {

      		Person.count().exec( function(err, value) {
      
        		var pages = Math.ceil(value / 2 );

        		return res.view( 'person/paginate', 
        			{'persons': persons, 'count':pages, 'current':req.query.page});
      
      		});

    	});

 	},
 	createUniqueAge: function(req, res) {

 		if (req.method == "POST") {

 			Person.count().where({age:req.body.Person.age}).exec( function(err, value) {

 				if (value != 0)

 					return res.send("Age taken");

 				else 

	 				Person.create(req.body.Person).exec( function(err, model) {

 						return res.send("Successfully Created!");

 					});
	 		});
 		}

 		else {

 			return res.view('person/createUniqueAge');
 		}
 	},
};

