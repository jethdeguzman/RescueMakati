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
  	var key = bcrypt.hashSync("B4c0/\/", salt);
  	var email = req.param("email");
  	var firstname = req.param("firstname") 
  	var lastname = req.param("lasttname") ;
  	var birthdate = req.param("birthdate");
  	var mobile = req.param("mobile");
  	Temp.create({email : email, firstname : firstname, lastname:lastname, birthdate:birthdate, mobile:mobile, key:key}).done(function(err, temp){
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
  }

};
