/**
 * Created with JetBrains WebStorm.
 * User: Alain Muller
 * Date: 22/01/13
 * Time: 18:32
 * Module de test du module flight
 */

var should = require('should');
var Flight = require(__dirname + '/../lib/flight');

describe('Flight', function () {
    describe('#constructor', function () {
        it('should set attributes', function () {
            var flight = new Flight("nom", 1, 5, 8);
            should.exist(flight);
            flight.nom.should.eql("nom");
            flight.depart.should.eql(1);
            flight.duree.should.eql(5);
            flight.fin.should.eql(6);
            flight.prix.should.eql(8);
        });
        it('should take 4 parameters', function () {
            should.not.exist(new Flight("fail").fin);
        });
    });
});
