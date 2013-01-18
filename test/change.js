var should = require('should');
var change = require(__dirname + '/../lib/change');

describe('change', function() {
    describe('#paramètres', function() {
        it('tableau vide si pas de paramètre', function() {
            change().should.eql([]);
        });
        it('tableau vide sur paramètres multiples', function() {
    		var foo, bar;
    		change(foo, bar).should.eql([]);
    	});
    });

    describe('#chiffre', function() {
    	it('#0 returns []', function(){
    		change(0).should.eql([]);
    	});
    	it('#1 returns [{"foo":1}]', function(){
    		change(1).should.eql([{"foo":1}]);
    	});
    	it('#2 returns [{"foo":2}]');
    	it('#3 returns [{"foo":3}]');
    	it('#4 returns [{"foo":4}]');
    	it('#5 returns [{"foo":5}]');
    	it('#6 returns [{"foo":6}]');
    	it('#7 returns [{"foo":7}, {"bar":1}]');
    	it('#8 returns [{"foo":8}, {"foo":1, "bar":1}]');
    	it('#9 returns [{"foo":2, "bar":1}]');
    });
});