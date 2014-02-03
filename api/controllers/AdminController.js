/**
 * AdminController
 *
 * @module		:: Controller
 * @description	:: Contains logic for handling requests.
 */

module.exports = {
	//incoming alerts
	index : function(req, res){
		if (req.session.username){
			res.view();
		}else{
			res.redirect('/admin/login');
		}
	},
	record : function(req, res){
		if (req.session.username){
			res.view();
		}else{
			res.redirect('/admin/login');
		}
		
	},
	track : function(req, res){
		if (req.session.username){
			var type= req.param('type');
			
			if((type == "all")||(type == undefined)){
				Unit.find().done(function(err, unit){
					if(err){
						console.log(err);
					}else{
						res.view({units:unit});
					}
				});
			}else{
				Unit.find({type:type}).done(function(err, unit){
					if(err){
						console.log(err);
					}else{
						res.view({units:unit});
					}
				});
			}
			
		}else{
			res.redirect('/admin/login');
		}
	},
	user : function(req, res){
		if (req.session.username){
			var status = req.param("status");

			if((status == "all")||(status == undefined)){
			
			  User.find().done(function(err, user){
			    if(err){
			      console.log(err);
			    }else{
			      // res.json({users:user});
			      res.view({users:user});
			    }
			  });
			}else{
			  User.find({status : status}).done(function(err, user){
			    if(err){
			      console.log(err);
			    }else{
			     
			      res.view({users:user});

			      
			    }
			  });
			}  
		}else{
			res.redirect('/admin/login');
		}
		
		
	},
	gallery : function(req, res){
		if (req.session.username){
			
			var type = req.param('type');
			var to = req.param('to');
			var from = req.param('from');
			var platenum = req.param('platenum');
			
				if(((to == undefined) || (from == undefined)) && (platenum == undefined)){
					if(type == "all"){
						Gallery.find().sort({_id:-1}).done(function(err, gallery){
							if(err){
							 console.log(err);
							}else{

								res.view({gallery : gallery});
							}
						});
					}else{
						Gallery.find({type : type}).sort({_id:-1}).done(function(err, gallery){
							if(err){
							 console.log(err);
							}else{

								res.view({gallery : gallery});
							}
						});
					}
					
				}
				else{

					if((to !== undefined)&&(from !== undefined)){
					    if(platenum !== undefined){
					    	
					    	Gallery.find().where({type : type, platenum : platenum, date : {$gte : new Date(from).getTime(), $lte : new Date(to).getTime()}}).sort({_id:-1}).done(function(err, gallery){
					    		if(err){
					    			console.log(err);
					    		}else{
					    			res.json({gallery : gallery});
					    		}
					    	});
					    }
					    else{
					    	Gallery.find().where({type : type, date : {$gte : new Date(from).getTime(), $lte : new Date(to).getTime()}}).sort({_id:-1}).done(function(err, gallery){
					    		if(err){
					    			console.log(err);
					    		}else{
					    			res.view({gallery : gallery});
					    		}
					    	});
					    }

				    }else{

				    	if(platenum !== undefined){
				    		Gallery.find().where({type : type, platenum : platenum}).sort({_id:-1}).done(function(err, gallery){
					    		if(err){
					    			console.log(err);
					    		}else{
					    			res.view({gallery : gallery});
					    		}
					    	});
				    	}
				    }
				
				}
			
		}else{
			res.redirect('/admin/login');
		}
	},
	login : function(req, res){
		res.view();
	},
	session : function(req, res){
		req.session.username = "jethro";
		res.send("ok");
	},
	access : function(req, res){
		var bcrypt = require('bcrypt');
		Admin.find().limit(1).done(function(err, admin){
			if(err){

			}else{
				res.json(admin);
			}
		});
	},
	update : function(req, res){
		var bcrypt = require('bcrypt');
		var value = req.param("value");
		var field = req.param("field");
		var salt = bcrypt.genSaltSync(10);
		if(field == "password"){
			value = bcrypt.hashSync(value, salt);
		}
		var obj = {};
		obj[field] = value;
		//52c21893189607ab1cdb7173
		Admin.update({}, obj, function(err, admin){
			if(err){
				console.log(err);
			}else{
				return true;
			}
		});
		res.send(true);	
	},
	flush : function(req, res){
		req.session.destroy(function(err){
			if(err){
				console.log(err);
			}
		});
		res.redirect('/admin');
	},
	insert : function(req, res){
		Admin.create({username:"admin",password: "123456", email:"jethdeguzman@gmail.com" }).done(function(err, admin){
			if(err){
				console.log(err);
			}
		});
		res.send('ok');
	},
	check : function(req, res){
		var bcrypt = require('bcrypt');
		var salt = bcrypt.genSaltSync(10);
		var uname = req.param("uname");
		var pass =  req.param("pass");
		Admin.find().done(function(err, admin){
			if(err){
				console.log(err);
			}else{
				
				if ((admin[0].username == uname) && (bcrypt.compareSync(pass, admin[0].password))){
					req.session.username = 	admin[0].username;
					res.send(true);
				}else{
					res.send(false);
				}
			}
		});
		
		// res.send(pass);

		// admin =  $2a$10$MT8t0fFFInaTHVHHHBCn8u5lsJYfDI0ERrAm95m7.m.XhDh4Oqy3W
		// Admin.find({username : uname, password : pass}).done(function(err, admin){
		// 	if(err){
		// 		console.log(err);
		// 	}else{
		// 		if(admin){
		// 			res.send(admin);
		// 		}
				
		// 	}
		// });
	},
	find : function(req, res){
		Request.find().done(function(err, request){
			if(err){

			}else{
				res.json(request);
			}
		});
		// var bcrypt = require('bcrypt');
		// Admin.findOne({username : "@dMiN"}).done(function(err, admin){
		// 	if(err){

		// 	}else{
		// 		console.log(bcrypt.compareSync("1234s6",admin.password));
		// 	}
		// });

	},
	mail : function(req, res){
		var nodemailer = require("nodemailer");

		var smtpTransport = nodemailer.createTransport("SMTP",{
		   service: "Gmail",  // sets automatically host, port and connection security settings
		   auth: {
		       user: "jethdeguzman@gmail.com",
		       pass: "orhtej14"
		   }
		});

		smtpTransport.sendMail({  //email options
		   from: "Rescue Makati <jethdeguzman@gmail.com>", // sender address.  Must be the same as authenticated user if using Gmail.
		   to: "jethdeguzman@gmail.com", // receiver
		   subject: "email test", // subject
		   // text: "testing" // body
		   html : "<h2></h2>"
		}, function(error, response){  //callback
		   if(error){
		       console.log(error);
		   }else{
		       console.log("Message sent: " + response.message);
		   }
		   
		   smtpTransport.close(); // shut down the connection pool, no more messages.  Comment this line out to continue sending emails.
		});
		res.send('sent');
	},
	map : function(req, res){
		 res.view('request/sort-map');
	},
	count : function(req, res){
		User.native(function(err, coll){
			if(err){
				console.log(err);
			}else{
				coll.each(function(err, each){
					console.log(each);
				});
			}
		});
	}
};
