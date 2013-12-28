/**
 * AdminController
 *
 * @module		:: Controller
 * @description	:: Contains logic for handling requests.
 */

module.exports = {
	//incoming alerts
	index : function(req, res){
		// if (req.session.username){
			res.view();
		// }else{
		// 	res.redirect('/admin/login');
		// }
	},
	record : function(req, res){
		res.view();
	},
	login : function(req, res){
		res.view();
	},
	session : function(req, res){
		req.session.username = "jethro";
		res.send("ok");
	},
	flush : function(req, res){
		req.session.destroy(function(err){
			if(err){
				console.log(err);
			}
		});
		res.send('ok');
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
	}
};
