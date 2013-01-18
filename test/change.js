var should = require('should');
var change = require('../lib/change');

describe('change', function() {
    describe('with no arguments', function() {
        it('returns an empty array', function() {
        	// On a exporté la méthode, on peut l'appeler directement!
            var result = change();
            result.should.eql([]);
        });
    });
});