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
  add : function(req, res){
  	var socket = req.socket;
  	var io = sails.io;
  	var data = req.param('data');
    var parsed = JSON.parse(data);
    var date = new Date();
    var hour = date.getHours();
    var min = date.getMinutes();
    var sec = date.getSeconds();
    var timenow = hour + ":" + min + ":" + sec;
    var year = date.getFullYear();
    var month = date.getMonth()+1;
    var day = date.getDate();
    var datenow = year + "-" + month + "-" + day;
    var datetime = datenow + " " + timenow;  	// save to model
    var json = {status : "new", request : parsed.request, userid : parsed.userid, name : parsed.name, age : parsed.age, mobile : parsed.mobile, lat : parsed.lat, lng : parsed.lng, address : parsed.address, date : datenow, time : timenow};
    Request.create(json).done(function(error){
      if (error){
        return console.log(error);
      }else{
        io.sockets.emit('alert', json);
        io.sockets.emit('addmark', {lat : parsed.lat, lng : parsed.lng });
      }
    });

    

  	// io.sockets.emit('alert', {data : data, datetime : datetime});
  	res.json({status : 'successfully sent'});
  	// res.send('request');
  },

  index : function(req, res){
    var status = req.param('status');
    if (status == "new"){
      Request.find({status : status}).sort('createdAt DESC').done(function(err, req){
        if (err){
          return console.log(err);
        } else { 
          res.json({'data' : req});
        }
      });
    }else{

    }
   
  },

  addmark : function(req, res){
    var socket = req.socket;
    var io = sails.io;
    io.sockets.emit('mark', 'jethro');
    res.send("added");
  } 


};
