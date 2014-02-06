/**
 * DownloadController
 *
 * @module		:: Controller
 * @description	:: Contains logic for handling requests.
 */

module.exports = {

  index : function(req, res){
	var path = require('path');
	var mime = require('mime');
	var appDir = path.dirname(require.main.filename);
	var file = appDir + '/assets/images/screen.png';
	res.send(file);
	// var filename = path.basename(file);
	// var mimetype = mime.lookup(file);

	// res.setHeader('Content-disposition', 'attachment; filename=' + filename);
	// res.setHeader('Content-type', mimetype);

	// var filestream = fs.createReadStream(file);
	// filestream.pipe(res);

  }
  

};
