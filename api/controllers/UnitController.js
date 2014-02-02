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
  	var fs = require('fs');
  	var path = require('path');
  	var bcrypt = require('bcrypt');
  	var salt = bcrypt.genSaltSync(10);

  	res.header("Access-Control-Allow-Origin", "*");
  	var file = req.files.file;
  	console.log(file);
	appDir = path.dirname(require.main.filename);

  	fs.readFile(file.path, function (err, data) {
  		if(err){
  			console.log(err);
  		}
  	  var filename = file.name;
  	  if(filename.contains(".jpg")){
  	  	filename = filename;
  	  }else{
  	  	 filename = filename+".jpg";
  	  }
  	
  	  var newPath = appDir + "/assets/images/gallery/"+filename;
  	  fs.writeFile(newPath, data, function (err) {
  	  	newPath = "/images/gallery/"+filename;
  	    Gallery.create({photo : newPath}).done(function(err, gallery){
  	    	if(err){
  	    		console.log(err);
  	    	}
  	    });
  	  });
  	});
  },
  file : function(req, res){
  	var bcrypt = require('bcrypt');
  	var salt = bcrypt.genSaltSync(5);

  	var fs = require('fs');
  	var filename = bcrypt.hashSync("file", salt);	
  	fs.writeFile("/home/jeth/Desktop/test/"+filename+".txt", "helloworld", function(err){
  		if(err){
  			console.log(err);
  		}
  	});
	// var path = require('path'),
	//     appDir = path.dirname(require.main.filename);
	// res.send(appDir);
  }	
  

};
