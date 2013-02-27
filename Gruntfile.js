module.exports = function(grunt) {
  'use strict';

  // Project configuration.
  grunt.initConfig({
	pkg: grunt.file.readJSON('package.json'),
	
	clean: {
		cleanWWW: {
			src: ['www']
		}, 
		remove_docs: {
			src: ['www/docs']
		}
	},

	copy: {
	  copy_docs: {
		files: [
		  {src: ['**'], dest: '.', expand:true, cwd:'www/docs/'},
		]
	  }
	},

	exec: {
		git_checkout_pages: {
			command: 'git checkout gh-pages',
			stdout: true,
			stderr: true
		},
		git_add_pages: {
			command: 'git add . -A',
			stdout: true,
			stderr: true
		},
		git_commit_pages: {
			command: 'git commit -q --all --branch --message="Commit Project Docs"',
			stdout: true,
			stderr: true
		},
		git_checkout_master: {
			command: 'git checkout UPG-11',
			stdout: true,
			stderr: true
		}
	}
  });

  // Load plugins/tasks.
  grunt.loadNpmTasks('grunt-contrib');
  grunt.loadNpmTasks('grunt-exec');

  // Register tasks.
  grunt.registerTask('default', ['clean:remove_docs','yuidoc', 
							  'exec:git_checkout_pages', 
							  'copy:copy_docs', 'exec:git_add_pages',
							  'exec:git_commit_pages', 
							  'exec:git_checkout_master']);
};