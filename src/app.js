'use strict';

var program = require('commander'),
		clone = require('git-clone'),
		Promise = require('bluebird'),
		remove = require('remove'),
		colors = require('colors'),
		spawn = require('child_process').spawn,
		kits = require('../kits');

clone = Promise.promisify(clone);

function useCommand(kit) {
	console.log('Fetching kit [%s]...'.green, kit);
	if(kit == null) {
		console.log('Kit not found.'.red);
		return;
	}

	if(kits[kit] == null) {
		return;
	}

	var repo = kits[kit];

	// Clones the repo down.
	clone(repo, process.cwd(), { shallow: true }).then(function success() {
		console.log('Kit cloned! Removing .git folder...'.green);
		// Removes the existing .git folder, which should give us a clean repo.
		remove.removeSync(process.cwd() + '/.git');

		console.log('.git folder removed! Working on bootstrapping the project...this could take a grip.'.green);
		// Run ./bin/bootstrap.
		var bootstrap = spawn('./bin/bootstrap');
		bootstrap.stdout.on('data', function dataReceived(data) {
			console.log(data.toString('utf-8', 0, data.length).gray);
		});

		// When it's all done, let us tell the user.
		bootstrap.stdout.on('end', function dataFinished() {
			console.log('This project has been thoroughly startered. Enjoy!'.green);
		});
	});
}

program
	.version('0.0.1')
	.command('use <repo> [packages...]')
	.action(useCommand);

program.parse(process.argv);
