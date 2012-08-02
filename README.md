A drop-in replacement for the default Grunt server. It will serve up coffeescript files as javascript. So if you have a file in app/init.coffee, hitting http://localhost:8000/app/init.js will serve up the compiled version of that file.

Setup
=======

You'll need to install grunt-coffeecup first:

    npm install grunt-coffeepot

Then modify your grunt.js file by adding the following line:

    grunt.loadNpmTasks('grunt-coffeecup');

Then add some configuration for the plugin like so:

    grunt.initConfig({
      ...
      coffeecup: {
        port: 8000
        base: ./app
      },
      ...
    });

`port` defaults to `8000` and `base` defaults to the grunt.js directory

To create a continuously running server use:
    
    grunt.registerTask('serve', 'coffeecup watch');

