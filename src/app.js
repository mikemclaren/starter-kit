'use strict';

const program = require('commander');
const remove = require('remove');
const colors = require('colors');
const spawn = require('child_process').spawn;
const kits = require('../kits');

function useCommand(kit, options) {
	console.log('Fetching kit [%s]...'.green, kit);
	if(kit == null) {
		console.log('Kit not found.'.red);
		return;
	}

	if(kits[kit] == null) {
		return;
	}

	const repo = kits[kit];
	const additionalPackagePromises = [];
	const bowerPackages = [];
	const npmPackages = [];
	let clone = null;

	const packageForEach = function packageForeach(packageName, type) {
		var promise = new Promise(function promiseResolution(resolve) {
			console.log('Installing %s'.blue, packageName);
			var newPackage = spawn(type, [ 'install', packageName, '--save' ]);

			newPackage.stdout.on('end', function newPackageEnd() {
				resolve();
			});
		});

		additionalPackagePromises.push(promise);
	};

	const npmPackageForEach = function npmPackageForEach(packageName) {
		return packageForEach(packageName, 'npm');
	};

	const bowerPackageForEach = function bowerPackageForEach(packageName) {
		return packageForEach(packageName, 'bower');
	};

	clone = spawn('git', [ 'clone', repo, process.cwd() ]);

	// Break out the packages.
	if(options.bower != null && options.bower !== 'undefined') {
		bowerPackages = options.bower.split(',');
	}

	if(options.npm != null && options.npm !== 'undefined') {
		npmPackages = options.npm.split(',');
	}

	// Clones the repo down.
	clone.stdout.on('end', function success() {
		console.log('Kit cloned! Removing .git folder...'.green);
		// Removes the existing .git folder, which should give us a clean repo.
		remove.removeSync(process.cwd() + '/.git');

		console.log('.git folder removed! Working on bootstrapping the project...this could take a grip.'.green);
		// Run ./bin/bootstrap.
		let bootstrap = spawn('./bin/bootstrap');
		bootstrap.stdout.on('data', function dataReceived(data) {
			console.log(data.toString('utf-8', 0, data.length).gray);
		});

		// Additional packages.
		// When it's all done, let us tell the user.
		bootstrap.stdout.on('end', function dataFinished() {
			console.log('Bootstrapping completed!'.green);
			if(npmPackages.length !== 0) {
				console.log('Beginning to add additional npm packages...'.green);
				npmPackages.forEach(npmPackageForEach);
			}

			if(bowerPackages.length !== 0) {
				console.log('Beginning to add additional bower packages...'.green);
				bowerPackages.forEach(bowerPackageForEach);
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
	.command('use [kit]')
	.option('-b, --bower <bower_packages>', 'Packages to install using Bower')
	.option('-n, --npm <npm_packages>', 'Packages to install using NPM')
	.action(useCommand);

program.parse(process.argv);
