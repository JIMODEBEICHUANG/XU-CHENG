module.exports = {
	homepage: function(req, res) {

 		Event.find()
    .where({highlighted: {contains:"checked"}})
    .exec( function(err, events) {

 			return res.view('event/homepage', {'events': events});

 		});
 	},
  create: function(req, res) {

    if (req.method == "POST") {

      Event.create(req.body.Event).exec( function(err, model) {

        return res.send("Successfully Created!");

      });
    }
    else {
      return res.view('event/create');
    }
  },
  json: function(req, res) {
    Event.find().exec( function(err, models) {
      return res.json(models);
    });
  },
 	admin: function(req, res) {
 		Event.find().exec( function(err, events) {
 			return res.view('event/admin', {'events': events});
 		});
 	},
 	index: function(req, res) {
 		Event.find().exec( function(err, events) {
 			return res.view('event/index', {'events': events});
 		});
 	},
 	delete: function(req, res) {
 		Event.findOne(req.params.id).exec( function(err, model) {
 			if (model != null) {
 				model.destroy();
 				return res.send("Event Deleted");
 			} else {		
 				return res.send("Event not found");
 			}

 		});

 	},
 	update: function(req, res) {
 		if (req.method == "GET") {
 			Event.findOne(req.params.id).exec( function(err, model) {
 				if (model == null) 
 					return res.send("No such event!");
 				else
 					return res.view('event/update', {'event': model});
 			});

 		} else {
 			Event.findOne(req.params.id).exec( function(err, model) {
 				model.name = req.body.Event.name;
 				model.shortDes = req.body.Event.shortDes;
 				model.fullDes = req.body.Event.fullDes;
 				model.image = req.body.Event.image;
 				model.venue = req.body.Event.venue;
 				model.organizer = req.body.Event.organizer;
 				model.quota = req.body.Event.quota;
 				model.date = req.body.Event.date;
 				model.startTime = req.body.Event.startTime;
 				model.endTime = req.body.Event.endTime;

        if (req.body.Event.highlighted == null) 
          model.highlighted = "false";
        else
          model.highlighted = req.body.Event.highlighted;
 				
        model.save();
 				return res.send("Record updated");
 			});
 		}
 	},
 	eventdetail: function (req, res) {
 		Event.findOne(req.params.id).exec( function(err, model) {
 			if (model != null)
 				return res.view('event/eventdetail', {'event': model});
 		});
 	},
 	search: function (req, res) {
 		Event.find()
 			.where({name: {contains: req.query.name}})
 			.where({organizer: {contains: req.query.organizer}})
 			.where({date: {contains: req.query.date}})
 			.where({venue: {contains: req.query.venue}})
 			.paginate({page: req.query.page, limit: 2})
 			.sort('name')
 			.exec( function (err, models) {
 		Event.count()
        	.where({name: {contains: req.query.name}})
      		.where({organizer: {contains: req.query.organizer}})
      		.where({date: {contains: req.query.date}})
      		.where({venue: {contains: req.query.venue}})
      		.exec( function(err, value) {
 				      pages = Math.ceil(value / 2 );
            	var qs="&name="+req.query.name+"&organizer="+req.query.organizer+"&date="+req.query.date+"&venue="+req.query.venue;

        		return res.view( 'event/search', 
        			{'events': models, 'count':pages, 'current':req.query.page,'qs':qs,'page':"search"});
      
      		});
 		})

 	},
 	 paginate: function (req, res) {

 		Event.find().paginate({page: req.query.page, limit: 2})
 			.exec( function(err, events) {

      		Event.count().exec( function(err, value) {
      
        		var pages = Math.ceil(value / 2 );
            	var qs="?";

        		return res.view( 'event/search', 
        			{'events': events, 'count':pages, 'current':req.query.page,'qs':qs,'page':"paginate"});
      
      		});

    	});

 	},

};