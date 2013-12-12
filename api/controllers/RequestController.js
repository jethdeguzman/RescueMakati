/**
 * RequestController
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
  index : function(req, res){
  	var socket = req.socket;
  	var io = sails.io;
  	var data = req.param('data');


  	// save to model

  	io.sockets.emit('alert', data);
  	res.json({status : 'successfully sent'});
  	// res.send('request');
  }

};
