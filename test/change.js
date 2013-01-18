var should = require('should');
var change = require(__dirname + '/../lib/change');

describe('change', function() {
    describe('#paramètres', function() {
        it('traite un seul paramètre', function() {
    		var foo, bar;
    		change.makeChange().should.eql([]);
    		change.makeChange(foo, bar).should.eql([]);
    	});
        it('traite un nombre', function() {
        	var a = "plop", b = 1, c = {"foo":5};
            change.makeChange(a).should.eql([]);
            change.makeChange(b).should.not.eql([]);
            change.makeChange(c).should.eql([]);

            change.makeChange().should.eql([]);
        });
    });

    describe('#chiffre', function() {
    	it('0 retourne []', function(){
    		change.makeChange(0).should.eql([]);
    	});
    	it('1 retourne [{"foo":1}]', function(){
    		change.makeChange(1).should.eql([{"foo":1}]);
    	});
    	it('2 retourne [{"foo":2}]', function(){
    		change.makeChange(2).should.eql([{"foo":2}]);
    	});
    	it('3 retourne [{"foo":3}]', function(){
    		change.makeChange(3).should.eql([{"foo":3}]);
    	});
    	it('4 retourne [{"foo":4}]', function(){
    		change.makeChange(4).should.eql([{"foo":4}]);
    	});
    	it('5 retourne [{"foo":5}]', function(){
    		change.makeChange(5).should.eql([{"foo":5}]);
    	});
    	it('6 retourne [{"foo":6}]', function(){
    		change.makeChange(6).should.eql([{"foo":6}]);
    	});
    	it('7 retourne [{"foo":7}, {"bar":1}]');
    	it('8 retourne [{"foo":8}, {"foo":1, "bar":1}]');
    	it('9 retourne [{"foo":2, "bar":1}]');
    });
});