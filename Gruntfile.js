module.exports = function(grunt) {

  "use strict";
  //
  grunt.initConfig({
    concat: {
      options: {
        stripBanners: true
      },
      dist: {
        src: ['src/scripts/main.js', 'src/scripts/**/*.js'],
        dest: 'public/basket.min.js'
      }
    },
    jshint: {
      options: {
        jshintrc: ".jshintrc"
      },
      beforeconcat: ['src/scripts/**/*.js']//,
      //afterconcat: ['dist/output.js']
    },
    uglify: {
      dist: {
        src: '<%= concat.dist.dest %>',
        dest: 'public/basket.min.js'
      }
    },
    less: {
      development: {
        options: {
          compress: true,
          yuicompress: true,
          optimization: 2
        },
        files: {
          "public/basket.css": "src/styles/main.less"
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-jshint');

  grunt.registerTask('buildjs', ['jshint','concat', 'uglify']);
  grunt.registerTask('buildcss', ['less']);
};