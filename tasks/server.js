/*
 * grunt
 * https://github.com/cowboy/grunt
 *
 * Copyright (c) 2012 "Cowboy" Ben Alman
 * Licensed under the MIT license.
 * http://benalman.com/about/license/
 */

module.exports = function(grunt) {

  // Nodejs libs.
  var path = require('path');

  // External libs.
  var connect = require('connect');
  var coffeepot = require('../src/coffeepot.js');

  // ==========================================================================
  // TASKS
  // ==========================================================================

  grunt.registerTask('coffeepot', 'Start a static web server, and serve .coffee files', function() {
    // Get values from config, or use defaults.

    var port = grunt.config('coffeepot.port') || 8000;
    
    var base = path.resolve(grunt.config('coffeepot.base') || '.');

    var middleware = [
      coffeepot(base),
      connect.static(base),
      connect.directory(base)
    ];
    var auth = grunt.config('coffeepot.auth');

    if(auth){
      middleware.unshift(connect.basicAuth(auth.user, auth.password));
    }

    // If --debug was specified, enable logging.
    if (grunt.option('debug')) {
      connect.logger.format('grunt', ('[D] server :method :url :status ' +
        ':res[content-length] - :response-time ms').magenta);
      middleware.unshift(connect.logger('grunt'));
    }

    // Start server.
    grunt.log.writeln('Starting static web server with coffee-script on port ' + port + '.');
    connect.apply(null, middleware).listen(port);
    
  });

};