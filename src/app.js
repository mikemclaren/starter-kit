'use strict';

var program = require('commander'),
		clone = require('git-clone'),
		Promise = require('bluebird'),
		remove = require('remove'),
		colors = require('colors'),
		spawn = require('child_process').spawn,
		kits = require('../kits');

clone = Promise.promisify(clone);

function useCommand(kit, packages) {
	console.log('Fetching kit [%s]...'.green, kit);
	if(kit == null) {
		console.log('Kit not found.'.red);
		return;
	}

	if(kits[kit] == null) {
		return;
	}

	var repo = kits[kit],
	additionalPackagePromises = [],

	packageForEach = function packageForeach(packageName) {
		var promise = new Promise(function promiseResolution(resolve) {
			console.log('Installing %s'.blue, packageName);
			var newPackage = spawn('bower', [ 'install', packageName, '--save' ]);

			newPackage.stdout.on('end', function newPackageEnd() {
				resolve();
			});
		});

		additionalPackagePromises.push(promise);
	};

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

		// Additional packages.

		// When it's all done, let us tell the user.
		bootstrap.stdout.on('end', function dataFinished() {
			console.log('Bootstrapping completed!'.green);
			if(packages.length !== 0) {
				console.log('Beginning to add additional packages...'.green);
				packages.forEach(packageForEach);
			}

			Promise.all(additionalPackagePromises).then(function completeResolution() {
				spawn('git', [ 'init' ]);
				console.log('This project has been thoroughly startered. Enjoy!'.green);
			});
		});
	});
}

program
	.version('0.0.1')
	.command('use <kit> [packages...]')
	.action(useCommand);

program.parse(process.argv);
