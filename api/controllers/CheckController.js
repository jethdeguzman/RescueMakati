/**
 * CheckController
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
  	res.header("Access-Control-Allow-Origin", "*");
  	res.json({status : 'ok'});
  }
  

};
