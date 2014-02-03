/**
 * TrackController
 *
 * @module		:: Controller
 * @description	:: Contains logic for handling requests.
 */

module.exports = {

  /* e.g.
  sayHello: function (req, res) {
    res.send('hello world!');
  }x
  */
  add : function(req, res){
    var unitid = req.param('id');
    var type = req.param('type');
    var platenum = req.pram('platenum');
    var lat = req.param('lat');
    var lng = req.param('lng');
    var address = req.param('address');   
    Track.create({unitid : unitid, type : type, platenum : platenum, lat : lat, lng : lng, address : address}).done(function(err, track){
    	if(err){
    		console.log(err);
    	}
    });
  }

};