/**
 * UnitController
 *
 * @module		:: Controller
 * @description	:: Contains logic for handling requests.
 */

module.exports = {
  login : function(req, res){
  	res.header("Access-Control-Allow-Origin", "*");
  	var type = req.param("type");
  	var platenum = req.param("platenum");

  	Unit.findOne({type : type, platenum : platenum}).done(function(err, unit){
  		if(err){
  			console.log(err);
  		}else{
  			res.json({id : unit.id, type : unit.type, platenum : unit.platenum});
  		}
  	});
  },
  add : function(req, res){
  	var type = req.param('type');
  	var platenum = req.param('platenum');
  	var info = req.param('info');

  	Unit.create({type : type, platenum : platenum, info : info}).done(function(err, unit){
  		if(err){
  			console.log(err);
  		}else{
  			res.json({result : "success"});
  		}
  	});
  res.json({result : "success"});
  },
  delete : function(req, res){
  	var unit = req.param('unit');
  	Unit.findOne({_id : unit}).done(function(err, unit){
  		if(err){
  			console.log(err);
  		}else{
  			unit.destroy(function(err){
  				if(err){
  					console.log(err);
  				}
  			});

  		}
  		res.json({status:"success"});
  	});
  },
  photo : function(req, res){
  	res.header("Access-Control-Allow-Origin", "*");
  	var file = req.files.
  	Gallery.create({photo : file}).done(function(err, gallery){

  	});
  }	
  

};
