var coffeepot, cs, fs, path;

cs = require('coffee-script');

path = require('path');

fs = require('fs');

module.exports = coffeepot = function(publicDir) {
  var handler;
  return handler = function(req, res, next) {
    var coffeeUrl, file;
    if (!req.url.match(/.js$/)) {
      return next();
    }
    coffeeUrl = req.url.replace(/.js$/, ".coffee");
    file = path.join(publicDir, coffeeUrl);
    return path.exists(file, function(exists) {
      if (!exists) {
        return next();
      }
      return fs.readFile(file, function(err, data) {
        var content;
        if (err !== null) {
          return res.end(err.message, 500);
        }
        try {
          content = cs.compile(data.toString());
        } catch (err) {
          return res.end(err.message, 500);
        }
        res.setHeader('Content-Type', 'text/javascript');
        return res.end(content);
      });
    });
  };
};
