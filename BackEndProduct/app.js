var express = require('express');
var path = require('path');
var formidable = require('formidable');
var fs = require('fs');
var app = express();

const port = 3000;

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/uploads', (req, res) => {

    //console.log(req);

    // create an incoming form object
    var form = new formidable.IncomingForm();


    // store all uploads in the /uploads directory
    form.uploadDir = path.join(__dirname, '/upload');

    // When a file has been uploaded successfully,
    // rename it to it's orignal name
    // if the file exists add an incremental int after its name
    form.on('file', function(field, file) {
        
        if (fs.existsSync(path.join(form.uploadDir, file.name))) {
        	var i = 1;
        	while(fs.existsSync(path.join(form.uploadDir, file.name+'('+i.toString()+')'))) {
        		i += 1;
        	}
        	fs.rename(file.path, path.join(form.uploadDir, file.name+'('+i.toString()+')'));
        }
        else {
        	fs.rename(file.path, path.join(form.uploadDir, file.name));
        }
        
    });

    // log any errors that occur
    form.on('error', function(err) {
        console.log('An error has occured: \n' + err);
        res.statusCode = 500;
        res.setHeader('Content-Type', 'application/json; charset=utf-8');
        res.json({ error: err, message: 'failed' });
    });

    // once the file have been uploaded, send a response to the client
    form.on('end', function() {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json; charset=utf-8');
        res.json({ message: 'Uploaded successfully' });
    });
    // parse the incoming request containing the form data
    form.parse(req);

});

app.listen(port, () => {
    console.log(`Server running at ${port}/`);
});