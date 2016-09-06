var express = require('express');
var multer = require('multer'); // v1.0.5
var path=require('path');
var fs = require('fs-extra');

function makeFileName(originalname){
	var extname=path.extname(originalname);
	var basename=path.basename(originalname,extname);
	return basename + '-' + Date.now()+extname;
}

function uploadify(app,upload_path){

	upload_path=upload_path||"uploads";
	var abs_upload_path=path.join(__dirname,'..',upload_path);
	fs.ensureDirSync(abs_upload_path);

	var storage = multer.diskStorage({
	  destination: function (req, file, cb) {
	    cb(null,abs_upload_path)
	  },
	  filename: function (req, file, cb) {
	  	var fname=makeFileName(file.originalname);
	    cb(null, fname);
	  }
	})
 
	var upload = multer({ storage: storage })
	// var upload = multer({ dest: 'uploads/' }); // for parsing multipart/form-data
	console.log(abs_upload_path);
	app.use('/uploads',express.static(abs_upload_path));
	// app.use('/uploads',express.static(__dirname + '/../uploads'));

	app.post('/ckeditor/upload', upload.single('upload'), function (req, res, next) {
		var callback = req.query["CKEditorFuncNum"];  
		var file=req.file;
		if(!file){
			return res.status(400).end("no file");
		}
		var ret="<script type=\"text/javascript\">"+
        	"window.parent.CKEDITOR.tools.callFunction(" + callback  
             + ",'" +"/uploads/" + file.filename + "','')"+
        "</script>";  
	  	res.end(ret);
	});

	app.post('/ckeditor-react/upload', upload.single('upload'), function (req, res, next) {
		var callback = req.query["CKEditorFuncNum"];  
		var file=req.file;
		if(!file){
			return res.status(400).end("no file");
		}
		var ret="<script type=\"text/javascript\">"+
        	"window.parent.CKEDITOR.tools.callFunction(" + callback  
             + ",'" +"/uploads/" + file.filename + "','')"+
        "</script>";  
        res.setHeader("Content-Type","text/html");
	  	res.end(ret);
	});

	app.post('/upload', upload.array('files'), function (req, res, next) {
		var file=req.files[0];
		if(!file){
			return res.status(400).end("no file");
		}
	  	res.json({url:upload_path+"/"+file.filename});
	});
}

module.exports=uploadify;
