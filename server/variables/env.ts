const yaml = require('node-yaml'),
    fs = require('fs'),
    _ = require('lodash');

let baseDir: string = __dirname + '/regions/';
let common: any = yaml.readSync(__dirname + '/common.yml');
let variables: any = {};

fs.readdirSync(baseDir).forEach(file => {
	let vars: any = yaml.readSync(baseDir + file);
	let name: string = file.replace('.yml', '');
	variables[name] = common;
	if (vars !== undefined) {
		variables[name] = _.extend(_.clone(common), vars);
	}
});

module.exports.environment = () => variables;
