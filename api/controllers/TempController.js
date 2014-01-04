/**
 * TempController
 *
 * @module		:: Controller
 * @description	:: Contains logic for handling requests.
 */

module.exports = {

  /* e.g.
  sayHello: function (req, res) {
    res.send('hello world!');
  }
  */
  save : function(req, res){
  	var bcrypt = require('bcrypt');
  	var salt = bcrypt.genSaltSync(10);
  	
  	var email = req.param("email");
  	var firstname = req.param("firstname"); 
  	var lastname = req.param("lastname");
  	var password = bcrypt.hashSync(req.param("password"), salt);
  	var password2 = req.param("password2");
  	var birthdate = req.param("birthdate");
  	var mobile = req.param("mobile");
  	var key = bcrypt.hashSync(email, salt);
  	
  	Temp.create({email : email, password : password, firstname : firstname, lastname:lastname, birthdate:birthdate, mobile:mobile, key:key}).done(function(err, temp){
  		if(err){
  			console.log(err);
  		}else{
  			
  			var nodemailer = require("nodemailer");

  			var smtpTransport = nodemailer.createTransport("SMTP",{
  			   service: "Gmail",  // sets automatically host, port and connection security settings
  			   auth: {
  			       user: "jethdeguzman@gmail.com",
  			       pass: "jgnmltbkxryetsed"
  			   }
  			});

  			smtpTransport.sendMail({  //email options
  			   from: "Rescue Makati <jethdeguzman@gmail.com>", // sender address.  Must be the same as authenticated user if using Gmail.
  			   to: email, // receiver
  			   subject: "Rescue Makati - Verify your email", // subject
  			   html: "<p>Thank you for filling up our registration form.</p><p>To successfully register on RescueMakati. Please click the link below.</p><a href='http://rescuemakati.cloudapp.net/temp/verify?email="+email+"&key="+key+"'>Verify</a>" // body
  			}, function(error, response){  //callback
  			   if(error){
  			       console.log(error);
  			   }else{

  			       console.log("Message sent: " + response.message);
  			   		res.send(true);
  			   }
  			   
  			   smtpTransport.close(); // shut down the connection pool, no more messages.  Comment this line out to continue sending emails.
  			});
  	
  		}
  	

  	});
  },
  verify : function(req, res){
  	var bcrypt = require('bcrypt');
  	var salt = bcrypt.genSaltSync(10);
  	var email = req.param("email");
  	var key = req.param("key");

  	Temp.findOne({email : email}).done(function(err, temp){
  		if(err){
  			console.log(err);
  		}else{
  			if(temp){

  				// res.send({key : key, tempkey : temp.key});
  				if(key == temp.key){
  				
  					User.create({status : "active", email : temp.email, password : temp.password, firstname : temp.firstname, lastname : temp.lastname, birthdate : temp.birthdate, mobile : temp.mobile}).done(function(err, user){
  						if(err){
  							console.log(err);
  						}
	  						return;	
	  					});
  					
					temp.destroy(function(err){
						if(err){
							console.log(err);
						}
						return;
					});
  				res.view({status:true});
  				}else{
  					res.view({status:false});
  				}	
  					
  			
  			}else{
  				res.view({status:false});
  			}
  		}
  	});
  },
  resend : function(req, res){
  	var email = req.param("email");
  	Temp.findOne({email : email}).done(function(err, temp){
  		if (err){
  			console.log(err);
  		}else{
  			if(temp){
  				
  				var nodemailer = require("nodemailer");

  				var smtpTransport = nodemailer.createTransport("SMTP",{
  				   service: "Gmail",  // sets automatically host, port and connection security settings
  				   auth: {
  				       user: "jethdeguzman@gmail.com",
  				       pass: "jgnmltbkxryetsed"
  				   }
  				});

  				smtpTransport.sendMail({  //email options
  				   from: "Rescue Makati <jethdeguzman@gmail.com>", // sender address.  Must be the same as authenticated user if using Gmail.
  				   to: email, // receiver
  				   subject: "Rescue Makati - Verify your email", // subject
  				   html: "<p>Thank you for filling up our registration form.</p><p>To successfully register on RescueMakati. Please click the link below.</p><a href='http://rescuemakati.cloudapp.net/temp/verify?email="+email+"&key="+temp.key+"'>Verify</a>" // body
  				}, function(error, response){  //callback
  				   if(error){
  				       console.log(error);
  				   }else{

  				       console.log("Message sent: " + response.message);
  				   		res.send(true);
  				   }
  				   
  				   smtpTransport.close(); // shut down the connection pool, no more messages.  Comment this line out to continue sending emails.
  				});
  			}
  		}	
  	});
  },
  check : function(req, res){
  	var email = req.param("email");
  	User.findOne({email:email}).done(function(err, user){
  		if(err){
  			console.log(err);
  		}else{
  			var status;
  			if(user){
  				status = "user";
  				res.json({status : status});
  			}else{
  				Temp.findOne({email : email}).done(function(err, temp){
  					if(err){
  						console.log(err);
  					}else{
  						if(temp){
  							status = "temp";
  						}else{
  							status = "free";
  						}
  						res.json({status : status});
  					}
  					
  				});
  			}
  			
  		}
  	});
  }

};
