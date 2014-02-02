/**
 * GalleryController
 *
 * @module		:: Controller
 * @description	:: Contains logic for handling requests.
 */

module.exports = {

  all : function(req, res){
  	
  	var type = req.param('type');
  	var to = req.param('to');
  	var from = req.param('from');

  	if(type == "all"){
  		if((to == undefined) || (from == undefined)){
  			res.send("this");
  		}
  		else{
  			res.send("not this");
  		}
  	}
  }
  

};
