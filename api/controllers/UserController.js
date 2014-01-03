/**
 * UserController
 *
 * @module		:: Controller
 * @description	:: Contains logic for handling requests.
 */

module.exports = {

  login : function(req, res){
  	res.header("Access-Control-Allow-Origin", "*");
  	var bcrypt = require('bcrypt');
  	var salt = bcrypt.genSaltSync(10);
  	var email = req.param("email");
  	var password = req.param("password");

  	User.findOne({email : email}).done(function(err, user){
  		if(err){
  			console.log(err);
  		}else{
  			if(user){
  				if(bcrypt.compareSync(password, user.password)){
  					if(user.status == "active"){
  						//acount is active
  						res.json({status : user.status, email : user.email, firstname : user.firstname, lastname : user.lastname, birthdate : user.birthdate, mobile : user.mobile});
  					}else{
  						//account is block
  						res.json({status : "block"});
  						
  					}
  				}else{
  					//wrong pass
  					res.json({status : "wrong-pass"});
  				}

  			}else{
  				//not in user db, check on temp db
  				Temp.findOne({email : email}).done(function(err, temp){
  					if (err){
  						console.log(err);
  					}else{
  						res.json({status : "verify"});
  					}
  				});

  			}
  		}
  	});
  	
  } 
  

};
