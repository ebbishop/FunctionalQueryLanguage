var fs = require('fs');

// _readTable takes a string representing a table name
// and returns an array of objects, namely the rows.
// It does so by looking up actual files, reading them,
// and parsing them from JSON strings into JS objects.
function _readTable (tableName) {
	var folderName = __dirname + '/film-database/' + tableName;
	var fileNames = fs.readdirSync(folderName);
	var fileStrings = fileNames.map(function (fileName) {
		var filePath = folderName + '/' + fileName;
		return fs.readFileSync(filePath).toString();
	});
	var table = fileStrings.map(function (fileStr) {
		return JSON.parse(fileStr);
	});
	return table;
}

function merge (obj1, obj2) {
	var objReturn = {};

	for (var key in obj1){
		objReturn[key] = obj1[key];
	}
	for (var key in obj2){
		objReturn[key] = obj2[key];
	}

	return objReturn
}

function FQL (table) {
	this.table = table;
	this.subset = table;
}

//returns current result
FQL.prototype.exec = function(){
	var copier = function() {
		var table = this.subset;
		return table;
	}
	var copied = copier.bind(this);
	this.subset = this.table;
	return copied();
}

//returns number of records in result set
FQL.prototype.count = function() {
	return this.subset.length;
};

//limits result set to x rows
FQL.prototype.limit = function(x) {
	this.subset = this.subset.slice(0,x);
	return this;
};

module.exports = {
	FQL: FQL,
	merge: merge,
	_readTable: _readTable
};