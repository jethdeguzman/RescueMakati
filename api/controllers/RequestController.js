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
    var json = {status : "pending", request : parsed.request, userid : parsed.userid, name : parsed.name, age : parsed.age, mobile : parsed.mobile, lat : parsed.lat, lng : parsed.lng, address : parsed.address, date : datenow, time : timenow};
    Request.create(json).done(function(error){
      if (error){
        return console.log(error);
      }else{
        // io.sockets.emit('alert', json);
      return;
      }
    });
    Request.find().sort({_id:-1}).limit(1).done(function(err, req){
      if(err){
        console.log(err);
      }else{
        io.sockets.emit('alert', req);
      }
    });

    

  	// io.sockets.emit('alert', {data : data, datetime : datetime});
  	res.json({status : 'successfully sent'});
  	// res.send('request');
  },

  index : function(req, res){
    var status = req.param('status');
    if (status == "pending"){
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
      var num = req.param("num");
     
      
      switch(num){
        case "1":
        console.log(num);
        var json = {status : "pending", request : "Ambulance", userid : "0001", name : "Mark Anthony Muya", age : 21, mobile : "09228345029", lat : 14.559327, lng : 121.019529, address : "Makati City", date : "2013-12-21", time : "7:17:00"};
          create(json);
        break;

        case "2":
          var json = {status : "pending", request : "Police", userid : "0001", name : "Kim Lleno", age : 21, mobile : "09228345029", lat : 14.557312, lng : 121.029722, address : "Makati City", date : "2013-12-21", time : "7:17:00"};
          create(json);
        break;

        case "3":
         var json = {status : "pending", request : "Fire Truck", userid : "0001", name : "Mark Penaranda", age : 21, mobile : "09228345029", lat : 14.542878, lng : 121.024379, address : "Makati City", date : "2013-12-21", time : "7:17:00"};
         create(json);
        break;

        case "4":
        var json = {status : "pending", request : "Ambulance", userid : "0001", name : "Naila Obnial", age : 21, mobile : "09228345029", lat : 14.565848, lng : 121.051072, address : "Makati City", date : "2013-12-21", time : "7:17:00"};
        create(json);
        break;
      }
        
      function create(json){
        Request.create(json).done(function(error){
             if (error){
               return console.log(error);
             }else{
               // io.sockets.emit('alert', json);
             return;
             }
           });
           Request.find().sort({_id:-1}).limit(1).done(function(err, req){
             if(err){
               console.log(err);
             }else{
               io.sockets.emit('alert', req);
             }
           });
      }
     

      

      // io.sockets.emit('alert', {data : data, datetime : datetime});
      res.json({status : 'added'});
  },
  alert : function(req, res){
    var socket = req.socket;
    var io = sails.io;
    alert = req.param('alert');
    io.sockets.emit('show', {name: alert});
  } 


};
