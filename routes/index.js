var fs = require('fs');

exports.index = function(req, res){
  console.log(req);
  res.render('index', { title: 'Express' });
};

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

exports.uploadPicture = function(req, res) {
  var postfix = '.' + req.files.displayImage.name.split('.')[1];
  var fileName = +new Date() + getRandomInt(100, 999) + postfix;
  fs.readFile(req.files.displayImage.path, function(err, data) {
    if(err) throw err

    var newPath = __dirname + '/uploads/' + fileName;
    fs.writeFile(newPath, data, function(err) {
      if(err) throw err

      res.writeHead(200, {
        'Content-Type': 'application/json'
      });
      
      res.end(JSON.stringify({
        path: 'http://' + req.headers.host + '/pic/' + fileName
      }));
    });
  });
};

exports.showPicture = function(req, res) {
  var fileName = req.route.params.fileName;
  var type = fileName.split('.')[1];

  fs.readFile(__dirname + '/uploads/' + fileName, function(err, data) {
    if(err) throw err
    res.writeHead(200, {
      'Content-Type': 'image/' + type
    });
    
    res.end(data);
  });

};
