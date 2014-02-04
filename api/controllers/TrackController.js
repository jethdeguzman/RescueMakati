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
    var socket = req.socket;
    var io = sails.io;
    io.set('transports', ['xhr-polling']);
    res.header("Access-Control-Allow-Origin", "*");
    var unitid = req.param('id');
    var type = req.param('type');
    var platenum = req.param('platenum');
    var lat = req.param('lat');
    var lng = req.param('lng');
    var address = req.param('address');

    var date = new Date();
    var hour = date.getHours();
    var min = date.getMinutes();
    var sec = date.getSeconds();
    if(min<10){
       min = '0'+min;
      
    }
    if(sec<10){
       sec = '0'+sec;
    }
    var timenow = hour + ":" + min + ":" + sec;
    var year = date.getFullYear();
    var month = date.getMonth()+1;
    var day = date.getDate();
    if(month < 10 ){
      
       month = '0'+month;
    }
    if(day < 10){
       day = '0'+day;
    }
    var datenow = year + "-" + month + "-" + day;
    var datetime = datenow + " " + timenow;
    var datefinal = new Date(datenow).getTime();   

    Track.create({unitid : unitid, type : type, platenum : platenum, lat : lat, lng : lng, address : address, date : datefinal}).done(function(err, track){
    	if(err){
    		console.log(err);
    	}
    });
  },
  view : function(req, res){
    var unitid = req.param("unitid");
  }

};
