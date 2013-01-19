var should = require('should');
var gd = require(__dirname + '/../lib/groDessimal');

describe('GroDessimal', function() {
    describe('#GroDessimal()', function() {
        it('should init attributes', function() {
    		var groDessimal = new gd.GroDessimal(2,4,6,8);
    		groDessimal.nbFoo.should.eql(2);
    		groDessimal.nbBar.should.eql(4);
    		groDessimal.nbQix.should.eql(6);
    		groDessimal.nbBaz.should.eql(8);
    		groDessimal.val.should.eql(264);
    		groDessimal.toString().should.eql("groDessimal(264) {foo : 2, bar : 4, qix : 6, baz : 8}");
    	});
    });
});