/**
 * DownloadController
 *
 * @module		:: Controller
 * @description	:: Contains logic for handling requests.
 */

module.exports = {

  index : function(req, res){
	// var path = require('path');
	// var mime = require('mime');
	// var fs = require('fs');
	// // var appDir = path.dirname(require.main.filename);
	// // var file = appDir + '/assets/app/Makati168.apk';
	// // // res.send(file);
	// // var filename = path.basename(file);
	// // var mimetype = mime.lookup(file);

	// // res.setHeader('Content-disposition', 'attachment; filename=' + filename);
	// // res.setHeader('Content-type', mimetype);

	// var filestream = fs.createReadStream(file);
	// // filestream.pipe(res);

	// var downloader = require('downloader');

	// var downloadDir = '/home/jeth/Desktop/';
	// // res.send(downloadDir);
	// downloader.on('done', function(msg) {
	//     console.log(msg);
	// });

	// downloader.on('error', function(msg) {
	//     console.log(msg);
	// });

	// downloader.download("http://rescuemakati.cloudapp.net/images/gallery/1391514522194.jpg.jpg", filestream);
 	var http = require('http');
 	var fs = require('fs');

 	var file = fs.createWriteStream("file.png");
 	var request = http.get("http://rescuemakati.cloudapp.net/images/gallery/1391514522194.jpg.jpg", function(response) {
 	  response.pipe(file);
 	});
 	res.send("ok");
  }
  

};
