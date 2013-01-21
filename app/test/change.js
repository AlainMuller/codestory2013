/**
 * Created with JetBrains WebStorm.
 * User: Alain Muller
 * Date: 21/01/13
 * Time: 11:41
 * Module de test du module change
 */

var should = require('should');
var change = require(__dirname + '/../lib/change');

describe('change', function() {
    describe('#paramètres', function() {
        it('ne prend qu\'un seul paramètre', function() {
    		var foo, bar;
    		change.makeChange().should.eql([]);
    		change.makeChange(foo, bar).should.eql([]);
    	});
        it('ne traite que des nombres', function() {
        	var a = "plop", b = 1, c = {"foo":5};
            change.makeChange(a).should.eql([]);
            change.makeChange(b).should.not.eql([]);
            change.makeChange(c).should.eql([]);

            change.makeChange().should.eql([]);
        });
    });

    describe('#chiffre', function() {
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
    	it('7 retourne [{"foo":7}, {"bar":1}]', function(){
            change.makeChange(7).should.eql([{"foo":7}, {"bar":1}]);
        });
    	it('8 retourne [{"foo":8}, {"foo":1, "bar":1}]', function(){
            change.makeChange(8).should.eql([{"foo":8}, {"foo":1, "bar":1}]);
        });
    	it('9 retourne [{"foo":9}, {"foo":2, "bar":1}]', function(){
            change.makeChange(9).should.eql([{"foo":9}, {"foo":2, "bar":1}]);
        });
    });

    describe('#nombre', function() {
        it('15 retourne [{"foo":15}, {"bar":1, "foo":8}, {"bar":2, "foo":1}, {"qix":1, "foo":4}]', function(){
            change.makeChange(15).should.eql([{"foo":15}, {"bar":1, "foo":8}, {"bar":2, "foo":1}, {"qix":1, "foo":4}]);
        });
        it('54 retourne [...]', function(){
            change.makeChange(54).should.eql([{"foo":54},{"bar":1,"foo":47},{"bar":2,"foo":40},{"bar":3,"foo":33},{"bar":4,"foo":26},{"bar":5,"foo":19},{"bar":6,"foo":12},{"bar":7,"foo":5},{"qix":1,"foo":43},{"qix":1,"bar":1,"foo":36},{"qix":1,"bar":2,"foo":29},{"qix":1,"bar":3,"foo":22},{"qix":1,"bar":4,"foo":15},{"qix":1,"bar":5,"foo":8},{"qix":1,"bar":6,"foo":1},{"qix":2,"foo":32},{"qix":2,"bar":1,"foo":25},{"qix":2,"bar":2,"foo":18},{"qix":2,"bar":3,"foo":11},{"qix":2,"bar":4,"foo":4},{"qix":3,"foo":21},{"qix":3,"bar":1,"foo":14},{"qix":3,"bar":2,"foo":7},{"qix":3,"bar":3},{"qix":4,"foo":10},{"qix":4,"bar":1,"foo":3},{"baz":1,"foo":33},{"baz":1,"bar":1,"foo":26},{"baz":1,"bar":2,"foo":19},{"baz":1,"bar":3,"foo":12},{"baz":1,"bar":4,"foo":5},{"baz":1,"qix":1,"foo":22},{"baz":1,"qix":1,"bar":1,"foo":15},{"baz":1,"qix":1,"bar":2,"foo":8},{"baz":1,"qix":1,"bar":3,"foo":1},{"baz":1,"qix":2,"foo":11},{"baz":1,"qix":2,"bar":1,"foo":4},{"baz":1,"qix":3},{"baz":2,"foo":12},{"baz":2,"bar":1,"foo":5},{"baz":2,"qix":1,"foo":1}]);
        });
    });

    describe('#bornes [1..100]', function() {
        it('0 retourne []', function(){
            change.makeChange(0).should.eql([]);
        });
        it('1..100 retourne le bon résultat', function() {
            for (var i=1; i<=100; i++)
            {
                change.makeChange(i).should.not.eql([]);
            }
        });
        it('101 retourne []', function(){
            change.makeChange(101).should.eql([]);
        });
    });
});