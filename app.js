var express = require('express');
var app = express();

app.use(express.static('public'));

require('./uploadify')(app,'uploads');


var expressRestResource = require('express-rest-resource');
var nedb=require('nedb');

var slidesDb = new nedb({ filename: 'slidesDb', autoload: true });
app.use('/api/slide', expressRestResource({ db: slidesDb }));

var imagesDb = new nedb({ filename: 'imagesDb', autoload: true });
app.use('/api/image', expressRestResource({ db: imagesDb }));

app.use(express.static('dist'));

app.set('view engine', 'ejs');

app.get('/slides', function (req, res) {
	imagesDb.find({},function(err,images){
		//console.log(images);
		var urls=images.map(image=>image.url);
		//console.log(urls);
  		// res.render('images', { urls: ["/uploads/152902sxqog1zq4lofvofg-1473058725500.png","/uploads/th-1473063343837.jpg"]});
  		res.render('images', { urls:urls});
	})
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});