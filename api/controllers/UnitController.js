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
        if(unit){
          res.json({status : "ok", id : unit.id, type : unit.type, platenum : unit.platenum});
        }else{
          res.json({status : "none"});
        }

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
    var id = req.param('id');
    var type = req.param('type');
    var platenum = req.param('platenum');
    var lat = req.param ('lat');
    var lng = req.param('lng');
    var address = req.param('address');

    var date = new Date();
    var hour = date.getHours();
    var min = date.getMinutes();
    var sec = date.getSeconds();
    if(min<10){
       min = '0'+min;
      
    }
    if(sec<10){
       sec = '0'+sec;
    }
    var timenow = hour + ":" + min + ":" + sec;
    var year = date.getFullYear();
    var month = date.getMonth()+1;
    var day = date.getDate();
    if(month < 10 ){
      
       month = '0'+month;
    }
    if(day < 10){
       day = '0'+day;
    }
    var datenow = year + "-" + month + "-" + day;
    var datetime = datenow + " " + timenow;
    var datefinal = new Date(datenow).getTime();    

	  appDir = path.dirname(require.main.filename);
  	fs.readFile(file.path, function (err, data) {
  		if(err){
  			console.log(err);
  		}
  	  var filename = file.name+".jpg";
  	  var newPath = appDir + "/assets/images/gallery/"+filename;
  	  fs.writeFile(newPath, data, function (err) {
  	  	newPath = "/images/gallery/"+filename;
  	    Gallery.create({unitid : id, type : type, platenum : platenum, lat : lat, lng : lng, address : address, photo : newPath, date : datefinal}).done(function(err, gallery){
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
