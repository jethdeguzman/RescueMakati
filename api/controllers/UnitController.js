/**
 * UnitController
 *
 * @module		:: Controller
 * @description	:: Contains logic for handling requests.
 */

 var sid = require('shortid');
 var fs = require('node-fs');
 var mkdirp = require('mkdirp');
 //var io = require('socket.io');
  
 var UPLOAD_PATH = 'assets/images/gallery';
  
 // Setup id generator
 sid.characters('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$@');
 sid.seed(42);
  
 function safeFilename(name) {
   name = name.replace(/ /g, '-');
   name = name.replace(/[^A-Za-z0-9-_\.]/g, '');
   name = name.replace(/\.+/g, '.');
   name = name.replace(/-+/g, '-');
   name = name.replace(/_+/g, '_');
   return name;
 }
  
 function fileMinusExt(fileName) {
   return fileName.split('.').slice(0, -1).join('.');
 }
  
 function fileExtension(fileName) {
   return fileName.split('.').slice(-1);
 }

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
  	var file = req.files.file;
  	

  	id = sid.generate(),
  	     fileName = id + "." + fileExtension(safeFilename(file.name)),
  	     dirPath = UPLOAD_PATH + '/' + id,
  	     filePath = dirPath + '/' + fileName;
  	
  	   try {
  	     mkdirp.sync(dirPath, 0755);
  	   } catch (e) {
  	     console.log(e);
  	   }
  	
  	   fs.readFile(file.path, function (err, data) {
  	     if (err) {
  	       res.json({'error': 'could not read file'});
  	     } else {
  	       fs.writeFile(filePath, data, function (err) {
  	         if (err) {
  	           res.json({'error': 'could not write file to storage'});
  	         } else {
  	           processImage(id, fileName, filePath, function (err, data) {
  	             if (err) {
  	               res.json(err);
  	             } else {
  	               Gallery.create({photo : data}).done(function(err, gallery){
  	               	if(err){
  	               		console.log(err);
  	               	}
  	               });	
  	               // res.json(data);
  	             }
  	           });
  	         }
  	       })
  	     }
  	   });
  }	
  

};
