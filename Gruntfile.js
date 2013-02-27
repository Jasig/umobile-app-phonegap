var scmUrl = 'git@github.com:Jasig/umobile-app-phonegap.git';
var scmBranch = 'gh-pages';

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
		git_pull_pages: {
			command: 'git pull '+ scmUrl + ' ' + scmBranch,
			stdout: true,
			stderr: true
		},
		git_add_pages: {
			command: 'git add . -A',
			stdout: true,
			stderr: true
		},
		git_commit_pages: {
			command: 'git commit -q --all --message="Commit project docs..."',
			stdout: true,
			stderr: true
		},
		git_push_pages: {
			command: 'git push ' + scmUrl + ' ' + scmBranch,
			stdout: true,
			stderr: true
		}

	}
  });


	// Load plugins/tasks.
	grunt.loadNpmTasks('grunt-contrib');
	grunt.loadNpmTasks('grunt-exec');

	// Register tasks.
	grunt.registerTask('default', ['copy:copy_docs', 
  									 'exec:git_add_pages',
									 'exec:git_commit_pages',
									 'exec:git_push_pages']);
};