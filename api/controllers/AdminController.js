/**
 * AdminController
 *
 * @module		:: Controller
 * @description	:: Contains logic for handling requests.
 */

module.exports = {

	index : function(req, res){
		if (req.session.username){
			res.view();
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
	flush : function(req, res){
		req.session.destroy(function(err){
			if(err){
				console.log(err);
			}
		});
		res.send('ok');
	}
};
